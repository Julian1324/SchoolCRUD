import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  hidePassword = true;

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

      this.authService.login(email, password)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          console.log('Token recibido:', res.token);
        },
        error: (err) => {
          console.error('Error de login:', err);
        }
      });
    }
  }


}
