import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showRecaptchaV2 = false;

  constructor(private fb: FormBuilder, private recaptchaV3Service: ReCaptchaV3Service) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      recaptcha: [''] // Form control for reCAPTCHA v2 response
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      // Execute reCAPTCHA v3 when user clicks login
      this.recaptchaV3Service.execute('login').subscribe((token: string) => {
        this.verifyRecaptchaV3Token(token);
      });
    } else {
      console.log('Form is not valid');
    }
  }

  verifyRecaptchaV3Token(token: string): void {
    // Simulate backend verification (replace with actual backend logic)
    const isBotDetected = this.simulateBackendCheck(token);

    if (isBotDetected) {
      this.showRecaptchaV2 = true; // Show reCAPTCHA v2 if bot is suspected
    } else {
      this.performLogin(); // Proceed with login if no bot is detected
    }
  }

  simulateBackendCheck(token: string): boolean {
    // Simulate backend logic (replace this with actual API call to verify token)
    console.log('Simulated backend received v3 token:', token);
    // Example condition: randomly determine bot detection (for testing)
    return Math.random() < 0.5; // Randomly simulate bot detection for testing
  }

  handleRecaptchaV2Resolved(captchaResponse: string): void {
    console.log('reCAPTCHA v2 resolved with response:', captchaResponse);
    this.loginForm.get('recaptcha')?.setValue(captchaResponse); // Set reCAPTCHA response to the form control
    this.performLogin(); // Proceed with login after reCAPTCHA v2 is solved
  }

  performLogin(): void {
    const formData = this.loginForm.value;
    console.log('Form Data:', formData);
    // Implement your login logic here
  }
}
