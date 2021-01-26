import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import 'firebase';
import firebase from 'firebase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // @ts-ignore
  isAuth: boolean;

  constructor(private authService: AuthService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.isAuth = true;
        } else {
          this.isAuth = false;
        }
      }
    );
  }
  // tslint:disable-next-line:typedef
  onSignOut(){
    this.authService.signOutUser();
  }
}
