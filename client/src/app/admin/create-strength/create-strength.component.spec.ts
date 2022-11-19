import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStrengthComponent } from './create-strength.component';

describe('CreateStrengthComponent', () => {
  let component: CreateStrengthComponent;
  let fixture: ComponentFixture<CreateStrengthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateStrengthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateStrengthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
