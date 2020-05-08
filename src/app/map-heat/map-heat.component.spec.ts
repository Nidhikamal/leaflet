import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapHeatComponent } from './map-heat.component';

describe('MapHeatComponent', () => {
  let component: MapHeatComponent;
  let fixture: ComponentFixture<MapHeatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapHeatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapHeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
