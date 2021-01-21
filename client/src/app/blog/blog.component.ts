import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

export interface Category {
  name: string;
  selected: boolean;
  class: string;
}

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
  chips: Category[] = [
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
}
