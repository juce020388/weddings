import {Component} from '@angular/core';
import {LocalizationService} from "../../utils/localization.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrl: './story.component.css'
})
export class StoryComponent {
  localization: any;

  constructor(private localizationService: LocalizationService, private http: HttpClient) {
  }

  ngOnInit() {
    this.localizationService.countryCode$.subscribe(code => {
      this.loadLocalization(code);
    });
  }

  loadLocalization(countryCode: string): void {
    this.http.get(`assets/language/components/story/story.component.${countryCode}.json`)
      .subscribe((data) => {
        this.localization = data;
      });
  }

}
