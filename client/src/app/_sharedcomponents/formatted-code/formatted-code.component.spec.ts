import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormattedCodeComponent } from './formatted-code.component';

describe('FormattedCodeComponent', () => {
  let component: FormattedCodeComponent;
  let fixture: ComponentFixture<FormattedCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormattedCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormattedCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
