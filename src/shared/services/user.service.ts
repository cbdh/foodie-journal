import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
<<<<<<< HEAD
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
=======
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
>>>>>>> 74fde68da0c80b69c96879543b39e412bf7a2683
import { User } from '../interfaces/user';
import { last } from 'rxjs/operators/last';

@Injectable()
export class UserService {
  LoggedUser = new BehaviorSubject<User>({name: '', email: '', password: ''});
  user: User;

  constructor() {}

  checkInitialUser(): BehaviorSubject<User> {
    if (!!localStorage.getItem('CurrentUser')) {
      this.login(JSON.parse(localStorage.getItem(localStorage.getItem('CurrentUser'))));
      } else { this.LoggedUser.next({name: '', email: '', password: ''}); }
    return this.LoggedUser;
  }

  login (user: User) {
    if (user.name.length > 0) {
      localStorage.setItem('CurrentUser', user.name);
      if (!!localStorage.getItem(user.name)) {
        this.user = JSON.parse(localStorage.getItem(user.name));
      } else {
        localStorage.setItem(user.name, JSON.stringify(user));
      }
<<<<<<< HEAD
=======
      console.log('User ' + user.name + ' has logged in.');
>>>>>>> 74fde68da0c80b69c96879543b39e412bf7a2683
    }
    this.LoggedUser.next(this.user);
  }

  logout (): void {
    localStorage.removeItem('CurrentUser');
  }

  updateProgress (journeyid: number, dishid: number): void {
    this.LoggedUser.pipe(last()).subscribe(user => (this.user = user));
    this.user['journey' + journeyid][dishid - 1] = !this.user['journey' + journeyid][dishid - 1];
    this.LoggedUser.next(this.user);
    localStorage.setItem(this.user.name, JSON.stringify(this.user));
    console.log('Changed journey ' + journeyid + ' , dish ' + dishid + ' to value: ' + this.user['journey' + journeyid][dishid - 1]);
  }

  checkProgress (journeyid: number): number {
    console.log(this.LoggedUser.value['journey' + journeyid].array.filter( x => x === true).length);
    return this.LoggedUser.value['journey' + journeyid].array.filter( x => x === true).length;
  }

}
