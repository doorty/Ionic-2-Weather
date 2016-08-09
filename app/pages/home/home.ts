import {ModalController, NavController} from 'ionic-angular';
import {AddPage} from '../add/add';
import {Weather} from '../../providers/weather/weather';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {TemperaturePipe} from '../../pipes/temperature';
import {ForecastPage} from '../forecast/forecast';
import {WeatherEl} from '../../components/weather/weather';
import {StorageService} from '../../providers/storage/storage';
import {Component} from '@angular/core';

@Component({
  templateUrl: 'build/pages/home/home.html',
  pipes: [TemperaturePipe],
  directives: [WeatherEl]
})
export class HomePage {
  public weatherList: Array<Object>;
  public localWeather;
  
  constructor(
    public nav: NavController,
    public weather: Weather,
    public storage: StorageService,
    private modalCtrl: ModalController) {
      this.weatherList = [];
      this.getLocalWeather();
      this.getStoredWeather();
    }

  getStoredWeather() {
    this.storage.getWeathers().then((weathers) => {
      console.log(weathers);
      this.weatherList = (weathers !== undefined && weathers !== null) ? JSON.parse(weathers) : []; 
    });
  }

  addWeather() {
    let addWeatherModal = this.modalCtrl.create(AddPage);
    addWeatherModal.onDidDismiss((data) => {
      if (data) {
        this.getWeather(data.city, data.country);
      }
    });
    addWeatherModal.present(addWeatherModal);
  }

  getWeather(city: string, country: string) {
    this.weather.city(city, country)
      .map(data => data.json())
      .subscribe(data => {
        console.log(data);
        this.weatherList.push(data);
        this.storage.setWeather(data);
      },
      err => console.log(err),
      () => console.log('getWeather completed'))
    
  }
  
  getLocalWeather() {
    this.weather.local().subscribe(
      data => {
        console.log(data);
        this.localWeather = data;
      },
      err => console.log(err),
      () => console.log('local weather complete')
    )
  }
  
  viewForecast(cityWeather) {
    this.nav.push(ForecastPage, { cityWeather: cityWeather });
  }
}
