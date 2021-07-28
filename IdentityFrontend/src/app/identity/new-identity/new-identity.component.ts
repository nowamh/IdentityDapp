import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IdentityService } from 'app/core/services/identity/identity.service';

@Component({
  selector: 'app-new-identity',
  templateUrl: './new-identity.component.html',
  styleUrls: ['./new-identity.component.css']
})
export class NewIdentityComponent implements OnInit {
  // form 
  identityForm: FormGroup;
  private firstname: FormControl;
  private lastname: FormControl;
  private nickname: FormControl;
  private avatar: FormControl;
  error: boolean;

  data: Date = new Date();
  focus;
  focus1;

  constructor(private identityService: IdentityService) {
    this.createFormControls();
    this.createForm();
  }

  ngOnInit() {
    this.error= false
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('login-page');

    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
  }

  /**
  * createFormControls
  */
  createFormControls() {
    this.firstname = new FormControl('', Validators.required),
      this.lastname = new FormControl('', Validators.required);
    this.nickname = new FormControl('', Validators.required);
    this.avatar = new FormControl('', Validators.required);

  }

  /**
   * create form validators
   */
  createForm() {
    this.identityForm = new FormGroup({
      firstname: this.firstname,
      lastname: this.lastname,
      nickname: this.nickname,
      avatar: this.avatar,
    });
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('login-page');

    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }
  OnSubmit(){
     if (this.identityService.checkIdExistance()== true)
     this.error  =true ;
     else
     this.identityService.addNewId(this.firstname.value,this.lastname.value,this.nickname.value, this.avatar.value )
     
  }

}
