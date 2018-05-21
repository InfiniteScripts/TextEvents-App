import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
/*
  Generated class for the InfiniteScriptsSpinnerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Component({
  selector: 'is-spinner',
  templateUrl: 'infinite-scripts-spinner.html'
})

@Injectable()
export class InfiniteScriptsSpinner {
  isBusy : boolean;

  constructor() {
     this.isBusy = false;
  }

  showSpinner(){
      this.isBusy = true;
       document.getElementsByClassName("spinner-container")[0].classList.add("spinner");

  }

  hideSpinner(){
      this.isBusy = false;
    //  document.getElementsByClassName("spinner-container")[0].classList.remove("spinner");
  }
}
