/***Application - Aangular - user-management.page.js***/
/*
 * This page is for user/barista student account management.
 * This page is only available for staff.
 */
import { Component, OnInit } from '@angular/core';
import { Postman } from '../postman.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.page.html',
  styleUrls: ['./user-management.page.scss'],
})
export class UserManagementPage implements OnInit 
{
  
  members:any;
  updateTime:any;

  constructor(private postman : Postman, 
              private router:Router,
              private changeRef: ChangeDetectorRef,
              public alertController: AlertController) { }
  
  ngOnInit() 
  {
        // if the current user is not the staff/manager,
    // jump to the dashboard page
    if(this.postman.getCurrentRole()! = 1)
    {
      this.router.navigate(['/tabs/tab1']);
    }
  }
  
  // get all barista student accounts
  getMembers()
  {
    var sub = this.postman.getUsers(0).subscribe(data=> 
      {
        console.log(data);
        if(data['rowCount']! = 0)
        {
          this.members = data['rows'];
          console.log(this.members);
          this.updateTime = this.postman.getCurrentTime();
          this.changeRef.detectChanges();
        }
        else
        {
          this.members = data['rows'];
          this.changeRef.detectChanges();
        }
      });
  }
  
  // toggle an account's activation status
  // if an account is de-activated, it cannot be logged in
  toggleMember(name:string,activated:boolean)
  {
    this.postman.updateActivated(name, !activated).subscribe(data=>
    {
      console.log(data);
    });
  }
  
  // create a new barista student account
  createMember(name:string,key:string)
  {
    var rowNum = -1;
    if(name == "")
    {
      alert("USERNAME cannot be empty!");
    }
    else if(key == "")
    {
      alert("PASSWORD cannot be empty!");
    }
    else
    {
      // username should be unique
      this.postman.nameDuplicationCheck(name).subscribe(data=>
      {
        if(data['rowCount'] == 0)
        {
          this.postman.createUser(name,key,0).subscribe(data=>
          {
            console.log(data);
          });
          alert('Member '+ name +' has sucessfully created!');
        }
        else
        {
          alert('USERNAME has been taken!');
        }
      });
    }
  }
  
  // delete a barista student account
  async deleteMember(name:string)
  {
    // a prompt for comfirmation
    const alert = await this.alertController.create({
      header: 'Deletion Confirm!',
      message: 'Do you really want to delete this member?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirm',
          handler: () => {
            this.postman.deleteUser(name).subscribe(data=>
            {
              this.getMembers();
            });
            this.getMembers();
          }
        }
      ]
    });
    await alert.present();
    this.getMembers();
  } 
}
