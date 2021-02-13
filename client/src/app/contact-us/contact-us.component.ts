import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  constructor(private titleService: Title, private metaService: Meta) { }

  ngOnInit(): void {
    this.titleService.setTitle(`Contact Us | Symartsoft`);
    const metaDescription = `Contact Symartsoft administration`;
    this.metaService.updateTag({
      name: `description`,
      content: metaDescription
    }, `name=description`);
  }

}
