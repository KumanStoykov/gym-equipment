import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistProductCardComponent } from './wishlist-product-card.component';

describe('WishlistProductCardComponent', () => {
  let component: WishlistProductCardComponent;
  let fixture: ComponentFixture<WishlistProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WishlistProductCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WishlistProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
