import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterComponent ],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the link to home', () => {
    let hrefs = fixture.debugElement
      .queryAll(By.css('a'))
      .map((l) => l.nativeElement.getAttribute('routerLink'));
    expect(
      hrefs.findIndex((l) => {
        return l == '/';
      })
    ).not.toEqual(-1);
  });

  it('should render the link to blog', () => {
    let hrefs = fixture.debugElement
      .queryAll(By.css('a'))
      .map((l) => l.nativeElement.getAttribute('routerLink'));
    expect(
      hrefs.findIndex((l) => {
        return l == '/blog';
      })
    ).not.toEqual(-1);
  });

  it('should render the link to privacy-statement', () => {
    let hrefs = fixture.debugElement
      .queryAll(By.css('a'))
      .map((l) => l.nativeElement.getAttribute('routerLink'));
    expect(
      hrefs.findIndex((l) => {
        return l == '/privacy-statement';
      })
    ).not.toEqual(-1);
  });

  it('should render the link to manage-privacy', () => {
    let hrefs = fixture.debugElement
      .queryAll(By.css('a'))
      .map((l) => l.nativeElement.getAttribute('routerLink'));
    expect(
      hrefs.findIndex((l) => {
        return l == '/manage-privacy';
      })
    ).not.toEqual(-1);
  });

  it('should render the link to contact', () => {
    let hrefs = fixture.debugElement
      .queryAll(By.css('a'))
      .map((l) => l.nativeElement.getAttribute('routerLink'));
    expect(
      hrefs.findIndex((l) => {
        return l == '/contact';
      })
    ).not.toEqual(-1);
  });

  it('should render the link to sitemap', () => {
    let hrefs = fixture.debugElement
      .queryAll(By.css('a'))
      .map((l) => l.nativeElement.getAttribute('routerLink'));
    expect(
      hrefs.findIndex((l) => {
        return l == '/sitemap';
      })
    ).not.toEqual(-1);
  });
});
