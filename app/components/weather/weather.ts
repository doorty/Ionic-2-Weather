import {Component, Input, Output, EventEmitter} from '@angular/core';
import {IONIC_DIRECTIVES} from 'ionic-angular';
import {TemperaturePipe} from '../../pipes/temperature';

@Component({
  selector: 'weather',
  templateUrl: 'build/components/weather/weather.html',
  directives: [IONIC_DIRECTIVES],
  pipes: [TemperaturePipe]
})
export class WeatherEl {
  @Input() weather: Object;
  @Output() viewMore: EventEmitter<Object> = new EventEmitter();
  
  constructor() {}
  
  hitWeather() {
    this.viewMore.next(this.weather);
  }
}
