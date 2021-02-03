import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AspAngularProjectComponent } from './asp-angular-project.component';

describe('AspAngularProjectComponent', () => {
  let component: AspAngularProjectComponent;
  let fixture: ComponentFixture<AspAngularProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AspAngularProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AspAngularProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
