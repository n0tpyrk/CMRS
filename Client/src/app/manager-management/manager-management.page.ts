/***Application - Aangular - manager-management.page.js***/
/*
 * This page is for user/barista student account management.
 * This page is only available for the administrator.
 */
import { Component, OnInit } from '@angular/core';
import { Postman } from '../postman.service';
import { Router,ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-manager-management',
  templateUrl: './manager-management.page.html',
  styleUrls: ['./manager-management.page.scss'],
})

export class ManagerManagementPage implements OnInit 
{

  managers:any;
  updateTime:any;
  
  constructor(private postman : Postman, 
              private router:Router,
              private changeRef: ChangeDetectorRef,
              public alertController: AlertController) { }

  ngOnInit() 
  {
    // if the current user is not the administrator,
    // jump to the dashboard page
    if(this.postman.getCurrentRole()! = 2)
    {
      this.router.navigate(['/tabs/tab1']);
    }
  }
  
  // get all staff/manager accounts
  getManagers()
  {
    var sub = this.postman.getUsers(1).subscribe(data=> 
      {
        console.log(data);
        if(data['rowCount']!=0)
        {
          this.managers = data['rows'];
          console.log(this.managers);
          this.updateTime = this.postman.getCurrentTime();
          this.changeRef.detectChanges();
        }
        else
        {
          this.managers=data['rows'];
          this.changeRef.detectChanges();
        }
      });
  }
  
  // toggle an account's activation status
  // if an account is de-activated, it cannot be logged in
  toggleManager(name:string,activated:boolean)
  {
    this.postman.updateActivated(name, !activated).subscribe(data=>
    {
      console.log(data);
    });
  }
  
  // add a new staff/manager
  createManager(name:string,key:string)
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
      this.postman.nameDuplicationCheck(name).subscribe(data=>
      {
        console.log(data);
        if(data['rowCount'] == 0)
        {
          this.postman.createUser(name,key,1).subscribe(data=>
          {
            console.log(data);
          });
          alert('Manager '+ name +' has sucessfully created!');
        }
        else
        {
          alert('USERNAME has been taken!');
        }
      });
    }
  }
  
  // delete a staff/manager account 
  async deleteManager(name:string)
  {
    // a prompt for comfirmation
    const alert = await this.alertController.create({
      header: 'Deletion Confirm!',
      message: 'Do you really want to delete this manager?',
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
            //alert("0.0"+name+":"+activated);
            this.postman.deleteUser(name).subscribe(data=>
            {
              console.log(data);
              this.getManagers();
            });
            
          }
        }
      ]
    });
    await alert.present();
    this.getManagers();  
  }
}