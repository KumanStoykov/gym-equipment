import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartProductsComponent } from './chart-products.component';

describe('ChartComponent', () => {
  let component: ChartProductsComponent;
  let fixture: ComponentFixture<ChartProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
