import { Injectable } from '@angular/core';
import { Item } from '../../models/item';
import { Api } from '../api/api';

@Injectable()
export class Items {
  currentItems: string;

  constructor( public api: Api ) {

  }

  query(params?: any) {
    let seq = this.api.get('events', {'user' : localStorage.getItem('currentUser')}).share();
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
