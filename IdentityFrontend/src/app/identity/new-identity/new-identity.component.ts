import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IdentityService } from 'app/services/identity/identity.service';
import { Web3Service } from 'app/services/web3/web3.service';
import { read } from 'fs';
import { buffer } from 'rxjs-compat/operator/buffer';
import ipfs from '../../services/ipfs /ipfs.service'
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
    filebuffer: any ;
  fileContent: ArrayBuffer;
  fileToUpload: any 
  error: boolean;
  accounts: string[];
  data: Date = new Date();
  focus;
  focus1;
  address: string
  ammount: any

  constructor(private identityService: IdentityService, private web3Service: Web3Service) {
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
      avatar: this.avatar
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

  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    const reader= new window.FileReader()
    reader.onload = (e) => {
    let buffer =  reader.readAsArrayBuffer(this.fileToUpload)
    this.filebuffer=buffer
    }
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

    ipfs.files.add(this.filebuffer, function (err, result) {
      if (err) {
        console.log(err)
      } else {
        console.log(result[0].hash)
        this.identityService.addNewId(this.firstname.value, this.lastname.value, this.nickname.value, this.avatar.value).subscribe(res => {
          console.log(res)
           // reset the form
           this.identityForm.reset();
         });
      }
    })


  }

}
