import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartSalesProductsComponent } from './chart-sales-products.component';

describe('ChartComponent', () => {
  let component: ChartSalesProductsComponent;
  let fixture: ComponentFixture<ChartSalesProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartSalesProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartSalesProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
