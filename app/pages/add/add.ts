import {ViewController} from 'ionic-angular';
import {Component} from '@angular/core';

@Component({
  templateUrl: 'build/pages/add/add.html',
})
export class AddPage {
  public data = {
    country: 'us'  
  };
  
  constructor(public view: ViewController) {}
  
  dismiss(formData) {
    this.view.dismiss(formData);
  }
}
