import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MaterialsModule } from '../_modules/materials/materials.module';
import { ManagePrivacyComponent } from './manage-privacy.component';

describe('ManagePrivacyComponent', () => {
  let component: ManagePrivacyComponent;
  let fixture: ComponentFixture<ManagePrivacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagePrivacyComponent],
      imports: [
        MatBottomSheetModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        FormsModule,
        MaterialsModule,
      ],
      providers: [MatSnackBar],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePrivacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
