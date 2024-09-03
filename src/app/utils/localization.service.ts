import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class LocalizationService {
  private countryCode = new BehaviorSubject<string>('lt');
  countryCode$ = this.countryCode.asObservable();

  constructor() {
  }

  setCountryCode(code: string) {
    this.countryCode.next(code.toLowerCase());
  }
}
