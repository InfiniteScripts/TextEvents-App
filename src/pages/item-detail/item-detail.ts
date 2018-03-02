import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { Contacts } from '@ionic-native/contacts';

import { MainPage } from '../pages';
import { Api } from '../../providers/api/api';
import { Items } from '../../providers/providers';
import { Item } from '../../models/item';

import { Pro } from '@ionic/pro';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { IonicErrorHandler } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  item: any;

  form: FormGroup;

  allContacts: any;
  isReadyToSave: boolean;

  private updateString: string;
  private deleteString: string;

  constructor(public contacts: Contacts, public translateService: TranslateService, public toastCtrl: ToastController, public navCtrl: NavController, navParams: NavParams, items: Items, formBuilder: FormBuilder, public camera: Camera, public api:Api) {
    this.item = navParams.get('item');

    this.form = formBuilder.group({
      profilePic: this.item.profilePic,
      name: [this.item.name, Validators.required],
      desc: this.item.desc,
      day: this.item.day,
      start_text_time:this.item.start_text_time,
      start_text_am_pm: this.item.start_text_am_pm,
      contacts:[''],

    });

    this.translateService.get('UPDATE_STRING').subscribe((value) => {
      this.updateString = value;
    })
    this.translateService.get('DELETE_STRING').subscribe((value) => {
      this.deleteString = value;
    })

    this.contacts.find(['displayName', 'name', 'phoneNumbers', 'emails'], {filter: "", multiple: true})
    .then(data => {
      this.allContacts = data
    });
    Pro.monitoring.exception(new Error(this.allContacts));

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }

  getProfileImageStyle() {
    return 'url(' + this.form.controls['profilePic'].value + ')'
  }

  update(){
    if (!this.form.valid) { return; }
      let newItem = new Item(this.form.value);
      let jsonItem = JSON.stringify(newItem);
      console.log(jsonItem);
      let route = 'events/' + this.item._id;
      console.log(route);
      let seq = this.api.put(route, jsonItem).share();
      seq.subscribe((resp) =>{
          console.log(resp);
          let toast = this.toastCtrl.create({
            message: this.updateString,
            duration: 3000,
            position: 'top'
          });
          toast.present();
          this.navCtrl.push(MainPage);
      });


    }


  delete(){
    let route = 'events/' + this.item._id;
    console.log(route);
    let seq = this.api.delete(route).share();
    seq.subscribe((resp) =>{

        console.log(resp);
        let toast = this.toastCtrl.create({
          message: this.deleteString,
          duration: 3000,
          position: 'top'
        });
        toast.present();
        this.navCtrl.push(MainPage);
    });
  }


}
