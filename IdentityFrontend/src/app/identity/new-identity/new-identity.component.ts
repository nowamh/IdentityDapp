import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IdentityService } from 'app/services/identity/identity.service';
import { Web3Service } from 'app/services/web3/web3.service';
import { Observable } from 'rxjs';

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
  private facebook: FormControl;
  private instagram: FormControl;
  private twitter :FormControl;
  fileBlob: File;
  fileContent: ArrayBuffer;

  error: boolean;
  accounts: string[];
  data: Date = new Date();
  focus;
  focus1;
  address: string
  ammount: any
  constructor(private identityService: IdentityService, private web3Service: Web3Service, private router: Router) {
    // call createForm
    this.createFormControls();
    this.createForm();
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
      facebook: this.facebook,
      twitter: this.twitter,
      instagram: this.instagram



    });
  }
  ngOnInit() {
   
    this.error = false
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('login-page');

    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
  }


  /**
  * createFormControls
  */
  createFormControls() {
    this.firstname = new FormControl(''),
    this.lastname = new FormControl('');
    this.nickname = new FormControl('');
    this.avatar = new FormControl('');
    this.instagram = new FormControl('');
    this.facebook = new FormControl('');
    this.twitter = new FormControl('');

  }

  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('login-page');

    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }
  // this function is called when submit registration

  onSubmit() {
    /* if (this.identityService.checkIdExistance()== true)
     this.error  =true ;
     else*/
    // call contract addNewID with required parameters
    console.log("call contract addNewID with required parameters")
    console.log("first name",this.firstname.value)
    this.identityService.addNewId(this.firstname.value, this.lastname.value, this.nickname.value, this.avatar.value).subscribe(res => {
     console.log(res)
      // reset the form
      this.router.navigate(['/identity/socialMedia']);

     // this.identityService.addSocialLink(this.facebook.value, "facebook").subscribe (res => {
       // console.log("facebook ",res)})
      //this.identityService.addSocialLink(this.instagram.value, "instagram").subscribe (res => {
       // console.log("instagram ",res)})
     // this.identityService.addSocialLink(this.twitter.value, "twitter").subscribe (res => {
      //  console.log("twitter ",res)})

      this.identityForm.reset();
    });

  }

}
