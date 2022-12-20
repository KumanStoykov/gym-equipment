import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { IAuthState } from 'src/app/+store/reducers';
import { AdminService } from '../admin.service';

import { ChartSalesVolumeComponent } from './chart-sales-volume.component';
const testStore = {
    select(){
        return of([])
    },
    dispatch() {}
}
describe('ChartSalesVolumeComponent', () => {
    let component: ChartSalesVolumeComponent;
    let fixture: ComponentFixture<ChartSalesVolumeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ChartSalesVolumeComponent],
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

        fixture = TestBed.createComponent(ChartSalesVolumeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
