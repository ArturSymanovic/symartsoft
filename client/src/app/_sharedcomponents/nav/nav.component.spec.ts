import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavComponent } from './nav.component';
import { MatToolbarHarness } from '@angular/material/toolbar/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('NavComponent', () => {
  let fixture: ComponentFixture<NavComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatToolbarModule, RouterTestingModule],
      declarations: [NavComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(NavComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it(`should render toolbar`, async () => {
    const toolbar = await loader.getHarness(MatToolbarHarness);
    expect(toolbar).toBeTruthy();
  });

  it(`should render the link to home`, () => {
    let hrefs = fixture.debugElement
      .queryAll(By.css('a'))
      .map((l) => l.nativeElement.getAttribute('href'));
    expect(
      hrefs.findIndex((l) => {
        return l == '/';
      })
    ).not.toEqual(-1);
  });

  it(`should render the link to blog`, () => {
    let hrefs = fixture.debugElement
      .queryAll(By.css('a'))
      .map((l) => l.nativeElement.getAttribute('href'));
    expect(
      hrefs.findIndex((l) => {
        return l == '/blog';
      })
    ).not.toEqual(-1);
  });

  it(`should render the link to sign in`, () => {
    let hrefs = fixture.debugElement
      .queryAll(By.css('a'))
      .map((l) => l.nativeElement.getAttribute('href'));
    expect(
      hrefs.findIndex((l) => {
        return l == '/signin';
      })
    ).not.toEqual(-1);
  });
});
