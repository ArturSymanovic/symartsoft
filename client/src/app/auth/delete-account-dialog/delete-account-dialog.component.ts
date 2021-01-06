import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-delete-account-dialog',
  templateUrl: './delete-account-dialog.component.html',
  styleUrls: ['./delete-account-dialog.component.css'],
})
export class DeleteAccountDialogComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialogRef<DeleteAccountDialogComponent>
  ) {}

  ngOnInit(): void {}

  deleteAccount(): void {
    this.authService.delete().subscribe({
      next: (response) => {
        this.router.navigateByUrl('/');
        this.snackbar.open('Account have been deleted', '', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
        this.dialog.close();
      },
      error: (error) => {},
    });
  }
}
