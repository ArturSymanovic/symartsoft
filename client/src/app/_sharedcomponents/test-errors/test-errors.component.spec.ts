import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
} from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { of, throwError } from 'rxjs';
import { MaterialsModule } from 'src/app/_modules/materials/materials.module';
import { TestErrorsComponent } from './test-errors.component';

describe('TestErrorsComponent', () => {
  let component: TestErrorsComponent;
  let fixture: ComponentFixture<TestErrorsComponent>;
  let loader: HarnessLoader;
  let httpClientSpy: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj(
    'HttpClient',
    ['post', 'get']
  );
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestErrorsComponent],
      imports: [MaterialsModule],
      providers: [{ provide: HttpClient, useValue: httpClientSpy }],
    }).compileComponents();
    fixture = TestBed.createComponent(TestErrorsComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should render buttons for receiving errors`, async () => {
    const button400generic = await loader.getHarness(
      MatButtonHarness.with({ text: `400 generic` })
    );
    const button400validation = await loader.getHarness(
      MatButtonHarness.with({ text: `400 validation` })
    );
    const button401 = await loader.getHarness(
      MatButtonHarness.with({ text: `401` })
    );
    const button404 = await loader.getHarness(
      MatButtonHarness.with({ text: `404` })
    );
    const button500 = await loader.getHarness(
      MatButtonHarness.with({ text: `500` })
    );

    expect(button400generic).toBeTruthy();
    expect(button400validation).toBeTruthy();
    expect(button401).toBeTruthy();
    expect(button404).toBeTruthy();
    expect(button500).toBeTruthy();
  });

  it(`400 generic button should call the getGeneric400error`, async () => {
    const button400 = await loader.getHarness(
      MatButtonHarness.with({ text: `400 generic` })
    );
    spyOn(fixture.componentInstance, 'getGeneric400error');

    await button400.click();

    expect(fixture.componentInstance.getGeneric400error).toHaveBeenCalled();
  });

  it(`functions shoud log errors to the console`, async () => {
    let errorStub = new HttpErrorResponse({ status: 400, statusText: `400 validation` });
    httpClientSpy.post.and.returnValue(throwError(errorStub));
    spyOn(console, `log`);
    await component.getValidation400error();
    expect(console.log).toHaveBeenCalledWith(errorStub);

    errorStub = new HttpErrorResponse({ status: 400, statusText: `400 generic` });
    httpClientSpy.get.and.returnValue(throwError(errorStub));
    await component.getGeneric400error();
    expect(console.log).toHaveBeenCalledWith(errorStub);

    errorStub = new HttpErrorResponse({ status: 401, statusText: `401` });
    httpClientSpy.get.and.returnValue(throwError(errorStub));
    await component.get401error();
    expect(console.log).toHaveBeenCalledWith(errorStub);

    errorStub = new HttpErrorResponse({ status: 404, statusText: `404` });
    httpClientSpy.get.and.returnValue(throwError(errorStub));
    await component.get404error();
    expect(console.log).toHaveBeenCalledWith(errorStub);

    errorStub = new HttpErrorResponse({ status: 500, statusText: `500` });
    httpClientSpy.get.and.returnValue(throwError(errorStub));
    await component.get500error();
    expect(console.log).toHaveBeenCalledWith(errorStub);
  });

  it(`400 validation button should call the getValidation400error`, async () => {
    const button400validation = await loader.getHarness(
      MatButtonHarness.with({ text: `400 validation` })
    );
    spyOn(fixture.componentInstance, 'getValidation400error');

    await button400validation.click();

    expect(fixture.componentInstance.getValidation400error).toHaveBeenCalled();
  });

  it(`401 button should call the get401error`, async () => {
    const button401 = await loader.getHarness(
      MatButtonHarness.with({ text: `401` })
    );
    spyOn(fixture.componentInstance, 'get401error');

    await button401.click();

    expect(fixture.componentInstance.get401error).toHaveBeenCalled();
  });

  it(`404 button should call the get404error`, async () => {
    const button404 = await loader.getHarness(
      MatButtonHarness.with({ text: `404` })
    );
    spyOn(fixture.componentInstance, 'get404error');

    await button404.click();

    expect(fixture.componentInstance.get404error).toHaveBeenCalled();
  });

  it(`500 button should call the get500error`, async () => {
    const button500 = await loader.getHarness(
      MatButtonHarness.with({ text: `500` })
    );
    spyOn(fixture.componentInstance, 'get500error');

    await button500.click();

    expect(fixture.componentInstance.get500error).toHaveBeenCalled();
  });
});
