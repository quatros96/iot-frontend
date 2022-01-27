import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomSwitchTilesComponent } from './room-switch-tiles.component';

describe('RoomSwitchTilesComponent', () => {
  let component: RoomSwitchTilesComponent;
  let fixture: ComponentFixture<RoomSwitchTilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomSwitchTilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomSwitchTilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
