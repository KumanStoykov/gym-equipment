import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProductCheckoutComponent } from './user-product-checkout.component';

describe('UserProductCheckoutComponent', () => {
  let component: UserProductCheckoutComponent;
  let fixture: ComponentFixture<UserProductCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProductCheckoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProductCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
