import { Component, OnInit } from '@angular/core';
import { RouterModule,Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import {UserCrudOperationsService} from './../user-crud-operations.service';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-signup',
  imports: [HttpClientModule,CommonModule, FormsModule, MatDatepickerModule, MatInputModule, MatFormFieldModule, MatCardModule,RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  providers: [UserCrudOperationsService]
})
export class SignupComponent implements OnInit {
  ngOnInit(): void {
    // Initialization logic here
  }
  user = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    email: '',
    phone: '',
    dateofBirth: ''    
  };

  constructor(private router: Router, private userService:UserCrudOperationsService) {}

  onSubmit(form: any) {
    if (form.valid) {
      this.userService.registerUser(this.user).subscribe((data) => {
        console.log(data);
        if (data.length > 0) {
          alert('User already exists');
        } else {
          alert('Registration Successful.. Login');
          this.router.navigate(['/login']);
        }
      });
    }
  }

}