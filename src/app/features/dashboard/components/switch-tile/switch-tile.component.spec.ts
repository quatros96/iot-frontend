import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchTileComponent } from './switch-tile.component';

describe('SwitchTileComponent', () => {
  let component: SwitchTileComponent;
  let fixture: ComponentFixture<SwitchTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwitchTileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
