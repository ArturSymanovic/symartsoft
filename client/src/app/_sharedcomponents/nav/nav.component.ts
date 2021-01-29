import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit, OnDestroy {
  title = 'Symartsoft';
  subscriptionToLayout: Subscription;
  showMobileMenu:  boolean = false;
  constructor(
    public authService: AuthService,
    private snackbar: MatSnackBar,
    private router: Router,
    private breakPointObserver: BreakpointObserver
  ) {
    this.subscriptionToLayout = this.breakPointObserver.observe([
      Breakpoints.HandsetPortrait
    ]).subscribe({
      next: (state) =>{
        if (state.matches) {
          this.showMobileMenu = true;
        } else {
          this.showMobileMenu = false;
        }
      }
    })
  }
  ngOnDestroy(): void {
    this.subscriptionToLayout.unsubscribe();
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
    this.snackbar.open('Logged Out', '', {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
    this.router.navigateByUrl(`/`);
  }
}
