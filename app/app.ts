import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HomePage} from './pages/home/home';
import {Weather} from './providers/weather/weather';
import {StorageService} from './providers/storage/storage';


@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [StorageService, Weather]
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(platform: Platform) {
    platform.ready().then(() => {


      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp);