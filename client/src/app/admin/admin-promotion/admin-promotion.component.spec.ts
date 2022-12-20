import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { IAuthState } from 'src/app/+store/reducers';
import { PromotionService } from 'src/app/promotion/promotion.service';

import { AdminPromotionComponent } from './admin-promotion.component';

const testStore = {
    promotion: {
        _id: '2132asd123',
        productType: 'Bike',
        product: {
            _id: '1312312312',
            brand: 'LifeFitness',
            images: ['http://asdasdas.com', 'http://asdasdas.com'],
            price: 1200,
            promoPrice: 0,
            productType: 'Bike'
        }
    }
}
describe('AdminPromotionComponent', () => {
    let component: AdminPromotionComponent;
    let fixture: ComponentFixture<AdminPromotionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AdminPromotionComponent],
            imports: [
                RouterTestingModule,
                HttpClientModule,
            ],
            providers: [
                PromotionService,
                {
                    provide: Store<IAuthState>,
                    useValue: testStore
                }
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(AdminPromotionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
