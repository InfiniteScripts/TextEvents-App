import { Injectable } from '@angular/core';
import { MainPage } from '../pages';
import { ToastController } from 'ionic-angular';

import { Item } from '../../models/item';
import { Api } from '../api/api';

@Injectable()
export class Items {
  currentItems: any;
  constructor( public api: Api ) {

    this.currentItems = this.api.get('events', {'user' : localStorage.getItem('currentUser')}).map(res =>res.json());
    console.log('resp', this.currentItems);



  }

  query(params?: any) {

  let seq = this.api.get('events', {'user' : localStorage.getItem('currentUser')}).share();

  seq.subscribe(resp =>{

    this.currentItems = JSON.stringify(resp).currentItems;


  });
  return seq;
  }

  add(item: Item) {

    let seq = this.api.post('events', item).share();
    seq.subscribe((resp) =>{

      console.log(resp);
    });
    return seq;
  }
  update(){

  }

  delete(item: Item) {
  }

}
