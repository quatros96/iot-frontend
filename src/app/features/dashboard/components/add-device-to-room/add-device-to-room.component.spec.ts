import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeviceToRoomComponent } from './add-device-to-room.component';

describe('AddDeviceToRoomComponent', () => {
  let component: AddDeviceToRoomComponent;
  let fixture: ComponentFixture<AddDeviceToRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDeviceToRoomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDeviceToRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
