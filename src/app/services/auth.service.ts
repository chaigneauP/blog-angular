import { Injectable } from '@angular/core';
import 'firebase';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  // tslint:disable-next-line:typedef
  createNewUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          () => {
            // @ts-ignore
            resolve();
          },
          // @ts-ignore
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  // tslint:disable-next-line:typedef
  signInUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            // @ts-ignore
            resolve();
          },
          // @ts-ignore
          (error) => {
            reject(error);
          }
        );
      }
    );
  }
  // tslint:disable-next-line:typedef
  signOutUser(){
    // @ts-ignore
    firebase.auth().signOut();
  }
}
