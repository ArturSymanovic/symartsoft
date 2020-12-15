import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  signInForm: FormGroup;
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.signInForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl(),
    });
  }

  login() {
    this.authService.login(this.signInForm.value).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/');
        this.snackbar.open('Logged In', '', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      },
      error: (error) => {
        this.snackbar.open(error.error, '', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      },
    });
  }
}
