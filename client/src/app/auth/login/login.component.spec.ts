import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { IAuthState } from 'src/app/+store/reducers';
import { AuthService } from '../auth.service';

import { LoginComponent } from './login.component';

const testStore = {
    user: {
        _id: 123456,
        email: 'joe@gmail.com'
    }
}

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [
                ReactiveFormsModule,
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
        }).compileComponents();

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Email should be successfully', (done: DoneFn) => {
        const htmlEl = fixture.debugElement.query(By.css('#email'));
        const input = htmlEl.nativeElement as HTMLInputElement;

        input.value = 'joe@gmail.com';
        input.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            expect(input.value).toEqual('joe@gmail.com');

            done();
        })
    });
    it('Password should be successfully', (done: DoneFn) => {
        const htmlEl = fixture.debugElement.query(By.css('#password'));
        const input = htmlEl.nativeElement as HTMLInputElement;

        input.value = '123456';
        input.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            expect(input.value).toEqual('123456');

            done();
        })
    });
    it('Button is disabled when email is invalid', (done: DoneFn) => {
        const htmlEl = fixture.debugElement.query(By.css('#email'));
        const input = htmlEl.nativeElement as HTMLInputElement;

        const subElement = fixture.debugElement.query(By.css('.login-btn'));
        const btn = subElement.nativeElement as HTMLButtonElement;

        input.value = 'joegmail.com';
        input.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            expect(btn.disabled).toBeTrue();
            done();
        })
    });
    it('Button is disabled when password is invalid', (done: DoneFn) => {
        const htmlEl = fixture.debugElement.query(By.css('#password'));
        const input = htmlEl.nativeElement as HTMLInputElement;

        const subElement = fixture.debugElement.query(By.css('.login-btn'));
        const btn = subElement.nativeElement as HTMLButtonElement;

        input.value = '123';
        input.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            expect(btn.disabled).toBeTrue();
            done();
        })
    });

});
