import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule,Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {UserCrudOperationsService} from './../user-crud-operations.service';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

@Component({
  selector: 'app-customer-update',
  imports: [ReactiveFormsModule,CommonModule, FormsModule, MatDatepickerModule, MatInputModule, MatFormFieldModule, MatCardModule,RouterModule, HttpClientModule], // Add HttpClientModule here
  templateUrl: './customer-update.component.html',
  styleUrl: './customer-update.component.css',
  providers: [UserCrudOperationsService]
})
export class CustomerUpdateComponent implements OnInit {

  userForm!: FormGroup;
  user = {
    id:'',
    username:'',       
    password: '',
    firstName: '',
    lastName: '', 
    email: '',
    phone: '',
    dateofBirth: ''   
  };
  
  errorMessage:string = ''; // Initialize errorMessage as an empty string

  constructor(private route: ActivatedRoute, private formBuilder:FormBuilder,
    private userService:UserCrudOperationsService,private router: Router) {}


  ngOnInit(): void {
    

    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: [{ value: '', disabled: true }],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^\\d{10}$')]],
      dateofBirth: ['', Validators.required]
    });
    // Retrieve the username from the query parameters
    this.route.queryParams.subscribe(params => {
      this.user.username = params['username'] || '';
      this.userForm.patchValue({ username: this.user.username });
      this.loadUserData(this.user.username);
    });
  }

  loadUserData(username: string) {
    this.userService.getUserData(username).subscribe((data) => {
      if (data.length > 0) {  
        this.user.id=data[0].id; // Assuming the ID is returned in the response 
        this.user.username = data[0].username;   
        this.user.password = data[0].password;
        this.user.firstName = data[0].firstName;
        this.user.lastName = data[0].lastName;
        this.user.email = data[0].email;
        this.user.phone = data[0].phone;
        this.user.dateofBirth = data[0].dateofBirth;
        this.userForm.patchValue(this.user);
      } else {
        this.errorMessage = 'User not found';
      }
    });
  }



  onSubmit() {
    if (this.userForm.valid) {
     // Update the user data based on the user ID
     this.user.firstName = this.userForm.value.firstName;
     this.user.lastName = this.userForm.value.lastName; 
      this.user.password = this.userForm.value.password;
      this.user.email = this.userForm.value.email;
      this.user.phone = this.userForm.value.phone;
      this.user.dateofBirth = this.userForm.value.dateofBirth;
      this.userService.updateUser(this.user.id, this.user).subscribe(
        (response) => {
          if (response) {
            alert('User data updated successfully');
            this.router.navigate(['/login']);
          } else {
            this.errorMessage = 'User data not updated. Check the data';
          }
        });
    }  
    
  
        
  }//added reset button
  onReset() {
    this.userForm.reset();

  }
}





