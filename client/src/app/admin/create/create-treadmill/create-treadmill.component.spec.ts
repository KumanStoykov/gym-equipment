import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTreadmillComponent } from './create-treadmill.component';

describe('CreateTreadmillComponent', () => {
  let component: CreateTreadmillComponent;
  let fixture: ComponentFixture<CreateTreadmillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTreadmillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTreadmillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
