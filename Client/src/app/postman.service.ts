/***Application - Aangular - postman.service.js***/
/*
 * This file contains all functions that communicate with the server.
 * And the setting functions of some global variables.
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class Postman
{
  constructor(private httpc : HttpClient) {}
  ipServer:string = 'https://example.herokuapp.com'; // Heroku server address
  
  // the variables for login status and user information
  isLogin:boolean = false;
  currentName:string;
  currentRole:number = null;
  currentMachineId:number = null;
  
  
  /*** IoT device functions ***/
  // send commands to the device through the server
  deviceCommand(data:any)
  {
    console.log(data);
    return this.httpc.post(this.ipServer + '/device/control', data);
  }
  
  
  /*** user account management functions ***/
  // check the login credential
  accessControl(data)
  {
    return this.httpc.post(this.ipServer + '/db', data);
  }
  
  // get user information
  getUsers(role:number)
  {
    var data={
      role : role
    };
    return this.httpc.post(this.ipServer + '/get-u', data);
  }
  
  // update user activation status
  updateActivated(name:string,activated:boolean)
  {
    var data =
    {
      name : name,
      activated : activated
    }
    return this.httpc.post(this.ipServer + '/update-activated', data);
  }
  
  // create a new user
  createUser(name:string,key:string,role:number)
  {
    var data =
    {
      name : name,
      key : key,
      role : role
    }
    return this.httpc.post(this.ipServer + '/create-user', data);
  }
  
  // delete a user
  deleteUser(name:string)
  {
    var data =
    {
      name : name
    }
    return this.httpc.post(this.ipServer + '/delete-u', data);
  }
  
  // prevent username duplication
  nameDuplicationCheck(name:string)
  {
    var data =
    {
      name : name
    }
    return this.httpc.post(this.ipServer + '/name-duplication-check', data);
  }
  
  
  /*** coffee machine management functions ***/
  // get coffee machine information
  // "role" controls which kind of machines the user could see
  // role: 0, barista students -> only the available machines are visible
  // role: 1, staff            -> all machines are visible
  // role: 2, administrator    -> all machines are visible
  getMachines(role:number,machineid:number)
  {
    var data={
      role:role,
      machineid:machineid
    };
    return this.httpc.post(this.ipServer + '/get-m', data);
  }
  
  // update coffee machine status
  updateStat(id:number,stat:boolean)
  {
    var data =
    {
      id : id,
      stat : stat
    }
    //console.log(data)
    return this.httpc.post(this.ipServer + '/update-m', data);
  }
  
  // add a new coffee machine
  addMachine(id:number)
  {
    var data =
    {
      id : id
    }
    return this.httpc.post(this.ipServer + '/add-m', data);
  }
  
  // delete a coffee machine
  deleteMachine(id:number)
  {
    var data =
    {
      id : id
    }
    return this.httpc.post(this.ipServer + '/delete-m', data);
  }
  
  // prevent coffee machine id duplication
  idDuplicationCheck(id:number)
  {
    var data =
    {
      id : id
    }
    return this.httpc.post(this.ipServer + '/id-duplication-check', data);
  }
  
  // who is using the coffee machine
  updateUserMachineId(name:string,id:number)
  {
    var data = {
      name:name,
      machineid:id
    }
    return this.httpc.post(this.ipServer + '/update-u-mid', data);
  }
  
  // update the coffee machine power status
  updateMachinePower(id:number,power:boolean)
  {
    var data = {
      machineid:id,
      power:power
    }
    return this.httpc.post(this.ipServer + '/update-m-power', data);
  }
  
  
  /*** database function ***/
  dbClose()
  {
    var data={
      dbClose : true
    };
    return this.httpc.post(this.ipServer + '/db', data);
  }
  
  
  /*** global variable function ***/
  getLoginStatus()
  {
    return this.isLogin;
  }
  
  setLoginStatus(stat:boolean)
  {
    this.isLogin = stat;
  }
  
  getCurrentRole():number
  {
    return this.currentRole;
  }
  
  setCurrentRole(role:number)
  {
    this.currentRole = role;
  }
  
  getCurrentName():string
  {
    return this.currentName;
  }
  
  setCurrentName(name:string)
  {
    this.currentName = name;
  }
  
  getCurrentMachineId():number
  {
    return this.currentMachineId;
  }
  
  setCurrentMachineId(id:number)
  {
    this.currentMachineId = id;
  }

  getCurrentTime():Date
  {
    var date = new Date();
    return date;
  }
}