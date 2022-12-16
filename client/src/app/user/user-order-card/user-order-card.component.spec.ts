import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOrderCardComponent } from './user-order-card.component';

describe('UserOrderCardComponent', () => {
  let component: UserOrderCardComponent;
  let fixture: ComponentFixture<UserOrderCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserOrderCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserOrderCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
