import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs';

import JsonData from '../../assets/json/users.json';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getActiveUsers(): Observable<Array<User>> {
    const users: Array<User> = JsonData;
    return of(users.filter(user => user.isActive === true));
  }
}
