import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { Contacts } from '@ionic-native/contacts';
import { Settings } from '../../providers/providers';

import { MainPage } from '../pages';
import { Api } from '../../providers/api/api';
import { SMS } from '@ionic-native/sms';

import { Items } from '../../providers/providers';
import { Item } from '../../models/item';

import { Pro } from '@ionic/pro';

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  item: any;
  checkedContacts: any;
  saveContacts: any;
  form: FormGroup;
  testContacts: any;
  allContacts: any;
  isReadyToSave: boolean;
  contactId = 0;
  timeBetweenTexts: number;

  private updateString: string;
  private deleteString: string;

  constructor(
    public phoneContacts: Contacts,
    public sms: SMS,
    public settings: Settings,
    public translateService: TranslateService,
    public toastCtrl: ToastController,
    public navCtrl: NavController,
    navParams: NavParams,
    items: Items,
    formBuilder: FormBuilder,
    public camera: Camera,
    public api:Api
    ) {

    this.item = navParams.get('item');
    this.timeBetweenTexts = parseInt(settings.getValue('option1')) * 1000;
    this.checkedContacts = this.item.contacts;
    this.form = formBuilder.group({
      profilePic: this.item.profilePic,
      name: this.item.name,
      desc: this.item.desc,
      day: this.item.day,
      start_text_time:this.item.start_text_time,
      start_text_am_pm: this.item.start_text_am_pm,
      contacts: [this.item.contacts]
    });

    this.translateService.get('UPDATE_STRING').subscribe((value) => {
      this.updateString = value;
    })
    this.translateService.get('DELETE_STRING').subscribe((value) => {
      this.deleteString = value;
    })
    this.getPhoneContacts();

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }

  send(){
    var x = 1;

    Pro.monitoring.log(this.timeBetweenTexts, { level: 'error' });
    for (let contactSomething of this.allContacts){

      if(this.checkedContacts.indexOf(contactSomething.id) > -1){
        Pro.monitoring.log(contactSomething.phoneNumbers, { level: 'error' });
        setInterval(this.sms.send(contactSomething.phoneNumbers[0].value, this.item.desc), (x * this.timeBetweenTexts));

        x = x + 1;
      }
    }
  }

  getPhoneContacts(){
    this.phoneContacts.find(
      ["displayName", "phoneNumbers", "id"],
      {multiple: true, hasPhoneNumber: true}
    ).then((foundContacts) => {
        this.allContacts = foundContacts;
    });
  }

  getProfileImageStyle() {
    return 'url(' + this.form.controls['profilePic'].value + ')'
  }

  update(){
      let newItem = new Item(this.form.value);
      let jsonItem = JSON.stringify(newItem);
      let route = 'events/' + this.item._id;
      let seq = this.api.put(route, jsonItem).share();

      seq.subscribe((resp) =>{
          let toast = this.toastCtrl.create({
            message: this.updateString,
            duration: 3000,
            position: 'top'
          });
          toast.present();
          this.navCtrl.push(MainPage);
      });
    }

  containsContactId(contactId){
    if(this.item.contacts.indexOf(contactId) > 0){
      return 'true';
    } else {
      return 'false';
    }
  }

  delete(){
    let route = 'events/' + this.item._id;
    let seq = this.api.delete(route).share();
    seq.subscribe((resp) =>{
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
