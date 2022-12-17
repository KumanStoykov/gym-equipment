import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartSalesVolumeComponent } from './chart-sales-volume.component';

describe('ChartSalesVolumeComponent', () => {
  let component: ChartSalesVolumeComponent;
  let fixture: ComponentFixture<ChartSalesVolumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartSalesVolumeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartSalesVolumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
