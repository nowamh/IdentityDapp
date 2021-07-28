import { Injectable } from '@angular/core';
//import { FormControl } from '@angular/forms';
//const Web3 = require('web3');

declare let require: any;
declare let window: any;

//let tokenAbi = require('../../../../../../IdentityTruffle/build/contracts/Identities.json');

@Injectable({
  providedIn: 'root'
})
export class IdentityService {
  private account: any = null;
  private readonly web3: any;
  private enable: any;
  private web3Provider: null;
  private contracts: {};
  constructor() {
  /*  if (window.ethereum === undefined) {
      alert('Non-Ethereum browser detected. Install MetaMask');
    } else {
      if (typeof window.web3 !== 'undefined') {
        this.web3 = window.web3.currentProvider;
      } else {
        this.web3 = new Web3.providers.HttpProvider('http://localhost:8545');
      }
      console.log('transfer.service :: constructor :: window.ethereum');
      window.web3 = new Web3(window.ethereum);
      console.log('transfer.service :: constructor :: this.web3');
      console.log(this.web3);
      this.enable = this.enableMetaMaskAccount();
    }*/
   
  }  

  /*private async enableMetaMaskAccount(): Promise<any> {
    let enable = false;
    await new Promise((resolve, reject) => {
      enable = window.ethereum.enable();
    });
    return Promise.resolve(enable);
  }*/
  checkIdExistance() : boolean {
    throw new Error('Method not implemented.');
  }
  addNewId(firstname: string, lastname: string, nickname: string, avatar: string) {
    throw new Error('Method not implemented.');
  }
  getId() {
    throw new Error('Method not implemented.');
  }

  addSocialLink() {
    throw new Error('Method not implemented.');
  }
  getSocialLinkByName(){

  }
  removeSocialLinkByName(){

  }
  updateSocialLink(){

  }
}
