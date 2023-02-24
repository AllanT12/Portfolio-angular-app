import {Component, Inject, OnInit} from '@angular/core';
import { Work } from '../../work.model';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {User} from "../../user.model";

export interface DialogData {
  user: User;
  work: Work;
}

@Component({
  selector: 'app-portofolio',
  templateUrl: './portofolio.component.html',
  styleUrls: ['./portofolio.component.css']
})
export class PortofolioComponent implements OnInit {
  isPhonePortrait = false;
  isDesktop = true;
  user: User = new User();
  newWork: Work = new Work();
  works: Work[] = [
    {
      id: 1,
      title: 'Appointment App',
      description: 'Description for Appointment app',
      imageUrl: './assets/photo/appointmen.png',
      customerLink: 'https://github.com/AllanT12/Appointments',
      hidden: false
    },
    {
      id: 2,
      title: 'Project 2',
      description: 'Description for Project 2',
      imageUrl: './assets/photo/first_page.png',
      customerLink: 'https://example.com/customer2',
      hidden: false
    }
  ];
  constructor(private responsive: BreakpointObserver, public dialog: MatDialog) {

  }

  ngOnInit() {
  this.user.works = this.works;
    this.responsive.observe(Breakpoints.HandsetPortrait)
      .subscribe(result => {
        this.isPhonePortrait = result.matches;
        this.isDesktop = !this.isPhonePortrait;
      });
  }



  workForm: boolean = true;

  addWork() {
    this.newWork.id = this.works.length + 1;
    this.works.push(this.newWork);
    this.newWork = new Work();

  }

  openAddDialog(id: number):void {
    if (id != 0) {
      this.newWork = this.user.works[id-1];
    } else {this.newWork.id =0;}
    const dialogRef = this.dialog.open(DialogOverview, {
      data: {user: this.user, work: this.newWork},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.id == 0){
        result.id = this.works.length + 1;
        this.works.push(result);
      this.newWork = new Work();}else {
        this.works[result.id] = result;
        this.newWork = new Work();
      }
    });
    this.newWork = new Work();
  }

  deleteWork(id: number) {
    this.user.works = this.user.works.filter(work => work.id !== id);//I create a new new works array without that entry
  }

  toggleVisibility(id: number) {
    this.works[id].hidden = true;
  }



  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      this.user.pfpUrl = reader.result as string;
    };

    reader.readAsDataURL(file);
  }
}

@Component({
  selector: 'app-portofolio',
  templateUrl: './add-entry-dialog.html',
})
export class DialogOverview {
  constructor(
    public dialogRef: MatDialogRef<DialogOverview>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
    this.data.work = new Work();
  }

  handleImageInput(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      this.data.work.imageUrl = reader.result as string;
    };

    reader.readAsDataURL(file);
  }
}
