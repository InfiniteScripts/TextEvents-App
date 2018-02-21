import { Injectable } from '@angular/core';

import { ToastController } from 'ionic-angular';

import { Item } from '../../models/item';
import { Api } from '../api/api';

@Injectable()
export class Items {
  currentItems: any;

  constructor( public api: Api ) {

    this.currentItems = this.api.get('events', {'user' : localStorage.getItem('currentUser')}).map(res =>res.toString());

  }

  query(params?: any) {

  let seq = this.api.get('events', {'user' : localStorage.getItem('currentUser')}).share();

  seq.subscribe(resp =>{

    this.currentItems = JSON.stringify(resp).currentItems;


  });
  return seq;
  }

  add(item: Item) {
  //  this.currentItems.push(item);
  }
  update(){

  }

  delete(item: Item) {
    //this.currentItems.splice(this.items.indexOf(item), 1);
  }

}
