import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDumbbellComponent } from './create-dumbbell.component';

describe('CreateDumbbellComponent', () => {
  let component: CreateDumbbellComponent;
  let fixture: ComponentFixture<CreateDumbbellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDumbbellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDumbbellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
