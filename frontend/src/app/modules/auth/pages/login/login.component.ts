import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  hidePassword = true;
  subs: SubSink = new SubSink();

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['julian-ortiz98@hotmail.com', [Validators.required, Validators.email]],
      password: ['Julian9824', Validators.required]
    });
  }
  
  ngOnInit(): void {
  }
  
  onSubmit() {
    return this.router.navigate(['/dashboard']);
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      
      this.subs.add(
        this.authService.login(email, password).subscribe({
          next: (res) => {
            console.log('Token recibido:', res.token);
          },
          error: (err) => {
            console.error('Error de login:', err);
          }
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
