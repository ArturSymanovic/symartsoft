import { Component, Input, OnInit } from '@angular/core';

import 'prismjs/prism';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-docker';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-csharp';

declare var Prism: any;

@Component({
  selector: 'app-formatted-code',
  templateUrl: './formatted-code.component.html',
  styleUrls: ['./formatted-code.component.css'],
})
export class FormattedCodeComponent implements OnInit {
  @Input() language: string = `clike`;
  @Input() code: string = ``;
  tokenisedCode = ``;
  languageClass: string = ``;
  languageEnum: any;
  constructor() {}

  ngOnInit(): void {
    this.highlightCode();
  }

  highlightCode() {
    if (!this.language) {
      this.language = `clike`;
      console.log(`No Language provided for syntax highlighting!`);
    }
    this.languageClass = `language-${this.language}`;
    switch (this.language) {
      case `javascript`:
        this.languageEnum = Prism.languages.javascript;
        break;
      case `csharp`:
        this.languageEnum = Prism.languages.csharp;
        break;
      case `typescript`:
        this.languageEnum = Prism.languages.typescript;
        break;
      case `docker`:
        this.languageEnum = Prism.languages.docker;
        break;
      case `bash`:
        this.languageEnum = Prism.languages.bash;
        break;
      case `css`:
        this.languageEnum = Prism.languages.css;
        break;
      case `sql`:
        this.languageEnum = Prism.languages.sql;
        break;
      case `html`:
        this.languageEnum = Prism.languages.html;
        break;
      default:
        this.languageEnum = Prism.languages.clike;
        break;
    }
    this.tokenisedCode = Prism.highlight(
      this.code.trim(),
      this.languageEnum,
      this.language
    );
  }
}
