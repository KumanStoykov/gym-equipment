import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreadmillInfoComponent } from './treadmill-info.component';

describe('TreadmillInfoComponent', () => {
  let component: TreadmillInfoComponent;
  let fixture: ComponentFixture<TreadmillInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreadmillInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreadmillInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
