import { Injectable } from '@angular/core';

//import { ToastController } from 'ionic-angular';


import { Api } from '../api/api';

export class TestContacts {

  constructor( public api: Api ) {

    console.log('provider');

    //this.currentItems = this.api.get('events', {'user' : localStorage.getItem('currentUser')}).map(res =>res.toString());

  }

}
