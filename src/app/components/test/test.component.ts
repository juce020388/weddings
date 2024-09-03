import {Component} from '@angular/core';
import {FirebaseUserService} from "../../utils/firebase-user.service";
import {Router} from "@angular/router";
import {FetchDataService} from "../../utils/fetch-data.service";
import {User} from "../../model/user.model";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
  userId: string = '';
  users: User[] = [];
  attendingUsers: User[] = [];
  notAttendingUsers: User[] = [];
  user: User | null = null;

  newUser: Partial<User> = {
    id: '',
    name: '',
    attending: null,
    overnightStay: null,
    count: 0,
    message: '',
    email: '',
    phone: '',
    activity: null,
    countryCode: 'LT'
  };

  constructor(private userService: FirebaseUserService, private router: Router, private dataService: FetchDataService) {
  }

  getUserById() {
    this.userService.getUserById(this.userId).subscribe(
      (user: User) => {
        this.user = user;
        console.log(user);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  uploadData() {
    console.log("All users uploaded" + this.dataService.getUsersList().length);
    this.userService.createUsers(this.dataService.getUsersList());
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      (users: User[]) => {
        this.users = users;
        this.users.forEach(user => {
          console.log(`https://www.juliusirdiana2024.lt/svecias/${user.countryCode}/${user.id}`);
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // getAllUsersThatAreAttending() {
  //   this.userService.getAllUsers().subscribe(
  //     (users: User[]) => {
  //       let count = 0;
  //       for (let user of users) {
  //         if (user.attending) {
  //           console.log(`User: ${user.name} | Attending: ${user.attending ? 'Yes' : 'No'} | Overnight: ${user.overnightStay ? 'Yes' : 'No'}`);
  //           count++;
  //         }
  //       }
  //       console.log(`Total users attending the wedding: ${count}`);
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }

  getAllUsersThatAreAttending() {
    this.userService.getAllUsers().subscribe(
      (users: User[]) => {
        this.attendingUsers = users.filter(user => user.attending);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAllUsersThatAreNotAttending() {
    this.userService.getAllUsers().subscribe(
      (users: User[]) => {
        this.notAttendingUsers = users.filter(user => user.attending === false);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateUser() {
    // Implement your logic to update user
  }


  createUser() {
    const userToCreate: User = {
      id: this.newUser.id!,
      name: this.newUser.name!,
      count: this.newUser.count!,
      countryCode: this.newUser.countryCode!,
      attending: this.newUser.attending ?? null,
      overnightStay: this.newUser.overnightStay ?? null,
      activity: this.newUser.activity ?? null,
      message: this.newUser.message,
      email: this.newUser.email,
      phone: this.newUser.phone
    };

    this.userService.createUserWithId(userToCreate).subscribe(
      (response) => {
        console.log(response);
        // Optionally, you can reset the newUser form after successful creation
        this.newUser = {
          id: '',
          name: '',
          attending: null,
          overnightStay: null,
          count: 0,
          message: '',
          email: '',
          phone: '',
          activity: null,
          countryCode: 'LT'
        };
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
