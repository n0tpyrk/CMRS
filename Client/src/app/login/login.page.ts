/***Application - Aangular - login.page.js***/
/*
 * This is the login page.
 */
import { Component, OnInit } from '@angular/core';
import { Postman } from '../postman.service';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private postman : Postman, 
              private router:Router) { }
  ngOnInit() 
  {

  }
  
  // user login
  login(usr:string, pwd:string, role:number)
  {
    console.log(usr+" : "+pwd+" : "+role);
    if(usr=="")
    {
      alert("Please enter your USERNAME!");
    }
    else if(pwd=="")
    {
      alert("Please enter your PASSWORD!");
    }
    else if(role==null)
    {
      alert("Please select which role you would like to login as!");
    }
    else
    {
      let username = {name:usr};
      
      // get user information for the database
      var sub = this.postman.accessControl(username).subscribe(data=> 
      {
        console.log(data['rowCount']);
        if(data['rowCount'] == 1)
        {
          var keyGot = data['rows'][0].key;
          var roleGot = data['rows'][0].role;
          var activatedGot = data['rows'][0].activated;
          var machineidGot = data['rows'][0].machineid;
          var nameGot = data['rows'][0].name;
          
          // check if the user information is valid
          if(activatedGot && role == roleGot && pwd == keyGot)
          {
            this.postman.setLoginStatus(true);
            this.postman.setCurrentRole(role);
            this.postman.setCurrentMachineId(machineidGot);
            this.postman.setCurrentName(nameGot);
            this.router.navigate(['/tabs/tab1']);
          }
          else
          {
            alert("Incorrect USERNAME or PASSWORD!");
          }
        }
        else
        {
          alert("Incorrect USERNAME or PASSWORD!");
        }
        sub.unsubscribe();
      });
    }
  }
  
  
  disconnect()
  {
    this.postman.dbClose();
  }
  
}