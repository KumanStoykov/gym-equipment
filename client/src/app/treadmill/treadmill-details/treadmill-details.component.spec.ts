import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreadmillDetailsComponent } from './treadmill-details.component';

describe('TreadmillDetailsComponent', () => {
  let component: TreadmillDetailsComponent;
  let fixture: ComponentFixture<TreadmillDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreadmillDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreadmillDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
