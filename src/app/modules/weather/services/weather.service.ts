import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = '9a58173cafa166a3f11f1fe3de732278';

constructor(private http: HttpClient) { }

getWeatherData(cityName: string): Observable<any> {
  return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&mode=json&appid=${this.apiKey}`, {},);
}

}
