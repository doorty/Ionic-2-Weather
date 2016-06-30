import 'es6-shim';
import {App, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HomePage} from './pages/home/home';
import {Weather} from './providers/weather/weather';
import {StorageService} from './providers/storage/storage';

@App({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [StorageService, Weather],
  config: {} 
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(platform: Platform) {
    platform.ready().then(() => {


      StatusBar.styleDefault();
    });
  }
}
