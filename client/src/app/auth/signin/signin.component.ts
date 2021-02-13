import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit, OnDestroy {
  signInForm: FormGroup = new FormGroup({});
  validationErrors: string[] = [];
  returnUrl: string = ``;
  subscriptionToRouterParams: Subscription;
  subscriptionToLayout: Subscription;
  formFieldCssClass: string = `form-field`;
  formCssClass: string = `form`
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private breakPointObserver: BreakpointObserver,
    private titleService: Title
  ) {
    this.subscriptionToRouterParams = this.route.queryParamMap.subscribe(
      (paramMap) => (this.returnUrl = paramMap.get(`returnUrl`) || '/')
    );
    this.subscriptionToLayout = this.breakPointObserver.observe([
      Breakpoints.HandsetLandscape
    ]).subscribe({
      next: (state) =>{
        if (state.matches) {
          this.formFieldCssClass=`form-field-small`;
          this.formCssClass=`form-small`;
        } else {
          this.formFieldCssClass=`form-field`;
          this.formCssClass=`form`;
        }
      }
    })
  }
  ngOnDestroy(): void {
    this.subscriptionToRouterParams.unsubscribe();
    this.subscriptionToLayout.unsubscribe();
  }

  ngOnInit(): void {
    this.initializeForm();
    this.titleService.setTitle(`Sign In | Symartsoft`);

  }

  initializeForm(): void {
    this.signInForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login() {
    this.authService.login(this.signInForm.value).subscribe({
      next: () => {
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
