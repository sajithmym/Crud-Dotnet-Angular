import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { setting } from 'Setting';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  users: any[] = [];
  selectedUser: any;
  message: string = '';
  isPopupVisible: boolean = false;
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

  openUpdatePopup(user: any) {
    this.selectedUser = user;
    this.isPopupVisible = true;
  }

  closeUpdatePopup() {
    this.isPopupVisible = false;
  }

  updateUser(user: any) {
    const apiUrl = `${setting.api_url}users/${user.id}`;

    this.http.put(apiUrl, user).subscribe(
      (data: any) => {
        alert('Update Successful ');
        this.fetchUsers();
      },
      (error) => {
        this.message = 'Error Occurred while updating user';
        alert(this.message)
      },
      () => {
        this.closeUpdatePopup();
      }
    );
  }

}
