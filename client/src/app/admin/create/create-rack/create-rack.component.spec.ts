import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRackComponent } from './create-rack.component';

describe('CreateRackComponent', () => {
  let component: CreateRackComponent;
  let fixture: ComponentFixture<CreateRackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
