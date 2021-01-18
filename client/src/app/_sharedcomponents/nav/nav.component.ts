import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  title = 'Symartsoft';
  constructor(
    public authService: AuthService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

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
