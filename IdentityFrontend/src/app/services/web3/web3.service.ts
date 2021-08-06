import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { AccountItem } from '../../shared/models/accountItem';

const Web3 = require('web3');

declare var window: any;

@Injectable()
export class Web3Service {

  public web3: any;
accounts : any[]
  constructor() {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)

    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.enable();
        //Using web3 detected from external source./
        console.log("currentProvider",window.web3.currentProvider)
        this.web3 = new Web3(window.web3.currentProvider);
        console.log(this.web3 )
  
      } else {    /* No web3 detected. Falling back to 'environment.HttpProvider'.
      Should remove this fallback when you deploy live, as it's inherently insecure.
      FALLBACK - use fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      */
    console.log("HttpProvider")
    this.web3 = new Web3(new Web3.providers.HttpProvider(environment.HttpProvider));
    console.log(this.web3)

     }
  }

  getAccounts(): Observable<AccountItem[]> {

    console.log("i started accounts")
    return new Observable(observer => {
      this.web3.eth.getAccounts((error, accounts) => {

        if (error != null) {
          observer.error(`There was an error fetching accounts.`);
        }

        if (accounts.length === 0) {
          observer.error(`Couldn't get any accounts! Make sure your Ethereum client is configured correctly.`);
        }
        this.web3.defaultAccount = this.web3.eth.accounts[0]
        observer.next(accounts.map(account => new AccountItem(account)));
        this.accounts=accounts
        observer.complete();
      });
    });
  };
}