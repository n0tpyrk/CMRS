/***Application - Aangular - tab1.page.js***/
/*
 * This is the current user's dashboard page after login.
 * Barista students can operate available coffee machines on this page.
 * Staff and the Administrator can operate all coffee machines on this page.
 * Staff also have 1 button to go to the user account management page
 * The Administrator also has 2 button to go to staff/manager account
 * management page and the coffee machine management page..
 */
import { Component } from '@angular/core';
import { Postman } from '../postman.service';
import { Router } from '@angular/router';

// for real-time UI updating
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private postman : Postman, 
              private router:Router,
              private changeRef: ChangeDetectorRef) {}
              
  role:number;
  machines:any;
  updateTime:any;
  
  ngOnInit()
  {
    // get login status
    // if not logged in, jump to loginpage
    if(!this.postman.getLoginStatus())
    {
      this.router.navigate(['/login']);
    }
    
    this.role = this.postman.getCurrentRole();
  }
  
  // send device control command and subscribe the return from the server
  deviceControl(deviceNum:number, command:string)
  {
    let deviceInfo = 
    {
      deviceNum : deviceNum,
      command : command
    };
    this.postman.deviceCommand(deviceInfo).subscribe({
      next(data) {
        console.log(data);
      },
      error(data) {
        console.log(data);
      }
    });
  }
  
  // turn off a coffee machine by its machine ID
  powerOff(deviceNum) 
  {
    this.deviceControl(deviceNum, 'off');
    var sub=this.postman.updateMachinePower(deviceNum, false).subscribe(data=>
    {
      this.getMachineList();
      
      // if the current user is a barista student,
      // update his/her current machine information
      if(this.postman.getCurrentRole() == 0)
      {
        this.updateMachineId(this.postman.getCurrentName(),null);
      }
    });
  }

  // turn on a coffee machine by its machine ID
  powerOn(deviceNum) 
  {
    this.deviceControl(deviceNum, 'on');
    var sub=this.postman.updateMachinePower(deviceNum, true).subscribe(data=>
    {
      this.getMachineList();
      
      // if the current user is a barista student,
      // update his/her current machine information
      if(this.postman.getCurrentRole() == 0)
      {
        this.updateMachineId(this.postman.getCurrentName(), deviceNum);
      }
    });
  }
  
  // use a toggle UI component to turn on/off the coffee machine
  toggleMachine(machineID:number, switcher:boolean)
  {
    if(!switcher)
    {
      this.powerOn(machineID);
    }
    else
    {
      this.powerOff(machineID);     
    }
    
  }
  
  // log out the current user 
  logout()
  {
    this.postman.setLoginStatus(false);
    this.postman.setCurrentRole(null);
    this.postman.setCurrentMachineId(null);
    this.router.navigate(['/login']);
  }
  
  // get information of all coffee machines
  getMachineList()
  {
    var sub = this.postman.getMachines(this.postman.getCurrentRole(), this.postman.getCurrentMachineId()).subscribe(data=> 
      {
        if(data['rowCount']!=0)
        {
          this.machines = data['rows'];
          console.log(this.machines);
          this.updateTime = this.postman.getCurrentTime();
          this.changeRef.detectChanges();
        }
        else
        {
          this.machines=data['rows'];
          this.changeRef.detectChanges();
        }
      });
  }
  
  // update the currently using machine information of the user 
  updateMachineId(name:string,id:number)
  {
    var sub = this.postman.updateUserMachineId(name, id).subscribe(data=> 
    {
      console.log("update machine id :: "+name+", "+id);
      console.log(data);
      this.postman.setCurrentMachineId(id);
      this.getMachineList();
    });
  }
}
