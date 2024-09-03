import {Component} from '@angular/core';
import {LocalizationService} from "../../utils/localization.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrl: './family.component.css'
})
export class FamilyComponent {
  localization: any;

  constructor(private localizationService: LocalizationService, private http: HttpClient) {
  }

  ngOnInit() {
    this.localizationService.countryCode$.subscribe(code => {
      this.loadLocalization(code);
    });
  }

  loadLocalization(countryCode: string): void {
    this.http.get(`assets/language/components/family/family.component.${countryCode}.json`)
      .subscribe((data) => {
        this.localization = data;
      });
  }
}
