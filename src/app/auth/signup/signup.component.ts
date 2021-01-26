import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  // @ts-ignore
  signUpForm: FormGroup;
  // @ts-ignore
  errorMessage: string;

  constructor(private formuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.initForm();
  }

  // tslint:disable-next-line:typedef
  initForm(){
    this.signUpForm = this.formuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }
  // tslint:disable-next-line:typedef
  onSubmit() {
    // @ts-ignore
    const email = this.signUpForm.get('email').value;
    // @ts-ignore
    const password = this.signUpForm.get('password').value;
    this.authService.createNewUser(email, password).then(
      () => {
        this.router.navigate(['/posts']);
      },
      // tslint:disable-next-line:no-shadowed-variable
      (error) => {
        this.errorMessage = error;
      }
    );
  }

}
