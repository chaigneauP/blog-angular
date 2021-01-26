import { Component } from '@angular/core';
import 'firebase';
import firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor() {
    const firebaseConfig = {
      apiKey: 'AIzaSyBy89xa8OjHq00XdVXvZmxe2BSabUjcA0w',
      authDomain: 'blog-angular-1bcfa.firebaseapp.com',
      projectId: 'blog-angular-1bcfa',
      storageBucket: 'blog-angular-1bcfa.appspot.com',
      messagingSenderId: '294473413715',
      appId: '1:294473413715:web:1dc6e2fce4d36cdb2582a6'
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}
