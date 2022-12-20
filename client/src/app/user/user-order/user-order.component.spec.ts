import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { IAuthState } from 'src/app/+store/reducers';
import { UserService } from '../user.service';

import { UserOrderComponent } from './user-order.component';
const testStore = {
    user: {
        _id: 123456,
        email: 'joe@gmail.com'
    }
}
describe('UserOrderComponent', () => {
  let component: UserOrderComponent;
  let fixture: ComponentFixture<UserOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserOrderComponent ],
      imports: [
        HttpClientModule,
      ],
      providers: [
          UserService,
          {
              provide: Store<IAuthState>,
              useValue: testStore
          }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
