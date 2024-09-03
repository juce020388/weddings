import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from "../../model/user.model";
import {FirebaseUserService} from "../../utils/firebase-user.service";
import {HttpClient} from "@angular/common/http";
import {LocalizationService} from "../../utils/localization.service";

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrl: './base.component.css'
})
export class BaseComponent {
  guestID: string = "";
  countryCode: string = "";
  user: User | undefined;
  localization: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: FirebaseUserService,
              private http: HttpClient,
              private localizationService: LocalizationService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(async params => {
      this.guestID = params['guestID'];
      this.countryCode = params['countryCode'];
      if (!['LT', 'PL', 'RU', 'EN'].includes(this.countryCode.toUpperCase()) || !(await this.isValidGuestID(this.guestID, this.countryCode))) {
        await this.router.navigate(['/']);
      } else {
        this.route.fragment.subscribe(fragment => {
          document.querySelector('#' + fragment)?.scrollIntoView();
        });
        this.loadLocalization(this.countryCode);
      }
    });
  }

  isValidGuestID(guestID: string, countryCode: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.userService.getUserById(guestID).subscribe(data => {
        if (data != null) {
          this.user = data;
          if (countryCode) {
            console.log("Country code exist on params: " + this.countryCode);
            this.localizationService.setCountryCode(countryCode);
          } else {
            console.log("Country code does not exist on params. Loading from user: " + this.user.countryCode);
            this.localizationService.setCountryCode(this.user.countryCode);
          }
          resolve(true);
          return;
        } else {
          resolve(false);
        }
      });
    });
  }

  isRouteActive(route: string) {
    return this.router.url === route;
  }

  loadLocalization(countryCode: string): void {
    if (countryCode) {
      this.http.get(`assets/language/components/base/base.component.${countryCode.toLowerCase()}.json`)
        .subscribe((data) => {
          this.localization = data;
        });
    } else {
      this.http.get(`assets/language/components/base/base.component.${this.user?.countryCode.toLowerCase()}.json`)
        .subscribe((data) => {
          this.localization = data;
        });
    }
  }

}
