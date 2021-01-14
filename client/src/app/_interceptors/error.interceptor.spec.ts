import { HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ErrorInterceptor } from './error.interceptor';

describe('ErrorInterceptor', () => {
  let interceptor: ErrorInterceptor;
  let snackbarSpy: jasmine.SpyObj<MatSnackBar> = jasmine.createSpyObj(
    'MatSnackBar',
    ['open']
  );
  let routerSpy: jasmine.SpyObj<Router> = jasmine.createSpyObj('Router', [
    'navigateByUrl',
  ]);
  let httpRequestStub: jasmine.SpyObj<
    HttpRequest<unknown>
  > = jasmine.createSpyObj('HttpRequest', ['test']);
  let httpHandlerStub: jasmine.SpyObj<HttpHandler> = jasmine.createSpyObj(
    'HttpHandler',
    ['handle']
  );

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ErrorInterceptor,
        { provide: MatSnackBar, useValue: snackbarSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });
    TestBed.inject(Router);
    TestBed.inject(MatSnackBar);
    interceptor = TestBed.inject(ErrorInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should pass request further if there are no errors', (done) => {
    let responseStub = new HttpResponse({
      body: {
        dummyField: 'dummyValue',
      },
    });
    httpHandlerStub.handle.and.returnValue(of(responseStub));
    interceptor.intercept(httpRequestStub, httpHandlerStub).subscribe({
      next: (response) => {
        expect(response).toEqual(responseStub);
        done();
      },
      error: () => {
        fail();
        done();
      },
    });
  });

  it('should throw error if there is an error', (done) => {
    let errorStub = {};
    httpHandlerStub.handle.and.returnValue(throwError(errorStub));
    interceptor.intercept(httpRequestStub, httpHandlerStub).subscribe({
      next: () => {
        fail();
        done();
      },
      error: () => {
        expect(true).toEqual(true);
        done();
      },
    });
  });

  it('should open snackbar when there is BadRequest 400 error', (done) => {
    let errorStub = {
      status: 400,
    };
    httpHandlerStub.handle.and.returnValue(throwError(errorStub));
    interceptor.intercept(httpRequestStub, httpHandlerStub).subscribe({
      error: () => {
        expect(snackbarSpy.open).toHaveBeenCalled();
        done();
      },
    });
  });

  it('should throw flattened error array when there is BadRequest 400 error if there is error.errors object', (done) => {
    let errorStub = {
      status: 400,
      error: {
        errors: {
          email: ['Should contain @', 'Required'],
          password: ['Required'],
          test: null
        },
      },
    };
    let expectedResult = ['Should contain @', 'Required', 'Required'];
    httpHandlerStub.handle.and.returnValue(throwError(errorStub));
    interceptor.intercept(httpRequestStub, httpHandlerStub).subscribe({
      error: (error) => {
        expect(error).toEqual(expectedResult);
        done();
      },
    });
  });

  it('should throw error array when there is BadRequest 400 error and error property is an array of errors with descriptions', (done) => {
    let errorStub = {
      status: 400,
      error: [
        { description: 'Should contain @' },
        { description: 'Required' },
        { description: 'Required' },
      ],
    };
    let expectedResult = ['Should contain @', 'Required', 'Required'];
    httpHandlerStub.handle.and.returnValue(throwError(errorStub));
    interceptor.intercept(httpRequestStub, httpHandlerStub).subscribe({
      error: (error) => {
        expect(error).toEqual(expectedResult);
        done();
      },
    });
  });

  it('should open snackbar when there is Unauthorized 401 error', (done) => {
    let errorStub = {
      status: 401,
    };
    httpHandlerStub.handle.and.returnValue(throwError(errorStub));
    interceptor.intercept(httpRequestStub, httpHandlerStub).subscribe({
      error: () => {
        expect(snackbarSpy.open).toHaveBeenCalled();
        done();
      },
    });
  });

  it('should navigate to /not-found when there is Not-Found 404 error', (done) => {
    let errorStub = {
      status: 404,
    };
    httpHandlerStub.handle.and.returnValue(throwError(errorStub));
    interceptor.intercept(httpRequestStub, httpHandlerStub).subscribe({
      error: () => {
        expect(routerSpy.navigateByUrl).toHaveBeenCalledWith(`/not-found`);
        done();
      },
    });
  });

  it('should navigate to /server-error when there is Internal Server 500 error', (done) => {
    let errorStub = {
      status: 500,
      error: '',
    };
    const navigationExtrasStub = {
      state: {
        error: errorStub.error
      },
    };
    httpHandlerStub.handle.and.returnValue(throwError(errorStub));
    interceptor.intercept(httpRequestStub, httpHandlerStub).subscribe({
      error: () => {
        expect(routerSpy.navigateByUrl).toHaveBeenCalledWith(
          `/server-error`,
          navigationExtrasStub
        );
        done();
      },
    });
  });
});
