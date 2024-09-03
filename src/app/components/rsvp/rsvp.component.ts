import {Component} from '@angular/core';
import {User} from "../../model/user.model";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {FirebaseUserService} from "../../utils/firebase-user.service";
import {LocalizationService} from "../../utils/localization.service";

@Component({
  selector: 'app-rsvp',
  templateUrl: './rsvp.component.html',
  styleUrl: './rsvp.component.css'
})
export class RsvpComponent {
  guestID: string = "";
  activeUser: User | undefined;
  userMessage: string | undefined = '';
  userPhone: string | undefined = '';
  userEmail: string | undefined = '';
  attending: boolean | null | undefined = null;
  overnightStay: boolean | null = null;

  localization: any;
  localizedGreeting: string = '';
  localizedName: string = '';
  defaultCountryCode = 'LT';

  onSubmit(): void {
  }

  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private userService: FirebaseUserService,
              private localizationService: LocalizationService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(async params => {
      this.guestID = params['guestID'];
      this.setActiveUser(this.guestID);
    });

    this.localizationService.countryCode$.subscribe(code => {
      this.setLocalizedGreeting(this.guestID, code);
      this.loadLocalization(code);
    });
  }

  setAttendance(status: boolean | null): void {
    this.attending = status;
    // @ts-ignore
    this.userService.setAttendance(this.activeUser.id, this.attending, this.overnightStay, this.userMessage, this.userPhone, this.userEmail)
      .subscribe(responseData => {
        this.userService.setActiveUser(responseData);
      });
  }

  setActiveUser(guestID: string): void {
    this.userService.getUserById(guestID).subscribe(user => {
      if (user) {
        this.attending = user.attending;
        this.userMessage = user.message;
        this.userEmail = user.email;
        this.userPhone = user.phone;
        this.activeUser = user;
        this.userService.setActiveUser(user);
      } else {
        console.log(`User not found by id: ${guestID}`);
      }
    });
  }

  loadLocalization(countryCode: string): void {
    this.http.get(`assets/language/components/rvsp/rvsp.component.${countryCode}.json`)
      .subscribe((data) => {
        this.localization = data;
        // this.localization.helloMessage = this.localization.helloMessage.replace('{}', this.activeUser?.name);
      });
  }

  setLocalizedGreeting(guestID: string, countryCode: string) {
    const userMessage = this.localizedMessages.find(item => item.id === guestID);
    console.log("User message:" + userMessage);
    if (!userMessage) {
      return;
    }

    let userMessageElement = userMessage[countryCode.toUpperCase()];
    if (userMessageElement) {
      this.localizedName = userMessageElement.name;
      this.localizedGreeting = userMessageElement.message;
    } else {
      let userMessageElement = userMessage[this.defaultCountryCode.toUpperCase()];
      this.localizedName = userMessageElement.name;
      this.localizedGreeting = userMessageElement.message;
    }
  }

  localizedMessages: any[] = [
    {
      id: 'danute-jonas-11e492e6a08e',
      name: 'Danutė ir Jonas',
      LT: {
        name: "Danute ir Jonai",
        message: ", kviečiame Jus į mūsų vestuves rugsėjo 14 dieną! Labai norėtume, kad galėtumėte atvykti ir kartu atšvęsti. Praneškite, ar galėsite prisijungti prie mūsų! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      EN: {
        name: "Danute and Jonas",
        message: ", we invite you to our wedding on September 14th! We would love for you to be able to come and celebrate with us. Please let us know if you can join us! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      RU: {
        name: "Дануте и Йонас",
        message: ", приглашаем вас на нашу свадьбу 14 сентября! Мы были бы очень рады, если бы вы смогли приехать и отпраздновать вместе с нами. Пожалуйста, сообщите нам, сможете ли вы присоединиться к нам! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      PL: {
        name: "Danusiu i Jonasie",
        message: ", zapraszamy Was na nasz ślub 14 września! Bardzo chcielibyśmy, abyście mogli przyjechać i świętować razem z nami. Dajcie znać, czy będziecie mogli do nas dołączyć! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      }
    },
    {
      id: 'reginute-krizantas-0367113c1314',
      name: 'Reginutė ir Krizantas',
      LT: {
        name: "Reginute ir Krizantai",
        message: " kviečiame Jus į mūsų vestuves rugsėjo 14 dieną! Labai norėtume, kad galėtumėte atvykti ir švęsti kartu su mumis. Prašome praneškite, ar galėsite prisijungti! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      EN: {
        name: "Reginutė and Krizantas",
        message: ", we invite you to our wedding on September 14th! We would love for you to be able to come and celebrate with us. Please let us know if you can join us! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      RU: {
        name: "Регинуте и Кризантас",
        message: ", приглашаем вас на нашу свадьбу 14 сентября! Мы были бы очень рады, если бы вы смогли приехать и отпраздновать с нами. Пожалуйста, сообщите нам, сможете ли вы присоединиться! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      PL: {
        name: "Reginutka i Krizantas",
        message: ", zapraszamy Was na nasz ślub 14 września! Bylibyśmy bardzo szczęśliwi, gdybyście mogli przyjechać i świętować z nami. Dajcie nam znać, czy będziecie mogli do nas dołączyć! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      }
    },
    {
      id: 'vaidas-livija-7b527733bd1e',
      name: 'Vaidas ir Livija',
      LT: {
        name: "Vaidai ir Livija",
        message: " kviečiame Jus į mūsų vestuves rugsėjo 14 dieną! Labai norėtume, kad galėtumėte atvykti ir švęsti kartu su mumis. Prašome praneškite, ar galėsite prisijungti! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      EN: {
        name: "Vaidas and Livija",
        message: ", we invite you to our wedding on September 14th! We would love for you to be able to come and celebrate with us. Please let us know if you can join us! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      RU: {
        name: "Вайдас и Ливия",
        message: ", приглашаем вас на нашу свадьбу 14 сентября! Мы были бы очень рады, если бы вы смогли приехать и отпраздновать с нами. Пожалуйста, сообщите нам, сможете ли вы присоединиться! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      PL: {
        name: "Vaidasie i Liwio",
        message: ", zapraszamy Was na nasz ślub 14 września! Bylibyśmy bardzo szczęśliwi, gdybyście mogli przyjechać i świętować z nami. Dajcie nam znać, czy będziecie mogli do nas dołączyć! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      }
    },
    {
      id: 'donata-rikantas-d83c605b6715',
      name: 'Donata ir Rikantas',
      LT: {
        name: "Donata ir Rikantai",
        message: " kviečiame Jus į mūsų vestuves rugsėjo 14 dieną! Labai norėtume, kad galėtumėte atvykti ir švęsti kartu su mumis. Prašome praneškite, ar galėsite prisijungti! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      EN: {
        name: "Donata and Rikantas",
        message: ", we invite you to our wedding on September 14th! We would love for you to be able to come and celebrate with us. Please let us know if you can join us! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      RU: {
        name: "Доната и Рикантас",
        message: ", приглашаем вас на нашу свадьбу 14 сентября! Мы были бы очень рады, если бы вы смогли приехать и отпраздновать с нами. Пожалуйста, сообщите нам, сможете ли вы присоединиться! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      PL: {
        name: "Donato i Rikancie",
        message: ", zapraszamy Was na nasz ślub 14 września! Bylibyśmy bardzo szczęśliwi, gdybyście mogli przyjechać i świętować z nami. Dajcie nam znać, czy będziecie mogli do nas dołączyć! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      }
    },
    {
      id: 'julius-onute-d101f4266675',
      name: 'Julius ir Onutė',
      LT: {
        name: "Juliau ir Onute",
        message: " kviečiame Jus į mūsų vestuves rugsėjo 14 dieną! Labai norėtume, kad galėtumėte atvykti ir švęsti kartu su mumis. Prašome praneškite, ar galėsite prisijungti! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      EN: {
        name: "Julius and Onutė",
        message: ", we invite you to our wedding on September 14th! We would love for you to be able to come and celebrate with us. Please let us know if you can join us! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      RU: {
        name: "Юлиус и Онуте",
        message: ", приглашаем вас на нашу свадьбу 14 сентября! Мы были бы очень рады, если бы вы смогли приехать и отпраздновать с нами. Пожалуйста, сообщите нам, сможете ли вы присоединиться! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      PL: {
        name: "Juliuszu i Onutko",
        message: ", zapraszamy Was na nasz ślub 14 września! Bylibyśmy bardzo szczęśliwi, gdybyście mogli przyjechać i świętować z nami. Dajcie nam znać, czy będziecie mogli do nas dołączyć! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      }
    },
    {
      id: 'algirdas-nadezda-d82c67b6f229',
      name: 'Algirdas ir Nadežda',
      LT: {
        name: "Algirdai ir Nadežda",
        message: " kviečiame Jus į mūsų vestuves rugsėjo 14 dieną! Labai norėtume, kad galėtumėte atvykti ir švęsti kartu su mumis. Prašome praneškite, ar galėsite prisijungti! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      EN: {
        name: "Algirdas and Nadežda",
        message: ", we invite you to our wedding on September 14th! We would love for you to be able to come and celebrate with us. Please let us know if you can join us! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      RU: {
        name: "Альгирдас и Надежда",
        message: ", приглашаем вас на нашу свадьбу 14 сентября! Мы были бы очень рады, если бы вы смогли приехать и отпраздновать с нами. Пожалуйста, сообщите нам, сможете ли вы присоединиться! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      PL: {
        name: "Algirdzie i Nadieżdo",
        message: ", zapraszamy Was na nasz ślub 14 września! Bylibyśmy bardzo szczęśliwi, gdybyście mogli przyjechać i świętować z nami. Dajcie nam znać, czy będziecie mogli do nas dołączyć! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      }
    },
    {
      id: 'mantas-brigita-95a8d1ac653d',
      name: 'Mantas ir Brigita',
      LT: {
        name: "Mantai ir Brigita",
        message: " kviečiame Jus į mūsų vestuves rugsėjo 14 dieną! Labai norėtume, kad galėtumėte atvykti ir švęsti kartu su mumis. Prašome praneškite, ar galėsite prisijungti! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      EN: {
        name: "Mantas and Brigita",
        message: ", we invite you to our wedding on September 14th! We would love for you to be able to come and celebrate with us. Please let us know if you can join us! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      RU: {
        name: "Мантас и Бригита",
        message: ", приглашаем вас на нашу свадьбу 14 сентября! Мы были бы очень рады, если бы вы смогли приехать и отпраздновать с нами. Пожалуйста, сообщите нам, сможете ли вы присоединиться! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      PL: {
        name: "Mantiaszu i Brygido",
        message: ", zapraszamy Was na nasz ślub 14 września! Bylibyśmy bardzo szczęśliwi, gdybyście mogli przyjechać i świętować z nami. Dajcie nam znać, czy będziecie mogli do nas dołączyć! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      }
    },
    {
      id: 'karolina-darius-d5a6e5d097e4',
      name: 'Karolina ir Darius',
      LT: {
        name: "Karolina ir Dariau",
        message: " kviečiame Jus į mūsų vestuves rugsėjo 14 dieną! Labai norėtume, kad galėtumėte atvykti ir švęsti kartu su mumis. Prašome praneškite, ar galėsite prisijungti! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      EN: {
        name: "Karolina and Darius",
        message: ", we invite you to our wedding on September 14th! We would love for you to be able to come and celebrate with us. Please let us know if you can join us! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      RU: {
        name: "Каролина и Дариус",
        message: ", приглашаем вас на нашу свадьбу 14 сентября! Мы были бы очень рады, если бы вы смогли приехать и отпраздновать с нами. Пожалуйста, сообщите нам, сможете ли вы присоединиться! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      PL: {
        name: "Karolino i Dariuszu",
        message: ", zapraszamy Was na nasz ślub 14 września! Bylibyśmy bardzo szczęśliwi, gdybyście mogli przyjechać i świętować z nami. Dajcie nam znać, czy będziecie mogli do nas dołączyć! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      }
    },
    {
      id: 'aleksejus-2a5e396f1376',
      name: 'Aleksėjus',
      LT: {
        name: "Aleksėjau",
        message: ", kviečiame Tave į mūsų vestuves rugsėjo 14 dieną! Labai norėtume, kad galėtum atvykti ir kartu atšvęsti. Pranešk, ar galėsi prisijungti prie mūsų! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      EN: {
        name: "Aleksėjus",
        message: ", we invite you to our wedding on September 14th! We would love for you to be able to come and celebrate with us. Please let us know if you can join us! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      RU: {
        name: "Алексей",
        message: ", приглашаем тебя на нашу свадьбу 14 сентября! Мы бы очень хотели, чтобы ты смог прийти и отпраздновать с нами. Сообщи нам, сможешь ли ты присоединиться к нам! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      PL: {
        name: "Aleksiej",
        message: ", zapraszamy Cię na nasz ślub 14 września! Bardzo chcielibyśmy, żebyś mógł przyjść i świętować z nami. Daj nam znać, czy możesz do nas dołączyć! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      }
    },
    {
      id: 'koka-zhenya-8b4c9d7e2f1a',
      name: 'Кока и Женя',
      LT: {
        name: "Koka ir Ženia",
        message: " kviečiame Jus į mūsų vestuves rugsėjo 14 dieną! Labai norėtume, kad galėtumėte atvykti ir švęsti kartu su mumis. Prašome praneškite, ar galėsite prisijungti! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      EN: {
        name: "Koka and Ženia",
        message: ", we invite you to our wedding on September 14th! We would love for you to be able to come and celebrate with us. Please let us know if you can join us! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      RU: {
        name: "Кока и Женя",
        message: ", приглашаем вас на нашу свадьбу 14 сентября! Мы были бы очень рады, если бы вы смогли приехать и отпраздновать с нами. Пожалуйста, сообщите нам, сможете ли вы присоединиться! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      PL: {
        name: "Koko i Żenio",
        message: ", zapraszamy Was na nasz ślub 14 września! Bylibyśmy bardzo szczęśliwi, gdybyście mogli przyjechać i świętować z nami. Dajcie nam znać, czy będziecie mogli do nas dołączyć! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      }
    },
    {
      id: 'tatyana-d3e6f5a2971c',
      name: 'Татьяна',
      LT: {
        name: "Tatjana",
        message: ", kviečiame Jus į mūsų vestuves rugsėjo 14 dieną! Labai norėtume, kad galėtumėte atvykti ir kartu atšvęsti. Prašome praneškite, ar galėsite prisijungti prie mūsų! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      EN: {
        name: "Tatjana",
        message: ", we invite you to our wedding on September 14th! We would love for you to be able to come and celebrate with us. Please let us know if you can join us! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      RU: {
        name: "Татьяна",
        message: ", приглашаем вас на нашу свадьбу 14 сентября! Мы бы очень хотели, если бы вы смогли приехать и отпраздновать с нами. Пожалуйста, сообщите нам, сможете ли вы присоединиться! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      PL: {
        name: "Tatjano",
        message: ", zapraszamy Cię na nasz ślub 14 września! Bardzo chcielibyśmy, żebyś mógł przyjść i świętować z nami. Daj nam znać, czy możesz do nas dołączyć! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      }
    },
    {
      id: 'zofija-antanas-1b8d4e7c9f6a',
      name: 'Zofija ir Antanas',
      LT: {
        name: "Zofija ir Antanai",
        message: " kviečiame Jus į mūsų vestuves rugsėjo 14 dieną! Labai norėtume, kad galėtumėte atvykti ir švęsti kartu su mumis. Prašome praneškite, ar galėsite prisijungti! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      EN: {
        name: "Zofija and Antanas",
        message: ", we invite you to our wedding on September 14th! We would love for you to be able to come and celebrate with us. Please let us know if you can join us! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      RU: {
        name: "Зофия и Антанас",
        message: ", приглашаем вас на нашу свадьбу 14 сентября! Мы были бы очень рады, если бы вы смогли приехать и отпраздновать с нами. Пожалуйста, сообщите нам, сможете ли вы присоединиться! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      PL: {
        name: "Zofio i Antanasie",
        message: ", zapraszamy Was na naszę weselna 14 września! Bylibyśmy bardzo szczęśliwi, gdybyście mogli przyjechać i świętować z nami. Dajcie nam znać, czy będziecie mogli do nas dołączyć! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      }
    },
    {
      id: 'samanta-3c9a7f2e5d6b',
      name: 'Samanta',
      LT: {
        name: "Samanta",
        message: ", kviečiame Tave į mūsų vestuves rugsėjo 14 dieną! Labai norėtume, kad galėtum atvykti ir kartu atšvęsti. Pranešk, ar galėsi prisijungti prie mūsų! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      EN: {
        name: "Samanta",
        message: ", we invite you to our wedding on September 14th! We would love for you to be able to come and celebrate with us. Please let us know if you can join us! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      RU: {
        name: "Саманта",
        message: ", приглашаем тебя на нашу свадьбу 14 сентября! Мы бы очень хотели, чтобы ты смог прийти и отпраздновать с нами. Сообщи нам, сможешь ли ты присоединиться к нам! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      PL: {
        name: "Samanto",
        message: ", zapraszamy Cię na nasz ślub 14 września! Bardzo chcielibyśmy, żebyś mógł przyjść i świętować z nami. Daj nam znać, czy możesz do nas dołączyć! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      }
    },
    {
      id: 'murashko-6b5e3f8d2c1a',
      name: 'Семья Мурашко',
      LT: {
        name: "Muraško šeimyna",
        message: ", kviečiame Jus į mūsų vestuves rugsėjo 14 dieną! Labai norėtume, kad galėtumėte atvykti ir švęsti kartu su mumis. Prašome praneškite, ar galėsite prisijungti! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      EN: {
        name: "Murashko family",
        message: ", we invite your family to our wedding on September 14th! We would love for your family to be able to come and celebrate with us. Please let us know if you can join us! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      RU: {
        name: "Семья Мурашко",
        message: ", приглашаем вас на нашу свадьбу 14 сентября! Мы были бы очень рады, если бы вы смогли приехать и отпраздновать с нами. Пожалуйста, сообщите нам, сможете ли вы присоединиться! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      PL: {
        name: "Rodzino Murashko",
        message: ", zapraszamy Was na nasz ślub 14 września! Bylibyśmy bardzo szczęśliwi, gdybyście mogli przyjechać i świętować z nami. Dajcie nam znać, czy będziecie mogli do nas dołączyć! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      }
    },
    {
      id: 'irena-vaclovas-5g9p2r7s3m6w',
      name: 'Irena ir Vaclovas',
      LT: {
        name: "Irena ir Vaclovai",
        message: ", kviečiame Jus į mūsų vestuves rugsėjo 14 dieną! Labai norėtume, kad galėtumėte atvykti ir švęsti kartu su mumis. Prašome praneškite, ar galėsite prisijungti! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      EN: {
        name: "Irena and Vaclovas",
        message: ", we invite your family to our wedding on September 14th! We would love for your family to be able to come and celebrate with us. Please let us know if you can join us! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      RU: {
        name: "Irena и Vaclovas",
        message: ", приглашаем вас на нашу свадьбу 14 сентября! Мы были бы очень рады, если бы вы смогли приехать и отпраздновать с нами. Пожалуйста, сообщите нам, сможете ли вы присоединиться! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      PL: {
        name: "Ireno i Vaclovas",
        message: ", zapraszamy Was na nasz ślub 14 września! Bylibyśmy bardzo szczęśliwi, gdybyście mogli przyjechać i świętować z nami. Dajcie nam znać, czy będziecie mogli do nas dołączyć! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      }
    },
    {
      id: 'test-123456789',
      name: 'Test user',
      LT: {
        name: "Testinis vartotojas",
        message: ", kviečiame Tave į mūsų vestuves rugsėjo 14 dieną! Labai norėtume, kad galėtum atvykti ir kartu atšvęsti. Pranešk, ar galėsi prisijungti prie mūsų! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      EN: {
        name: "Test user",
        message: ", we invite you to our wedding on September 14th! We would love for you to be able to come and celebrate with us. Please let us know if you can join us! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      RU: {
        name: "Тестовый пользователь",
        message: ", приглашаем тебя на нашу свадьбу 14 сентября! Мы бы очень хотели, чтобы ты смог прийти и отпраздновать с нами. Сообщи нам, сможешь ли ты присоединиться к нам! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      PL: {
        name: "Test użytkownika",
        message: ", zapraszamy Cię na nasz ślub 14 września! Bardzo chcielibyśmy, żebyś mógł przyjść i świętować z nami. Daj nam znać, czy możesz do nas dołączyć! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      }
    },
    {
      id: 'audra-valentinas-4f8q1t6u2n5v',
      name: 'Audra ir Valentinas',
      LT: {
        name: "Audra ir Valentinai",
        message: ", kviečiame Jus į mūsų vestuves rugsėjo 14 dieną! Labai norėtume, kad galėtumėte atvykti ir švęsti kartu su mumis. Prašome praneškite, ar galėsite prisijungti! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      EN: {
        name: "Audra and Valentin",
        message: ", we invite your family to our wedding on September 14th! We would love for your family to be able to come and celebrate with us. Please let us know if you can join us! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      RU: {
        name: "Аудра и Валентин",
        message: ", приглашаем вас на нашу свадьбу 14 сентября! Мы были бы очень рады, если бы вы смогли приехать и отпраздновать с нами. Пожалуйста, сообщите нам, сможете ли вы присоединиться! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      PL: {
        name: "Audra i Walenty",
        message: ", zapraszamy Was na nasz ślub 14 września! Bylibyśmy bardzo szczęśliwi, gdybyście mogli przyjechać i świętować z nami. Dajcie nam znać, czy będziecie mogli do nas dołączyć! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      }
    },
    {
      id: 'виктория-мирослав-4a3f73bec38b',
      name: 'Viktorija ir Miroslav',
      LT: {
        name: "Viktorija ir Miroslav",
        message: ", kviečiame Jus į mūsų vestuves rugsėjo 14 dieną! Labai norėtume, kad galėtumėte atvykti ir švęsti kartu su mumis. Prašome praneškite, ar galėsite prisijungti! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      EN: {
        name: "Viktorija and Miroslav",
        message: ", we invite your family to our wedding on September 14th! We would love for your family to be able to come and celebrate with us. Please let us know if you can join us! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      RU: {
        name: "Виктория и Мирослав",
        message: ", приглашаем вас на нашу свадьбу 14 сентября! Мы были бы очень рады, если бы вы смогли приехать и отпраздновать с нами. Пожалуйста, сообщите нам, сможете ли вы присоединиться! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      PL: {
        name: "Wiktoria i Mirosław",
        message: ", zapraszamy Was na nasz ślub 14 września! Bylibyśmy bardzo szczęśliwi, gdybyście mogli przyjechać i świętować z nami. Dajcie nam znać, czy będziecie mogli do nas dołączyć! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      }
    },
    {
      id: 'лидия-aff80f849648',
      name: 'Лидия',
      LT: {
        name: "Lidija",
        message: ", kviečiame Tave į mūsų vestuves rugsėjo 14 dieną! Labai norėtume, kad galėtum atvykti ir kartu atšvęsti. Pranešk, ar galėsi prisijungti prie mūsų! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      EN: {
        name: "Lidija",
        message: ", we invite you to our wedding on September 14th! We would love for you to be able to come and celebrate with us. Please let us know if you can join us! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      RU: {
        name: "Дорогая бабушка Лидия",
        message: ", приглашаем тебя на нашу свадьбу 14 сентября! Мы бы очень хотели, чтобы ты смог прийти и отпраздновать с нами. Сообщи нам, сможешь ли ты присоединиться к нам! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      PL: {
        name: "Lydia",
        message: ", zapraszamy Cię na nasz ślub 14 września! Bardzo chcielibyśmy, żebyś mógł przyjść i świętować z nami. Daj nam znać, czy możesz do nas dołączyć! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      }
    },
    {
      id: 'andrius-d21b1dad59ec',
      name: 'Andrius',
      LT: {
        name: "Andriau",
        message: ", kviečiame Tave į mūsų vestuves rugsėjo 14 dieną! Labai norėtume, kad galėtum atvykti ir kartu atšvęsti. Pranešk, ar galėsi prisijungti prie mūsų! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      EN: {
        name: "Andrius",
        message: ", we invite you to our wedding on September 14th! We would love for you to be able to come and celebrate with us. Please let us know if you can join us! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      RU: {
        name: "Андрюс",
        message: ", приглашаем тебя на нашу свадьбу 14 сентября! Мы бы очень хотели, чтобы ты смог прийти и отпраздновать с нами. Сообщи нам, сможешь ли ты присоединиться к нам! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      PL: {
        name: "Andrzej",
        message: ", zapraszamy Cię na nasz ślub 14 września! Bardzo chcielibyśmy, żebyś mógł przyjść i świętować z nami. Daj nam znać, czy możesz do nas dołączyć! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      }
    },
    {
      id: 'follie-7e69c310137d',
      name: 'Follie',
      LT: {
        name: "Follie",
        message: ", kviečiame Tave į mūsų vestuves rugsėjo 14 dieną! Labai norėtume, kad galėtum atvykti ir kartu atšvęsti. Pranešk, ar galėsi prisijungti prie mūsų! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      EN: {
        name: "Follie",
        message: ", we invite you to our wedding on September 14th! We would love for you to be able to come and celebrate with us. Please let us know if you can join us! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      RU: {
        name: "Follie",
        message: ", приглашаем тебя на нашу свадьбу 14 сентября! Мы бы очень хотели, чтобы ты смог прийти и отпраздновать с нами. Сообщи нам, сможешь ли ты присоединиться к нам! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      PL: {
        name: "Follie",
        message: ", zapraszamy Cię na nasz ślub 14 września! Bardzo chcielibyśmy, żebyś mógł przyjść i świętować z nami. Daj nam znać, czy możesz do nas dołączyć! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      }
    },
    {
      id: 'tatyana-vladimir-7ab08c5dd2b7',
      name: 'Татьяна и Владимир',
      LT: {
        name: "Tatjana ir Vladimirai",
        message: ", kviečiame Jus į mūsų vestuves rugsėjo 14 dieną! Labai norėtume, kad galėtumėte atvykti ir švęsti kartu su mumis. Prašome praneškite, ar galėsite prisijungti! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      EN: {
        name: "Tatjana and Vladimiras",
        message: ", we invite your family to our wedding on September 14th! We would love for your family to be able to come and celebrate with us. Please let us know if you can join us! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      RU: {
        name: "Татьяна и Владимир",
        message: ", приглашаем вас на нашу свадьбу 14 сентября! Мы были бы очень рады, если бы вы смогли приехать и отпраздновать с нами. Пожалуйста, сообщите нам, сможете ли вы присоединиться! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      PL: {
        name: "Tatiana i Władimir",
        message: ", zapraszamy Was na nasz ślub 14 września! Bylibyśmy bardzo szczęśliwi, gdybyście mogli przyjechać i świętować z nami. Dajcie nam znać, czy będziecie mogli do nas dołączyć! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      }
    },
    {
      id: 'aleksandr-080da4759acf',
      name: 'Александр',
      LT: {
        name: "Aleksandrai",
        message: ", kviečiame Tave į mūsų vestuves rugsėjo 14 dieną! Labai norėtume, kad galėtum atvykti ir kartu atšvęsti. Pranešk, ar galėsi prisijungti prie mūsų! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      EN: {
        name: "Alexander",
        message: ", we invite you to our wedding on September 14th! We would love for you to be able to come and celebrate with us. Please let us know if you can join us! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      RU: {
        name: "Александр",
        message: ", приглашаем тебя на нашу свадьбу 14 сентября! Мы бы очень хотели, чтобы ты смог прийти и отпраздновать с нами. Сообщи нам, сможешь ли ты присоединиться к нам! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      PL: {
        name: "Aleksander",
        message: ", zapraszamy Cię na nasz ślub 14 września! Bardzo chcielibyśmy, żebyś mógł przyjść i świętować z nami. Daj nam znać, czy możesz do nas dołączyć! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      }
    },
    {
      id: 'vytautas-enrika-7187e1f50bb9',
      name: 'Vytautas ir Enrika',
      LT: {
        name: "Vytautai ir Enrika",
        message: ", kviečiame Jus į mūsų vestuves rugsėjo 14 dieną! Labai norėtume, kad galėtumėte atvykti ir švęsti kartu su mumis. Prašome praneškite, ar galėsite prisijungti! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      EN: {
        name: "Vytautas and Enrika",
        message: ", we invite your family to our wedding on September 14th! We would love for your family to be able to come and celebrate with us. Please let us know if you can join us! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      RU: {
        name: "Витаутас и Энрика",
        message: ", приглашаем вас на нашу свадьбу 14 сентября! Мы были бы очень рады, если бы вы смогли приехать и отпраздновать с нами. Пожалуйста, сообщите нам, сможете ли вы присоединиться! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      PL: {
        name: "Vytautas i Enrika",
        message: ", zapraszamy Was na nasz ślub 14 września! Bylibyśmy bardzo szczęśliwi, gdybyście mogli przyjechać i świętować z nami. Dajcie nam znać, czy będziecie mogli do nas dołączyć! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      }
    },
    {
      id: 'nerijus-75f468110229',
      name: 'Nerijus ir Audronė',
      LT: {
        name: "Nerijau ir Audrone",
        message: ", kviečiame Jus į mūsų vestuves rugsėjo 14 dieną! Labai norėtume, kad galėtumėte atvykti ir švęsti kartu su mumis. Prašome praneškite, ar galėsite prisijungti! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      EN: {
        name: "Nerijus and Audronė",
        message: ", we invite your family to our wedding on September 14th! We would love for your family to be able to come and celebrate with us. Please let us know if you can join us! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      RU: {
        name: "Нерий и Аудроне",
        message: ", приглашаем вас на нашу свадьбу 14 сентября! Мы были бы очень рады, если бы вы смогли приехать и отпраздновать с нами. Пожалуйста, сообщите нам, сможете ли вы присоединиться! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      PL: {
        name: "Nerijus i Audronė",
        message: ", zapraszamy Was na nasz ślub 14 września! Bylibyśmy bardzo szczęśliwi, gdybyście mogli przyjechać i świętować z nami. Dajcie nam znać, czy będziecie mogli do nas dołączyć! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      }
    },
    {
      id: 'rasa-67a12e7abdf2',
      name: 'Rasa',
      LT: {
        name: "Rasa",
        message: ", kviečiame Tave į mūsų vestuves rugsėjo 14 dieną! Labai norėtume, kad galėtum atvykti ir kartu atšvęsti. Pranešk, ar galėsi prisijungti prie mūsų! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      EN: {
        name: "Rasa",
        message: ", we invite you to our wedding on September 14th! We would love for you to be able to come and celebrate with us. Please let us know if you can join us! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      RU: {
        name: "Расa",
        message: ", приглашаем тебя на нашу свадьбу 14 сентября! Мы бы очень хотели, чтобы ты смог прийти и отпраздновать с нами. Сообщи нам, сможешь ли ты присоединиться к нам! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      PL: {
        name: "Raso",
        message: ", zapraszamy Cię na nasz ślub 14 września! Bardzo chcielibyśmy, żebyś mógł przyjść i świętować z nami. Daj nam znać, czy możesz do nas dołączyć! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      }
    },
    {
      id: 'lina-57e8385ebc31',
      name: 'Lina',
      LT: {
        name: "Lina",
        message: ", kviečiame Tave į mūsų vestuves rugsėjo 14 dieną! Labai norėtume, kad galėtum atvykti ir kartu atšvęsti. Pranešk, ar galėsi prisijungti prie mūsų! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      EN: {
        name: "Lina",
        message: ", we invite you to our wedding on September 14th! We would love for you to be able to come and celebrate with us. Please let us know if you can join us! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      RU: {
        name: "Лина",
        message: ", приглашаем тебя на нашу свадьбу 14 сентября! Мы бы очень хотели, чтобы ты смог прийти и отпраздновать с нами. Сообщи нам, сможешь ли ты присоединиться к нам! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      PL: {
        name: "Lino",
        message: ", zapraszamy Cię na nasz ślub 14 września! Bardzo chcielibyśmy, żebyś mógł przyjść i świętować z nami. Daj nam znać, czy możesz do nas dołączyć! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      }
    },
    {
      id: 'nadezda-af9edef66697',
      name: 'Nadezda',
      LT: {
        name: "Nadezda",
        message: ", kviečiame Tave į mūsų vestuves rugsėjo 14 dieną! Labai norėtume, kad galėtum atvykti ir kartu atšvęsti. Pranešk, ar galėsi prisijungti prie mūsų! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      EN: {
        name: "Nadezda",
        message: ", we invite you to our wedding on September 14th! We would love for you to be able to come and celebrate with us. Please let us know if you can join us! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      RU: {
        name: "Надежда",
        message: ", приглашаем Вас на нашу свадьбу 14 сентября! Мы бы очень хотели, чтобы ты смог прийти и отпраздновать с нами. Сообщи нам, сможешь ли ты присоединиться к нам! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      PL: {
        name: "Nadieżda",
        message: ", zapraszamy Cię na nasz ślub 14 września! Bardzo chcielibyśmy, żebyś mógł przyjść i świętować z nami. Daj nam znać, czy możesz do nas dołączyć! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      }
    },
    {
      id: 'jelena-darius-e341b3fb07e3',
      name: 'Jalena ir Darius',
      LT: {
        name: "Jelena ir Dariau",
        message: ", kviečiame Jus į mūsų vestuves rugsėjo 14 dieną! Labai norėtume, kad galėtumėte atvykti ir švęsti kartu su mumis. Prašome praneškite, ar galėsite prisijungti! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      EN: {
        name: "Jelena and Darius",
        message: ", we invite your family to our wedding on September 14th! We would love for your family to be able to come and celebrate with us. Please let us know if you can join us! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      RU: {
        name: "Елена и Дарий",
        message: ", приглашаем вас на нашу свадьбу 14 сентября! Мы были бы очень рады, если бы вы смогли приехать и отпраздновать с нами. Пожалуйста, сообщите нам, сможете ли вы присоединиться! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      },
      PL: {
        name: "Jelena i Darius",
        message: ", zapraszamy Was na nasz ślub 14 września! Bylibyśmy bardzo szczęśliwi, gdybyście mogli przyjechać i świętować z nami. Dajcie nam znać, czy będziecie mogli do nas dołączyć! 😎🥳🎉🍻🥂💃🕺🍾🎊🎁🎂🎈"
      }
    }

  ];

}
