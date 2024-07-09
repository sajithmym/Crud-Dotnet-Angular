import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { setting } from 'Setting';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css'],
})
export class DeleteComponent implements OnInit {
  users: any[] = [];
  message: string = '';
  loading: boolean = true;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    const apiUrl = setting.api_url + 'users';

    this.http.get(apiUrl).subscribe(
      (data: any) => {
        console.log('GET Request Response:', data);
        this.users = data;
        this.loading = false;
      },
      (error) => {
        this.message = 'Error Occurred while fetching users';
      },
    );
  }

  DeleteSingleUser = (id: number) => {
    // Ask a yes or no question using confirm
    var userConfirmed = confirm('Do you want to proceed?');

    // Check if the user clicked "OK" or "Cancel" and display a message accordingly
    if (userConfirmed) {
      const apiUrl = `${setting.api_url}users/${id}`;

      this.http.delete(apiUrl).subscribe(
        (data: any) => {
          this.message = `DELETE Request is successful...`;
          this.fetchUsers();
        },
        (error) => {
          this.message = 'Error Occurred while deleting user';
        },
      );
    }
  };
}
