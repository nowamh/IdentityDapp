import { Component, OnInit } from '@angular/core';
import { IdentityService, Web3Service } from 'app/services/services';
import { Identity } from 'app/shared/models/identity';
import * as Rellax from 'rellax';

@Component({
  selector: 'app-identity-profile',
  templateUrl: './identity-profile.component.html',
  styleUrls: ['./identity-profile.component.css']
})
export class IdentityProfileComponent implements OnInit {
  identity: Identity
  zoom: number = 14;
  lat: number = 44.445248;
  lng: number = 26.099672;
  styles: any[] = [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}];
    data : Date = new Date();
    focus;
    focus1;

    constructor(private identityService: IdentityService, private web3Service: Web3Service) {
     this.identity= new Identity()
     }

    ngOnInit() {
      this.identityService.getId().subscribe(res=>{
        console.log(res);
        this.identity.firstname= res.firstname
        this.identity.lastname= res.lastname
        this.identity.nickname= res.nickname
        this.identityService.getSocialLinkByName('facebook').subscribe(res =>{
          console.log("facebook",res);
          this.identity.facebook=res
         

          console.log(this.identity)

        })
  
        this.identityService.getSocialLinkByName('instagram').subscribe(res=>{
          console.log("instagram",res);
          this.identity.instagram=res
       
          console.log(this.identity)

        })
        this.identityService.getSocialLinkByName('twitter').subscribe(res=>{
          console.log("twitter",res);
          this.identity.twitter=res
          console.log(this.identity)

        })
        console.log(this.identity)

      })

     
      var rellaxHeader = new Rellax('.rellax-header');

        var body = document.getElementsByTagName('body')[0];
        body.classList.add('profile-page');
        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');
    }
    ngOnDestroy(){
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('profile-page');
        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
    }

}


