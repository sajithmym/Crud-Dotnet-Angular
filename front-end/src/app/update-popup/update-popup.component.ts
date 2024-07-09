// update-popup.component.ts
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-popup',
  templateUrl: './update-popup.component.html',
  styleUrls: ['./update-popup.component.css']
})
export class UpdatePopupComponent implements OnInit {
  inputValue: string = ''; // Variable to store input value
  inputValueEmail: string = ''; // Variable to store input value

  ngOnInit(): void {
    this.inputValue = this.user.name;
    this.inputValueEmail = this.user.email;
  }

  @Input() user: any;
  @Output() update = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();

  oninit() {
    console.log(this.user);
  }

  onUpdate() {
    this.user.name = this.inputValue;
    this.user.email = this.inputValueEmail;
    this.update.emit(this.user);
  }

  onClose() {
    this.close.emit();
  }
  
}
