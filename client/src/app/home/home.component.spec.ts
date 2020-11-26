import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the link to ABOUT', () => {
    let hrefs = fixture.debugElement
      .queryAll(By.css('a'))
      .map((l) => l.nativeElement.getAttribute('routerLink'));
      console.log(hrefs);
    expect(
      hrefs.findIndex((l) => {
        return l == '/about';
      })
    ).not.toEqual(-1);
  });

  it('should render the link to BLOG', () => {
    let hrefs = fixture.debugElement
      .queryAll(By.css('a'))
      .map((l) => l.nativeElement.getAttribute('routerLink'));
      console.log(hrefs);
    expect(
      hrefs.findIndex((l) => {
        return l == '/blog';
      })
    ).not.toEqual(-1);
  });
});
