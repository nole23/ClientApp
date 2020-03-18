import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-images',
  templateUrl: './profile-images.component.html',
  styleUrls: ['./profile-images.component.css']
})
export class ProfileImagesComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ProfileImagesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() { }

  // If the user clicks the cancel button a.k.a. the go back button, then\
  // just close the modal
  closeModal() {
    this.dialogRef.close();
  }
}
