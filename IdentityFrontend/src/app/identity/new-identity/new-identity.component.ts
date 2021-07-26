import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-identity',
  templateUrl: './new-identity.component.html',
  styleUrls: ['./new-identity.component.css']
})
export class NewIdentityComponent implements OnInit {

  data : Date = new Date();
  focus;
  focus1;

  constructor() { }

  ngOnInit() {
      var body = document.getElementsByTagName('body')[0];
      body.classList.add('login-page');

      var navbar = document.getElementsByTagName('nav')[0];
      navbar.classList.add('navbar-transparent');
  }
  ngOnDestroy(){
      var body = document.getElementsByTagName('body')[0];
      body.classList.remove('login-page');

      var navbar = document.getElementsByTagName('nav')[0];
      navbar.classList.remove('navbar-transparent');
  }

}
