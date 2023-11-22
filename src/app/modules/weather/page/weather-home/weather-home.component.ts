import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { WeatherData } from 'src/app/models/interfaces/WeatherData';
import { Subject, takeUntil } from 'rxjs';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-weather-home',
  templateUrl: './weather-home.component.html',
  styleUrls: []
})
export class WeatherHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  initialCityName = "Recife";
  weatherData!: WeatherData;
  searchIcon = faMagnifyingGlass;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.getWeatherData(this.initialCityName);
  }

  getWeatherData(cityName: string): void {
    this.weatherService.getWeatherData(cityName)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          response && (this.weatherData = response);
        },
        error: (error) => console.error(error),
      });
  }

  onSubmit(): void {
    this.getWeatherData(this.initialCityName);
    this.initialCityName = '';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
