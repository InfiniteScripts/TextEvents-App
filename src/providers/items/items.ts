import { Injectable } from '@angular/core';

import { Item } from '../../models/item';
import { Api } from '../api/api';

@Injectable()
export class Items {

  constructor(public api: Api) { }

  query(params?: any) {
    return this.api.get('/events', params);
  }

  add(item: Item) {
    this.item.events('').subscribe((resp) => {
      if(resp == 'success'){
        this.navCtrl.push(MainPage);
      } else {
        console.error(resp);
      }
    });
  }

  delete(item: Item) {
  }

}
