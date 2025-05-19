import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet]
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  user = {
    name: '',
    surname: '',
    email: '',
    password: '',
    cpassword: ''
  };

  constructor(private router: Router) {}

  passwordFieldType: string = 'password';

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  onSubmit() {
    if (this.user.password === this.user.cpassword) {
      console.log('User Data:', this.user);
      this.router.navigate(['customer-update/customer-update.component.html']);
    } else {
      console.error('Passwords do not match');
    }
  }

  navigateToCustomerUpdate() {
    this.router.navigate(['/customer-update']);
  }
}
