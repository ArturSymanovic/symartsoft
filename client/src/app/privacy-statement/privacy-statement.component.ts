import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-privacy-statement',
  templateUrl: './privacy-statement.component.html',
  styleUrls: ['./privacy-statement.component.css'],
})
export class PrivacyStatementComponent implements OnInit {
  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit(): void {
    this.titleService.setTitle(`Privacy Statement | Symartsoft`);
    const metaDescription = `Read Symartsoft Privacy Statement`;
    this.metaService.updateTag({
      name: `description`,
      content: metaDescription
    }, `name=description`);
  }
}
