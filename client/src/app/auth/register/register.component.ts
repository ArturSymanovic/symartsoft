import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup = new FormGroup({});
  validationErrors: string[] = [];
  subscriptionToLayout: Subscription;
  formFieldCssClass: string = `form-field`;
  formCssClass: string = `form`;
  errorSummaryCssClass: string = `error-summary`;
  privacyStatementCssClass: string = `privacy-notice`;
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackbar: MatSnackBar,
    private breakPointObserver: BreakpointObserver,
    private titleService: Title,
    private metaService: Meta
  ) {
    this.subscriptionToLayout = this.breakPointObserver.observe([
      Breakpoints.HandsetLandscape
    ]).subscribe({
      next: (state) =>{
        if (state.matches) {
          this.formFieldCssClass=`form-field-small`;
          this.formCssClass=`form-small`;
          this.errorSummaryCssClass=`error-summary-small`;
          this.privacyStatementCssClass=`privacy-notice-small`;
        } else {
          this.formFieldCssClass=`form-field`;
          this.formCssClass=`form`;
          this.errorSummaryCssClass=`error-summary`;
          this.privacyStatementCssClass=`privacy-notice`;
        }
      }
    })
  }
  ngOnDestroy(): void {
    this.subscriptionToLayout.unsubscribe();
  }

  ngOnInit(): void {
    this.initializeForm();
    this.titleService.setTitle(`Register | Symartsoft`);
    const metaDescription = `Register Symartsoft account`;
    this.metaService.updateTag({
      name: `description`,
      content: metaDescription
    }, `name=description`);
  }

  initializeForm(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  register() {
    this.authService.register(this.registerForm.value).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/');
        this.snackbar.open('Registered Successfully', '', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      },
      error: (error) => {
        if (Array.isArray(error)) {
          this.validationErrors = error;
          this.validationErrors = this.validationErrors.filter(
            (v) => !v.includes('Username')
          );
        }
      },
    });
  }
}
