import {Component, OnInit} from '@angular/core';
import {LocalizationService} from "../../utils/localization.service";
import {HttpClient} from "@angular/common/http";
import {DownloadService} from "../../utils/download.service";
import {FirebaseUserService} from "../../utils/firebase-user.service";

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.css'
})
export class CountdownComponent implements OnInit {
  futureDate: Date = new Date('2024-09-14T11:10:00');
  localization: any;

  constructor(private localizationService: LocalizationService,
              private http: HttpClient,
              private downloadService: DownloadService,
              private userService: FirebaseUserService) {
  }

  days = 0;
  hours = 0;
  minutes = 0;
  seconds = 0;

  ngOnInit(): void {
    setInterval(() => {
      this.calculateCountdown();
    }, 1000);

    this.localizationService.countryCode$.subscribe(code => {
      this.loadLocalization(code);
    });
  }

  calculateCountdown() {
    const difference = this.futureDate.getTime() - new Date().getTime();

    this.days = Math.floor(difference / (1000 * 60 * 60 * 24));
    this.hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    this.seconds = Math.floor((difference % (1000 * 60)) / 1000);
  }

  loadLocalization(countryCode: string): void {
    this.http.get(`assets/language/components/countdown/countdown.component.${countryCode}.json`)
      .subscribe((data) => {
        this.localization = data;
      });
  }

  downloadInvitation(): void {
    this.downloadService.downloadInvitation();
  }

  isUserAttending() {
    return this.userService?.getActiveUser()?.attending;
  }

}
