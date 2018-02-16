import { Injectable } from '@angular/core';

import { Item } from '../../models/item';

@Injectable()
export class Items {
  items: Item[] = [];

  defaultItem: any = {
    "name": "",
    "profilePic": "assets/img/speakers/bear.jpg",
    "about": "",
  };


  constructor() {
    let items = [
      {
        "name": "Monday Tournament",
        "profilePic": "assets/img/speakers/bear.jpg",
        "about": "Monday 6PM. 140"
      },
      {
        "name": "Tuesday Self Deal",
        "profilePic": "assets/img/speakers/cheetah.jpg",
        "about": "60 Self Deal"
      },
      {
        "name": "Weds PLO",
        "profilePic": "assets/img/speakers/duck.jpg",
        "about": "7PM ALL PLO"
      },
      {
        "name": "Friday Cash Game",
        "profilePic": "assets/img/speakers/eagle.jpg",
        "about": "8PM First 60 to RSVP and show up before 8 get 30$"
      }
    ];

    for (let item of items) {
      this.items.push(new Item(item));
    }
  }

  query(params?: any) {
    if (!params) {
      return this.items;
    }

    return this.items.filter((item) => {
      for (let key in params) {
        let field = item[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return item;
        } else if (field == params[key]) {
          return item;
        }
      }
      return null;
    });
  }

  add(item: Item) {
    this.items.push(item);
  }

  delete(item: Item) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}
