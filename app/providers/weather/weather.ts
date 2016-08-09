import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Geolocation} from 'ionic-native';
import {Observable} from 'rxjs/Observable';
import {Platform} from 'ionic-angular';

@Injectable()
export class Weather {
  private appId = '16fa7fe6fab8c648bee7e5d70266906e';
  private baseUrl = 'http://api.openweathermap.org/data/2.5/';

  constructor(public http: Http, public platform: Platform) {}

  city(city: string, country: string) {
    
    let url = this.baseUrl + 'weather';
    url += '?appId=' + this.appId;
    url += '&q=' + city;
    url += ',' + country;
    
    return this.http.get(url);
  }
  
  forecast(cityId: string, numOfDays: number) {
    
    let url = this.baseUrl + 'forecast/daily';
    url += '?appId=' + this.appId;
    url += '&id=' + cityId;
    url += '&cnt=' + numOfDays;
    
    return this.http.get(url);
  }
  
  local() {

    let Obs = Observable.create(observer => {
    
      this.platform.ready().then(() => {

        Geolocation.getCurrentPosition({timeout: 10000, enableHighAccuracy: true})
        .then((resp) => {
          let lat = resp.coords.latitude;
          let lng = resp.coords.longitude;
          
          let url = this.baseUrl + 'weather';
          url += '?appid=' + this.appId;
          url += `&lat=${lat}&lon=${lng}`;
          
          this.http.get(url)
            .subscribe(
              data => {
                console.log(data);
                observer.next(data.json());
              },
              err => observer.error(err),
              () => observer.complete()
            )
        }, (err) => {
          console.log(err);
          observer.error(err);
          observer.complete();
        });

      });

    });

    return Obs;
  }
}

