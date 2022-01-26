import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomSensorsTilesComponent } from './room-sensors-tiles.component';

describe('RoomSensorsTilesComponent', () => {
  let component: RoomSensorsTilesComponent;
  let fixture: ComponentFixture<RoomSensorsTilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomSensorsTilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomSensorsTilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
