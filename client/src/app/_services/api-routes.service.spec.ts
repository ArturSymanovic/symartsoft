import { TestBed } from '@angular/core/testing';
import { ApiRoutesService } from './api-routes.service';

describe('ApiRoutesService', () => {
  let service: ApiRoutesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiRoutesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#registerUrl should return valid url', () => {
    expect(() => {
      new URL(service.registerUrl());
    }).not.toThrowError();
  });

  it('#loginUrl should return valid url', () => {
    expect(() => {
      new URL(service.loginUrl());
    }).not.toThrowError();
  });

  it('#error400Url should return valid url', () => {
    expect(() => {
      new URL(service.error400Url());
    }).not.toThrowError();
  });

  it('#errorValidation400Url should return valid url', () => {
    expect(() => {
      new URL(service.errorValidation400Url());
    }).not.toThrowError();
  });

  it('#error401Url should return valid url', () => {
    expect(() => {
      new URL(service.error401Url());
    }).not.toThrowError();
  });

  it('#error404Url should return valid url', () => {
    expect(() => {
      new URL(service.error404Url());
    }).not.toThrowError();
  });

  it('#error500Url should return valid url', () => {
    expect(() => {
      new URL(service.error500Url());
    }).not.toThrowError();
  });
});
