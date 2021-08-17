import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { Web3Service } from '../web3/web3.service';
import { Identity } from 'app/shared/models/identity';
import { SocilaMedia } from 'app/shared/models/socialMedia';
const artifacts = require('../../core/contracts/Identities.json')
const contract = require("@truffle/contract");
@Injectable({
  providedIn: 'root'
})
export class IdentityService {

  private subject = new Subject<any>();
  identity :any  

  public abi: any

  constructor(private web3Service: Web3Service) {
    this.identity = contract(artifacts);
    this.identity.setProvider(this.web3Service.web3.currentProvider);
 }
  
    instanciateContract (){
      this.identity = contract(artifacts);
      this.identity.setProvider(this.web3Service.web3.currentProvider);
   }

  checkIdExistance(): boolean {
    throw new Error('Method not implemented.');
  }
  addNewId( firstname: string, lastname: string, nickname: string, avatar: string): Observable<any> {
    const web3 = this.web3Service.web3;

    this.web3Service.getAccounts().subscribe(res => {
      web3.eth.defaultAccount= res[0].address; // assign active account of MetaMask
    }); 

    return  Observable.create( (observer) => {
      this.identity.deployed().then(instance => {
        return  instance.setIdentity(firstname, lastname, nickname, avatar,  { from: web3.eth.defaultAccount});
      })
      .then(value => {
        observer.next(value)
        observer.complete()
      })
      .catch(e => {
        console.log(e);
        observer.error(e)
      });
  })
  }



  // this function is used to get identityt
   getId() :Observable <Identity> {

    const web3 = this.web3Service.web3;

    this.web3Service.getAccounts().subscribe(res => {
      web3.eth.defaultAccount= res[0].address; // assign active account of MetaMask
    }); 

    return  Observable.create( (observer) => {
      this.identity.deployed().then(instance => {
        return  instance.getIdentity(web3.eth.defaultAccount, { from: web3.eth.defaultAccount});
      })
      .then(value => {
        observer.next(value)
        observer.complete()
      })
      .catch(e => {
        console.log(`Error fetching account info`,e);
        observer.error(e)

      });

  })

  }

  addSocialLink( url, name) : Observable<any>{
    const web3 = this.web3Service.web3;

    this.web3Service.getAccounts().subscribe(res => {
      web3.eth.defaultAccount= res[0].address; // assign active account of MetaMask
    }); 

    return  Observable.create( (observer) => {
      this.identity.deployed().then(instance => {
        return  instance.addSocialLink(web3.eth.defaultAccount, url, name, { from: web3.eth.defaultAccount});
      })
      .then(value => {
        observer.next(value)
        observer.complete()
      })
      .catch(e => {
        console.log(e);
        observer.error(e)
      });
  })
  }


  getSocialLinkByName(name) :Observable <SocilaMedia> {

    const web3 = this.web3Service.web3;

    this.web3Service.getAccounts().subscribe(res => {
      web3.eth.defaultAccount= res[0].address; // assign active account of MetaMask
    }); 

    return  Observable.create( (observer) => {
      this.identity.deployed().then(instance => {
        return  instance.getSocialLinkByName(web3.eth.defaultAccount, name, { from: web3.eth.defaultAccount});
      })
      .then(value => {
        observer.next(value)
        observer.complete()
      })
      .catch(e => {
        console.log(`Error fetching account info`,e);
        observer.error(e)

      });

  })

  }
  removeSocialLinkByName() {

  }
  updateSocialLink() {

  }
}
