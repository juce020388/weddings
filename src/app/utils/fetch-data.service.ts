import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../model/user.model";
import {BehaviorSubject, filter, map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FetchDataService {
  private currentActiveUser: User | undefined;
  private usersSubject = new BehaviorSubject<User[]>([]);
  private users: User[] = [];

  constructor(private http: HttpClient) {
    this.getTextData().subscribe(data => {
      this.users = data;
      this.usersSubject.next(this.users);
    });
  }

  getTextData(): Observable<User[]> {
    return this.http.get<User[]>('assets/data.json');
  }

  findUserById(id: string): Observable<User | undefined> {
    return this.usersSubject.asObservable().pipe(
      filter(users => users.length > 0), // Only emit when the array is not empty
      map(users => users.find(u => u.id === id))
    );
  }

  updateUserInMemory(updatedUser: User): void {
    const index = this.users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = updatedUser;
      console.log(`User ${updatedUser.name} updated successfully.`);
    } else {
      console.log('User not found.');
    }
  }

  setCurrentActiveUser(user: User): void {
    this.currentActiveUser = user;
  }

  getCurrentActiveUser(): User | undefined {
    return this.currentActiveUser;
  }

  getCurrentAllUser(): Observable<User[]> {
    return this.usersSubject.asObservable();
  }

  getUsersList(): User[] {
    return this.users;
  }

}
