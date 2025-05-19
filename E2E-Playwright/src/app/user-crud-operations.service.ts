import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserCrudOperationsService {

  private readonly apiUrl ='http://localhost:3000/users';
  constructor(private readonly http: HttpClient) { }

  //login user using username and password
  
 loginUser(username: string, password: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?username=${username}&password=${password}`);
  } 
  

  //register user
  registerUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }
  //update user based on username
  //we will use this method to update user details later in next sprint

  getUserData(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?username=${username}`); // Use query parameter for username
  }

//update user based on username
  updateUser(userId: string, user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}`, user); // Use RESTful URL convention
  }
  
  //delete user based on user name
  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}`); // Use RESTful URL convention
  }

    
}

