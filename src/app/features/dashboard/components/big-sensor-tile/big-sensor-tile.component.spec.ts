import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BigSensorTileComponent } from './big-sensor-tile.component';

describe('BigSensorTileComponent', () => {
  let component: BigSensorTileComponent;
  let fixture: ComponentFixture<BigSensorTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BigSensorTileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BigSensorTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
