/***Application - Aangular - machine-management.page.js***/
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
  selector: 'app-machine-management',
  templateUrl: './machine-management.page.html',
  styleUrls: ['./machine-management.page.scss'],
})
export class MachineManagementPage implements OnInit {

  machines:any;
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
  
  // get all coffee machines' information
  getMachineList()
  {
    var sub = this.postman.getMachines(2,null).subscribe(data=> 
      {
        if(data['rowCount']!=0)
        {
          this.machines = data['rows'];
          this.updateTime = this.postman.getCurrentTime();
          this.changeRef.detectChanges();
        }
        else
        {
          this.machines = data['rows'];
          this.changeRef.detectChanges();
        }
      });
  }
  
  // toggle an account's activation status
  // if an account is de-activated, it cannot be used by barista students
  toggleMachine(id:number,stat:boolean)
  {
    this.postman.updateStat(id, !stat).subscribe(data=>
    {
      console.log(data);
    });
  }
  
  // add a new coffee machine
  addCoffeeMachine(id:number)
  {
    var rowNum = -1;
    if(id == null)
    {
      alert("Machine ID cannot be empty!");
    }
    else
    {
      // the coffee machine id should be unique
      this.postman.idDuplicationCheck(id).subscribe(data=>
      {
        console.log(data);
        if(data['rowCount'] == 0)
        {
          this.postman.addMachine(id).subscribe(data=>
          {
            console.log(data);
          });
          alert('Machine '+ id +' has sucessfully added!');
        }
        else
        {
          alert('Machine ID has been taken!');
        }
      });
    }
  }
  
  // delete a coffee machine
  async deleteCoffeeMachine(id:number)
  {
      // a prompt for comfirmation
      const alert = await this.alertController.create({
        header: 'Deletion Confirm!',
        message: 'Do you really want to delete this coffee machine?',
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
              this.postman.deleteMachine(id).subscribe(data=>
              {
                this.getMachineList();
              });
              this.getMachineList();
            }
          }
        ]
      });
      await alert.present();
      this.getMachineList(); 
  }
}