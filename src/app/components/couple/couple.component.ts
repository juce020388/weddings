import {Component} from '@angular/core';
import {LocalizationService} from "../../utils/localization.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-couple',
  templateUrl: './couple.component.html',
  styleUrl: './couple.component.css'
})
export class CoupleComponent {
  localization: any;

  constructor(private localizationService: LocalizationService, private http: HttpClient) {
  }

  ngOnInit() {
    this.localizationService.countryCode$.subscribe(code => {
      this.loadLocalization(code);
    });
  }

  loadLocalization(countryCode: string): void {
    this.http.get(`assets/language/components/couple/couple.component.${countryCode}.json`)
      .subscribe((data) => {
        this.localization = data;
      });
  }

}
