import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title, Meta } from '@angular/platform-browser';
import { DeleteAccountDialogComponent } from '../delete-account-dialog/delete-account-dialog.component';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css'],
})
export class AccountSettingsComponent implements OnInit {
  constructor(public dialog: MatDialog, private titleService: Title, private metaService: Meta) {}

  ngOnInit(): void {
    this.titleService.setTitle(`Account Settings | Symartsoft`);
    const metaDescription = `Manage Symartsoft account settings`;
    this.metaService.updateTag({
      name: `description`,
      content: metaDescription
    }, `name=description`);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DeleteAccountDialogComponent);
  }
}
