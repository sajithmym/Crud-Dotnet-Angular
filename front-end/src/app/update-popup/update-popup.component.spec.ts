import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePopupComponent } from './update-popup.component';

describe('UpdatePopupComponent', () => {
  let component: UpdatePopupComponent;
  let fixture: ComponentFixture<UpdatePopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatePopupComponent]
    });
    fixture = TestBed.createComponent(UpdatePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
