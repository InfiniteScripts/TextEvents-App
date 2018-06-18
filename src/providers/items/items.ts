import { Injectable } from '@angular/core';
import { Item } from '../../models/item';
import { Api } from '../api/api';
import { Storage } from '@ionic/storage';

@Injectable()
export class Items {
  currentItems: string;

  constructor( public storage: Storage, public api: Api ) {

  }

  query(params?: any) {
    console.log(this.storage.get('login_email'));
    let seq = this.api.get('events', {'user' : this.storage.get('login_email')}).share();
    seq.subscribe(resp =>{
      this.currentItems = JSON.stringify(resp);
    });
    return seq;
  }

  add(item: Item) {

  }
  update(){

  }

  delete(item: Item) {

  }

}
