import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { NavController, ViewController } from 'ionic-angular';
import { Api } from '../../providers/api/api';
import { Storage } from '@ionic/storage';
import { MainPage } from '../pages';
import { Items } from '../../providers/providers';
import { Item } from '../../models/item';
import { Contacts } from '@ionic-native/contacts';

@IonicPage()
@Component({
  selector: 'page-item-create',
  templateUrl: 'item-create.html'
})
export class ItemCreatePage {
  @ViewChild('fileInput') fileInput;

  isReadyToSave: boolean;
  allContacts: any;
  item: any;

  form: FormGroup;

  constructor(public storage: Storage, public navCtrl: NavController, public viewCtrl: ViewController, formBuilder: FormBuilder, public camera: Camera, public items:Items, public phoneContacts: Contacts, public api:Api) {
    this.form = formBuilder.group({
      profilePic: [''],
      name: ['', Validators.required],
      desc: [''],
      day: [''],
      start_text_time:[''],
      start_text_am_pm: [''],
      contacts:[''],
      user: this.storage.get('login_email')

    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }

  ionViewDidLoad() {

  }

  getPhoneContacts(){
    this.phoneContacts.find(
      ["displayName", "phoneNumbers", "id"],
      {multiple: true, hasPhoneNumber: true}
    ).then((foundContacts) => {
        this.allContacts = foundContacts;
    });
  }

  getPicture() {
  /*  if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 96,
        targetHeight: 96
      }).then((data) => {
        this.form.patchValue({ 'profilePic': 'data:image/jpg;base64,' + data });
      }, (err) => {
        alert('Unable to take photo');
      })
    } else { */
      this.fileInput.nativeElement.click();
//    }
  }

  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {

      let imageData = (readerEvent.target as any).result;
      this.form.patchValue({ 'profilePic': imageData });
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  getProfileImageStyle() {
    return 'url(' + this.form.controls['profilePic'].value + ')'
  }

  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    this.viewCtrl.dismiss();
  }

  /**
   * The user is done and wants to create the item, so return it
   * back to the presenter.
   */
  done() {
    if (!this.form.valid) { return; }

    let item = new Item(this.form.value);

    let jsonItem = JSON.stringify(item);
    console.log(jsonItem);
    let seq = this.api.post('events', jsonItem).share();
    seq.subscribe((resp) =>{
        console.log(resp);
        item.id = resp['_id'];
        this.navCtrl.push(MainPage);
    });

    this.viewCtrl.dismiss(this.form.value);

  }
}
