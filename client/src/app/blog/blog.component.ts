import { Component, OnInit, ViewChild } from '@angular/core';
import { BlogTag } from '../_models/blog-tag';
import { BlogPost } from '../_models/blog-post';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  @ViewChild('overflowContainer') overflowContainer: any;
  showLeftButton = false;
  showRightButton = true;
  selectable = true;
  multiple = true;
  chips: BlogTag[] = [
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
      title: `Title placeholder for sample blogpost title1 test test  `,
      summary: `This is placeholder for the summary1 of the sample blogpost.This is placeholder for the summary of the sample blogpost.`,
      routerLink: `sampleurl`,
      date: new Date(2019, 1, 15),
      tags: [`Azure`, `Angular`, `Docker`],
    },
    {
      title: `Title placeholder for sample blogpost title2`,
      summary: `This is placeholder for the summary2 of the sample blogpost.This is placeholder for the summary of the sample blogpost.`,
      routerLink: `sampleurl`,
      date: new Date(2019, 5, 5),
      tags: [`Testing`, `NGINX`, `Github Actions`],
    },
    {
      title: `Title placeholder for sample blogpost title3`,
      summary: `This is placeholder for the summary3 of the sample blogpost.This is placeholder for the summary of the sample blogpost.`,
      routerLink: `sampleurl`,
      date: new Date(2019, 8, 16),
      tags: [`Github Actions`, `Angular`, `Testing`],
    },
    {
      title: `Title placeholder for sample blogpost title4`,
      summary: `This is placeholder for the summary4 of the sample blogpost.This is placeholder for the summary of the sample blogpost.`,
      routerLink: `sampleurl`,
      date: new Date(2020, 1, 28),
      tags: [`NGINX`, `Authorization`, `Authentication`],
    },
    {
      title: `Title placeholder for sample blogpost title5`,
      summary: `This is placeholder for the summary5 of the sample blogpost.This is placeholder for the summary of the sample blogpost.`,
      routerLink: `sampleurl`,
      date: new Date(2019, 1, 15),
      tags: [`Azure`, `Testing`, `Docker`],
    },
    {
      title: `Title placeholder for sample blogpost title6`,
      summary: `This is placeholder for the summary6 of the sample blogpost.This is placeholder for the summary of the sample blogpost.`,
      routerLink: `sampleurl`,
      date: new Date(2020, 5, 21),
      tags: [`Docker`],
    },
    {
      title: `Title placeholder for sample blogpost title7`,
      summary: `This is placeholder for the summary7 of the sample blogpost.This is placeholder for the summary of the sample blogpost.`,
      routerLink: `sampleurl`,
      date: new Date(2020, 6, 14),
      tags: [`Azure`, `Authentication`, `NGINX`],
    },
    {
      title: `Title placeholder for sample blogpost title8`,
      summary: `This is placeholder for the summary8 of the sample blogpost.This is placeholder for the summary of the sample blogpost.`,
      routerLink: `sampleurl`,
      date: new Date(2020, 9, 11),
      tags: [`Azure`, `SSL`],
    },
  ];
  searchCriteria = ``;
  searchResults: BlogPost[] = [];
  constructor() {}

  ngOnInit(): void {}

  scrollLeft() {
    const current = this.overflowContainer.nativeElement.scrollLeft;
    console.log(current);
    this.overflowContainer.nativeElement.scroll({
      left: this.overflowContainer.nativeElement.scrollLeft - 150,
      behavior: 'smooth',
    });
    setTimeout(() => {
      if (this.overflowContainer.nativeElement.scrollLeft === 0) {
        this.showLeftButton = false;
      }
      this.showRightButton = true;
      console.log(this.overflowContainer.nativeElement.scrollLeft);
    }, 250);
  }

  scrollRight() {
    const current = this.overflowContainer.nativeElement.scrollLeft;
    console.log(current);
    this.overflowContainer.nativeElement.scroll({
      left: this.overflowContainer.nativeElement.scrollLeft + 150,
      behavior: 'smooth',
    });
    setTimeout(() => {
      if (this.overflowContainer.nativeElement.scrollLeft === current) {
        this.showRightButton = false;
      }
      this.showLeftButton = true;
      console.log(this.overflowContainer.nativeElement.scrollLeft);
    }, 250);
  }
  chipClicked(index: number) {
    this.chips[index].selected = !this.chips[index].selected;
  }
  isOverflow(clientWidth: number, scrollWidth: number): boolean {
    return scrollWidth > clientWidth;
  }

  showResults() {
    if (!this.searchCriteria || this.searchCriteria?.length < 3) {
      this.searchResults = [];
    } else {
      this.searchResults = this.blogPosts.filter((blogPost) => {
        return (
          blogPost.title.includes(this.searchCriteria) ||
          blogPost.summary.includes(this.searchCriteria) ||
          blogPost.tags.find((tag) => {
            return tag.includes(this.searchCriteria)
          })
        );
      });;
    }
  }

  clearSearchCriteria() {
    this.searchCriteria = ``;
    this.showResults();
  }
}
