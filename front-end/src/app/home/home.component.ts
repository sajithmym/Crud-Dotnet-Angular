import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { setting } from 'Setting';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  users: any[] = [];
  message: string = '';
  loading: boolean = true;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    const apiUrl = setting.api_url + 'users'; // 'https://crudapp-nest.vercel.app/users';

    this.http.get(apiUrl).subscribe(
      (data: any) => {
        console.log('GET Request Response:', data);
        this.users = data;
        this.loading = false;
      },
      () => {
        this.message = 'Error Occurred while fetching users';
      },
    );
  }
}
