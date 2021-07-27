import { Injectable } from '@angular/core';
import * as Web3 from 'web3';

declare let require: any;
declare let window: any;

let tokenAbi = require('../../../build/contracts/Identity.json');

@Injectable({
  providedIn: 'root'
})
export class IdentityService {
  private web3Provider: null;
  private contracts: {};
  constructor() {
   
  }
}
