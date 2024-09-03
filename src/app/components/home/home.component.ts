import {Component} from '@angular/core';
import {LocalizationService} from "../../utils/localization.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  localization: any;

  constructor(private localizationService: LocalizationService, private http: HttpClient) {
  }

  ngOnInit() {
    this.localizationService.countryCode$.subscribe(code => {
      this.loadLocalization(code);
    });
  }

  loadLocalization(countryCode: string): void {
    this.http.get(`assets/language/components/home/home.component.${countryCode}.json`)
      .subscribe((data) => {
        this.localization = data;
      });
  }

}
