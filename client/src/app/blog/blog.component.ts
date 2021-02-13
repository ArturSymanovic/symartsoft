import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BlogTag } from '../_models/blog-tag';
import { BlogPost } from '../_models/blog-post';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { MatChipList } from '@angular/material/chips';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  @ViewChild('overflowContainer') overflowContainer: ElementRef;
  @ViewChild('chipList') chipList: MatChipList;
  @ViewChild('drawer') drawer: MatDrawer;
  searchForm: FormGroup = new FormGroup({});
  showLeftButton = false;
  showRightButton = true;
  multiple = true;
  tags: BlogTag[] = [
    { name: `All`, selected: true, class: `first-chip` },
    { name: `Azure`, selected: false, class: `` },
    { name: `ASP.NET 5 Web API`, selected: false, class: `` },
    { name: `Angular`, selected: false, class: `` },
    { name: `Angular Material`, selected: false, class: `` },
    { name: `Docker`, selected: false, class: `` },
    { name: `SSL`, selected: false, class: `` },
    { name: `Logging`, selected: false, class: `` },
    { name: `Testing`, selected: false, class: `` },
    { name: `Authorization`, selected: false, class: `` },
    { name: `Authentication`, selected: false, class: `` },
    { name: `NGINX`, selected: false, class: `` },
    { name: `Github Actions`, selected: false, class: `last-chip` },
  ];
  blogPosts: BlogPost[] = [
    {
      title: `How to build a project with ASP.NET Web API and Angular`,
      summary: `This article will guide you through step by step creation of a starting point project with ASP.NET 5 Web API as backend and Angular 11 as a frontend.`,
      routerLink: `/how-to-build-project-with-asp-web-api-and-angular`,
      date: new Date(2021, 1, 2),
      tags: [`ASP.NET 5 Web API`, `Angular`],
    },
    {
      title: `Sample Title 1`,
      summary: `This is not a real blogpost. It is a sample for demonstration and testing of blogpost cards, tag filtering and search functionality. Once more blogposts will be created this card will be deleted. Summary 1.`,
      routerLink: `sampleurl1`,
      date: new Date(2019, 5, 5),
      tags: [`Testing`, `NGINX`, `Github Actions`],
    },
    {
      title: `Sample Title 2`,
      summary: `This is not a real blogpost. It is a sample for demonstration and testing of blogpost cards, tag filtering and search functionality. Once more blogposts will be created this card will be deleted. Summary 2.`,
      routerLink: `sampleurl2`,
      date: new Date(2019, 8, 16),
      tags: [`Github Actions`, `Angular`, `Testing`],
    },
    {
      title: `Sample Title 3`,
      summary: `This is not a real blogpost. It is a sample for demonstration and testing of blogpost cards, tag filtering and search functionality. Once more blogposts will be created this card will be deleted. Summary 3`,
      routerLink: `sampleurl3`,
      date: new Date(2020, 1, 28),
      tags: [`NGINX`, `Authorization`, `Authentication`],
    },
    {
      title: `Sample Title 4`,
      summary: `This is not a real blogpost. It is a sample for demonstration and testing of blogpost cards, tag filtering and search functionality. Once more blogposts will be created this card will be deleted. Summary 4`,
      routerLink: `sampleurl4`,
      date: new Date(2019, 1, 15),
      tags: [`Azure`, `Testing`, `Docker`],
    },
    {
      title: `Sample Title 5`,
      summary: `This is not a real blogpost. It is a sample for demonstration and testing of blogpost cards, tag filtering and search functionality. Once more blogposts will be created this card will be deleted. Summary 5`,
      routerLink: `sampleurl5`,
      date: new Date(2020, 5, 21),
      tags: [`Docker`],
    },
    {
      title: `Sample Title 6`,
      summary: `This is not a real blogpost. It is a sample for demonstration and testing of blogpost cards, tag filtering and search functionality. Once more blogposts will be created this card will be deleted. Summary 6`,
      routerLink: `sampleurl6`,
      date: new Date(2020, 6, 14),
      tags: [`Azure`, `Authentication`, `NGINX`],
    },
    {
      title: `Sample Title 7`,
      summary: `This is not a real blogpost. It is a sample for demonstration and testing of blogpost cards, tag filtering and search functionality. Once more blogposts will be created this card will be deleted. Summary 7`,
      routerLink: `sampleurl7`,
      date: new Date(2020, 9, 11),
      tags: [`Azure`, `SSL`],
    },
    {
      title: `Sample Title 8`,
      summary: `This is not a real blogpost. It is a sample for demonstration and testing of blogpost cards, tag filtering and search functionality. Once more blogposts will be created this card will be deleted. Summary 8.`,
      routerLink: `sampleurl8`,
      date: new Date(2020, 9, 11),
      tags: [`Azure`, `SSL`],
    },
  ];
  filteredBlogPosts: BlogPost[] = [];
  searchResults: BlogPost[] = [];
  constructor(private titleService: Title) {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      searchCriteria: new FormControl(''),
    });
    this.filterByTags();
    this.titleService.setTitle("Blog | Symartsoft");
  }

  scrollLeft() {
    this.overflowContainer.nativeElement.scroll({
      left: this.overflowContainer.nativeElement.scrollLeft - 150,
      behavior: 'smooth',
    });
    setTimeout(() => {
      if (this.overflowContainer.nativeElement.scrollLeft === 0) {
        this.showLeftButton = false;
      }
      this.showRightButton = true;
    }, 250);
  }

  scrollRight() {
    const current = this.overflowContainer.nativeElement.scrollLeft;
    this.overflowContainer.nativeElement.scroll({
      left: this.overflowContainer.nativeElement.scrollLeft + 150,
      behavior: 'smooth',
    });
    setTimeout(() => {
      if (this.overflowContainer.nativeElement.scrollLeft === current) {
        this.showRightButton = false;
      }
      this.showLeftButton = true;
    }, 250);
  }

  tagSelected(tag: BlogTag) {
    if (tag.name === 'All') {
      if (tag.selected) {
        return;
      } else {
        this.tags.forEach((t) => {
          t.selected = false;
        });
        tag.selected = true;
      }
    } else {
      tag.selected = !tag.selected;
      if (!this.tags.find((t) => t.selected)) {
        this.resetFilters();
      } else {
        const allTag = this.tags.find((t) => t.name === `All`);
        if (allTag) {
          allTag.selected = false;
        }
      }
    }
    this.filterByTags();
  }

  filterByTags() {
    const allTag = this.tags.find((t) => t.name === `All`);
    if (allTag?.selected) {
      this.filteredBlogPosts = this.blogPosts;
      return;
    }
    this.filteredBlogPosts = this.blogPosts.filter((blogPost) => {
      const selectedTags = this.tags
        .filter((t) => t.selected)
        .map((t) => {
          return t.name;
        });
      for (let i = 0; i < selectedTags.length; i++) {
        const tag = selectedTags[i];
        if (blogPost.tags.includes(tag)) {
          return true;
        }
      }
      return false;
    });
  }

  resetFilters() {
    this.tags.forEach((tag) => {
      tag.selected = false;
    });
    const allTag = this.tags.find((t) => t.name === `All`);
    if (allTag) {
      allTag.selected = true;
    }
    this.overflowContainer.nativeElement.scroll({
      left: 0,
      behavior: 'smooth',
    });
    this.showLeftButton = false;
    this.filterByTags();
  }

  searchClicked() {
    if (!this.drawer.opened) {
      this.showSearchResults();
    }
    this.drawer.toggle();
  }

  showSearchResults() {
    if (
      !this.searchForm.controls.searchCriteria.value ||
      this.searchForm.controls.searchCriteria.value?.length < 3
    ) {
      this.searchResults = [];
    } else {
      this.searchResults = this.blogPosts.filter((blogPost) => {
        return (
          blogPost.title
            .toLowerCase()
            .includes(
              this.searchForm.controls.searchCriteria.value.toLowerCase()
            ) ||
          blogPost.summary
            .toLowerCase()
            .includes(
              this.searchForm.controls.searchCriteria.value.toLowerCase()
            ) ||
          blogPost.tags.find((tag) => {
            return tag
              .toLowerCase()
              .includes(
                this.searchForm.controls.searchCriteria.value.toLowerCase()
              );
          })
        );
      });
    }
  }

  clearSearchCriteria() {
    this.searchForm.controls.searchCriteria.setValue(``);
    this.showSearchResults();
  }
}
