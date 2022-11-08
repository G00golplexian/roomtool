import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: User = new User();

  constructor() {
    const _user = localStorage.getItem("UserData");
    if(_user)
    {
      this.currentUser = new User(JSON.parse(_user));
    }
  }
}
