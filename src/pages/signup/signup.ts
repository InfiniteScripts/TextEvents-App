import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers/providers';
import { MainPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { name: string, email: string, password: string } = {
    name: '',
    email: '',
    password: ''
  };

  // Our translated text strings
  private signupErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService) {

    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    })
  }

  doSignup() {
    // Attempt to login in through our User service
    this.user.register(this.account).subscribe((resp) => {
      if(resp.toString() == 'success'){
        this.navCtrl.push(MainPage);
      } else if(resp.toString() == 'Email in use'){
        this.navCtrl.push(SignupPage);

        let toast = this.toastCtrl.create({
          message: resp.toString(),
          duration: 5000,
          position: 'top'
        });

        toast.present();
      }
      console.error(resp);
    }, (err) => {

      //this.navCtrl.push(MainPage);

      // Unable to sign up
      let toast = this.toastCtrl.create({
        message: this.signupErrorString,
        duration: 5000,
        position: 'top'
      });
      toast.present();
    });
  }
}
