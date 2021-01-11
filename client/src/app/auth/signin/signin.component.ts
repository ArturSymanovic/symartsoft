import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  signInForm: FormGroup = new FormGroup({});
  validationErrors: string[] = [];
  returnUrl: string = ``;
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.route.queryParamMap.subscribe(
      (paramMap) => (this.returnUrl = paramMap.get(`returnUrl`) || '/')
    );
  }

  initializeForm(): void {
    this.signInForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login() {
    this.authService.login(this.signInForm.value).subscribe({
      next: (response) => {
        this.router.navigateByUrl(this.returnUrl);
        this.snackbar.open('Logged In', '', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      },
      error: (error) => {
        if (Array.isArray(error)) {
          this.validationErrors = error;
        } else if (error.error) {
          this.validationErrors = [];
          this.validationErrors.push(error.error);
        }
      },
    });
  }
}
