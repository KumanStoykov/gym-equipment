import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormCheckoutComponent } from './user-form-checkout.component';

describe('UserFormCheckoutComponent', () => {
  let component: UserFormCheckoutComponent;
  let fixture: ComponentFixture<UserFormCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserFormCheckoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserFormCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
