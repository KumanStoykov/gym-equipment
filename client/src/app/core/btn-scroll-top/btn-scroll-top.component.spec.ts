import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnScrollTopComponent } from './btn-scroll-top.component';

describe('BtnScrollTopComponent', () => {
  let component: BtnScrollTopComponent;
  let fixture: ComponentFixture<BtnScrollTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnScrollTopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnScrollTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
