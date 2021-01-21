import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatChipsModule} from '@angular/material/chips';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatDividerModule,
    MatMenuModule,
    MatBottomSheetModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatChipsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    MatSnackBarModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatDividerModule,
    MatMenuModule,
    MatBottomSheetModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatChipsModule
  ],
})
export class MaterialsModule {}
