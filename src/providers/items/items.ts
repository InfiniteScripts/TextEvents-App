import { Injectable } from '@angular/core';
import { MainPage } from '../pages';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { Item } from '../../models/item';
import { Api } from '../api/api';

@Injectable()
export class Items {

  constructor(public api: Api,
      public navCtrl: NavController,
      public item: Item,
      public toastCtrl: ToastController,) { }

  query(params?: any) {
    return this.api.get('/events', params);
  }

  add(item: Item) {
    console.error('right function!');
    let seq = this.api.post('events', item).share();
    seq.subscribe((resp) =>{
      console.log(item);
      console.log(resp);
    });
  }
  update(){

  }

  delete(item: Item) {
  }

}
