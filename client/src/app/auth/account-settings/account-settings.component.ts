import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { DeleteAccountDialogComponent } from '../delete-account-dialog/delete-account-dialog.component';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css'],
})
export class AccountSettingsComponent implements OnInit {
  constructor(public dialog: MatDialog, private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle(`Account Settings | Symartsoft`);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DeleteAccountDialogComponent);
  }
}
