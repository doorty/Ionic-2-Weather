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
      this.weathers = (data !== undefined && data !== null) ? JSON.parse(data) : []; 
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

    // remove cyclical objects
    let seen = [];

    let result = JSON.stringify(this.weathers, function(key, val) {
      if (val != null && typeof val == "object") {
            if (seen.indexOf(val) >= 0) {
                return;
            }
            seen.push(val);
        }
        return val;
    });

    this.storage.set(this.storageDb, result);
  }
  
}

