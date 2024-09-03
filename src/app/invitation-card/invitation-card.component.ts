import {Component} from '@angular/core';
import {LocalizationService} from "../utils/localization.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-invitation-card',
  templateUrl: './invitation-card.component.html',
  styleUrl: './invitation-card.component.css'
})
export class InvitationCardComponent {
  localization: any;

  constructor(private localizationService: LocalizationService, private http: HttpClient) {
  }

  ngOnInit() {
    this.localizationService.countryCode$.subscribe(code => {
      this.loadLocalization(code);
    });
  }

  loadLocalization(countryCode: string): void {
    this.http.get(`assets/language/components/invitation-card/invitation-card.component.${countryCode}.json`)
      .subscribe((data) => {
        this.localization = data;
      });
  }

}
