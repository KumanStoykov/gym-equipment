import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { IAuthState } from 'src/app/+store/reducers';
import { AuthService } from 'src/app/auth/auth.service';

import { DumbbellDetailsComponent } from './dumbbell-details.component';

describe('DumbbellDetailsComponent', () => {
    let component: DumbbellDetailsComponent;
    let fixture: ComponentFixture<DumbbellDetailsComponent>;
    const testStore = {
        user: {
            _id: 123456,
            email: 'joe@gmail.com'
        }
    }
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DumbbellDetailsComponent],
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

        fixture = TestBed.createComponent(DumbbellDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
