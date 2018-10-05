import {Injectable} from '@angular/core';

@Injectable()
export class CurrentUserService{

  get currentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  set currentUser(user) {
    localStorage.setItem('user', user);
  }

  constructor() {}
}
