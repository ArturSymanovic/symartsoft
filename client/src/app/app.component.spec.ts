import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatToolbarHarness } from '@angular/material/toolbar/testing'
import { MatToolbarModule } from '@angular/material/toolbar';

describe('AppComponent', () => {

  let loader: HarnessLoader;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatToolbarModule
      ],
      declarations: [
        AppComponent
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    //const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should render toolbar`, async () => {
    const toolbar = await loader.getHarness(MatToolbarHarness);
    console.log((await toolbar.getRowsAsText())[0]);
    expect (toolbar).toBeTruthy();
  });

  it(`toolbar text shoud contain title`, async () => {
    const toolbar = await loader.getHarness(MatToolbarHarness);
    const text = (await toolbar.getRowsAsText())[0];
    expect (text).toContain(fixture.componentInstance.title);
  });

});
