import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit(): void {
    this.titleService.setTitle(`Home | Symartsoft`);
    const metaDescription = `Symartsoft is a multipurpose portal for software engineers and IT specialists`;
    this.metaService.updateTag({
      name: `description`,
      content: metaDescription
    }, `name=description`);
  }
}
