import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { IAuthState } from 'src/app/+store/reducers';
import { AuthService } from 'src/app/auth/auth.service';

import { BenchDetailsComponent } from './bench-details.component';
const testStore = {
    user: {
        _id: 123456,
        email: 'joe@gmail.com'
    }
}
describe('BenchDetailsComponent', () => {
    let component: BenchDetailsComponent;
    let fixture: ComponentFixture<BenchDetailsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BenchDetailsComponent],
            imports: [
                RouterTestingModule,
                HttpClientModule
            ],
            providers: [
                AuthService,
                {
                    provide: Store<IAuthState>,
                    useValue: testStore
                }
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(BenchDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
