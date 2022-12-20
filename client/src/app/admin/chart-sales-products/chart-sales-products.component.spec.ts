import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { IAuthState } from 'src/app/+store/reducers';
import { AdminService } from '../admin.service';

import { ChartSalesProductsComponent } from './chart-sales-products.component';
const testStore = {
    select(){
        return of([])
    },
    dispatch() {}
}
describe('ChartSalesProductsComponent', () => {
  let component: ChartSalesProductsComponent;
  let fixture: ComponentFixture<ChartSalesProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartSalesProductsComponent ],
      imports: [
        HttpClientModule
      ],
      providers: [
        AdminService,
        {
            provide: Store<IAuthState>,
            useValue: testStore
        }
      ]
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
