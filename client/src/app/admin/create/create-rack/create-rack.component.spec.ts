import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { IAuthState } from 'src/app/+store/reducers';
import { AuthService } from 'src/app/auth/auth.service';

import { CreateRackComponent } from './create-rack.component';
const testStore = {
    user: {
        _id: 123456,
        email: 'joe@gmail.com'
    }
}
describe('CreateRackComponent', () => {
    let component: CreateRackComponent;
    let fixture: ComponentFixture<CreateRackComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CreateRackComponent],
            imports: [
                FormsModule,
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

        fixture = TestBed.createComponent(CreateRackComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Input with value should be successfully', (done: DoneFn) => {
        const htmlEl = fixture.debugElement.query(By.css('input[name=brand]'));
        const input = htmlEl.nativeElement as HTMLInputElement;

        input.value = 'Matrix';
        input.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            expect(input.value).toEqual('Matrix');

            done();
        })
    });
    it('Touched Input without value should show error', (done: DoneFn) => {
        const htmlInputEl = fixture.debugElement.query(By.css('input[name=brand]'));
        const input = htmlInputEl.nativeElement as HTMLInputElement;

        input.value = '';
        input.dispatchEvent(new Event('blur'));
        fixture.detectChanges();

        const pTagEl = fixture.debugElement.query(By.css('.error'));
        const errorEl = pTagEl.nativeElement as HTMLElement;

        fixture.detectChanges();
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            expect(errorEl.textContent).toEqual('Field is required!');

            done();
        })
    });

    it('Button must be disabled when input is invalid', (done: DoneFn) => {
        const htmlEl = fixture.debugElement.query(By.css('input[name=brand]'));
        const input = htmlEl.nativeElement as HTMLInputElement;

        const subElement = fixture.debugElement.query(By.css('.create-btn'));
        const btn = subElement.nativeElement as HTMLButtonElement;

        input.value = 'Matrix';
        input.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            expect(btn.disabled).toBeTrue();

            done();
        })
    });
});
