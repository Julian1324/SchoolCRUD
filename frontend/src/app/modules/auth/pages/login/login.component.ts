import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthDTO } from '../../data/authDTO';
import { constants } from 'src/app/core/data/constants';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password)
        .pipe(take(1))
        .subscribe({
          next: (res: AuthDTO) => {
            localStorage.setItem('token', res.token);
            return this.router.navigate(['/dashboard']);
          },
          error: (err) => {
            const errorMessage = err.error?.message
              ? err.error.message
              : constants.MODAL_BODY_ERROR;

            this.notificationService.showError(errorMessage);
          }
        });
    }
  }
}
