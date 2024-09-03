import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {User} from "../model/user.model";

@Injectable({
  providedIn: 'root'
})

export class FirebaseUserService {
  private baseUrl = 'https://wedding-invitations-27fb4-default-rtdb.europe-west1.firebasedatabase.app';

  activeUser: User | undefined;

  constructor(private http: HttpClient) {
  }

  createUserWithId(user: User): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/${user.id}.json`, JSON.stringify(user));
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${userId}.json`);
  }

  updateUser(userId: string, updatedUser: User): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/${userId}.json`, updatedUser);
  }

  setAttendance(userId: string, status: boolean | null, overnightStay: boolean | null, userMessage: string, userPhone: string, userEmail: string): Observable<any> {
    const payload = {
      attending: status,
      overnightStay: overnightStay,
      message: userMessage,
      phone: userPhone,
      email: userEmail,
      activity: new Date(),
    };
    return this.http.patch(`${this.baseUrl}/users/${userId}.json`, payload);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<{ [key: string]: User }>(`${this.baseUrl}/users.json`)
      .pipe(
        map(responseData => {
          const users: User[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              users.push({...responseData[key], id: key});
            }
          }
          return users;
        })
      );
  }

  createUsers(users: User[]): void {
    for (let user of users) {
      this.createUserWithId(user).subscribe(
        responseData => {
          console.log(responseData);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  setActiveUser(user: User) {
    this.activeUser = user
  }

  getActiveUser() {
    return this.activeUser;
  }

}
