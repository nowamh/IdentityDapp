import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { IdentityService, Web3Service } from 'app/services/services';

@Component({
  selector: 'app-add-social-media',
  templateUrl: './add-social-media.component.html',
  styleUrls: ['./add-social-media.component.css']
})
export class AddSocialMediaComponent implements OnInit {
  // form 
  socialMedia: FormGroup;
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
    this.socialMedia = new FormGroup({
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

  onSubmit(social) {
    this.identityService.addSocialLink(this.facebook.value, social).subscribe (res => {
      console.log(social,res)})
  }
}
