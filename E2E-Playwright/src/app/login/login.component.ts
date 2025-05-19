import { Component, OnInit } from '@angular/core';
import { RouterModule,Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import {UserCrudOperationsService} from './../user-crud-operations.service';
 
@Component({
  selector: 'app-login',
  imports: [HttpClientModule,CommonModule, FormsModule, MatDatepickerModule, MatInputModule, MatFormFieldModule, MatCardModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [UserCrudOperationsService]
})
export class LoginComponent implements OnInit {
  user = {
    name: '',
    password: '',
    errorMessage:'',
    userNameErrorMessage:'',
    passwordErrorMessage:''
   
  };  
 
  constructor(private router: Router, private userService:UserCrudOperationsService) {}
 
  ngOnInit(): void {
    // Initialization logic here
  }
 
  onSubmit(form: any) {
    let hasError = false;
 
    if (this.user.name === '') {
      this.user.userNameErrorMessage = 'Username is required';
      this.user.errorMessage='';
      hasError = true;
    } else {
      this.user.userNameErrorMessage = '';
    }
 
    if (this.user.password === '') {
      this.user.passwordErrorMessage = 'Password is required';
      this.user.errorMessage='';
      hasError = true;
    } else {
      this.user.passwordErrorMessage = '';
    }
 
    if (hasError) {
      return;
    }
 
    if (form.valid) {      
      //login if username and password matches based on crud operations service
      this.user.userNameErrorMessage = '';
      this.user.passwordErrorMessage = '';
      this.userService.loginUser(this.user.name, this.user.password).subscribe((data) => {
        console.log(data);
        if (data.length > 0) {
          alert('Login Successful');
          this.user.errorMessage = '';
          this.router.navigate(['/customer-update'],{ queryParams: { username: this.user.name } });
          
        } else {
          this.user.errorMessage = 'Invalid Username or Password';
          /*this.user.name='';
          this.user.password='';*/
    }
  });
}
  
 
 
  
  }
 
 
 
}
   
 
