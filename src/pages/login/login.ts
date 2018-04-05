import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { User } from '../../providers/providers';
import { MainPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type

  account: { email: string, password: string } = {
    email:  '',
    password:  ''
  };

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public storage: Storage,
    public translateService: TranslateService) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
    this.storage.get('login_email').then((value) => {
      if (value) {
        this.account.email = value;

      } else {
        this.account.email = '';
      }
      this.storage.get('login_psw').then((value) => {
        if (value) {
          this.account.password = value;

        } else {
          this.account.password = '';
        }
  }

  // Attempt to login in through our User service
  doLogin() {
    this.user.login(this.account).subscribe((resp) => {

      if(resp.toString() == 'success'){
          this.storage.set('login_email', this.account.email);
          this.storage.set('login_psw', this.account.password);
          this.navCtrl.push(MainPage);
      } else {
          this.navCtrl.push(LoginPage);

          let toast = this.toastCtrl.create({
            message: this.loginErrorString,
            duration: 3000,
            position: 'top'
          });

          toast.present();
      }
    }, (err) => {
      this.navCtrl.push(LoginPage);
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
}
