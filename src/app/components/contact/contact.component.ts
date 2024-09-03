import {Component} from '@angular/core';
import {LocalizationService} from "../../utils/localization.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  localization: any;

  constructor(private localizationService: LocalizationService, private http: HttpClient) {
  }

  ngOnInit() {
    this.localizationService.countryCode$.subscribe(code => {
      this.loadLocalization(code);
    });
  }

  loadLocalization(countryCode: string): void {
    this.http.get(`assets/language/components/contact/contact.component.${countryCode}.json`)
      .subscribe((data) => {
        this.localization = data;
      });
  }

}
