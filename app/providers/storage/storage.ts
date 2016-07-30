import {Injectable} from '@angular/core';
import {Storage, SqlStorage} from 'ionic-angular';
import 'rxjs/add/operator/map';

@Injectable()
export class StorageService {
  private storageDb = 'weatherstorage';
  private storage: Storage;
  private weathers: Array<Object>

  constructor() {
    this.storage = new Storage(SqlStorage, { name: this.storageDb });
    this.getWeathers().then(data => {
      this.weathers = JSON.parse(data); 
    });
  }

  getWeathers() {
    return this.storage.get(this.storageDb);
  }
  
  setWeather(weather) {
    if(!this.weathers) {
      this.weathers = [weather]
    }
    else {
      this.weathers.push(weather);
    }
    
    this.storage.set(this.storageDb, JSON.stringify(this.weathers));
  }
  
}

