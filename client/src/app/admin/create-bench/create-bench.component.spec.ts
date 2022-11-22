import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBenchComponent } from './create-bench.component';

describe('CreateBenchComponent', () => {
  let component: CreateBenchComponent;
  let fixture: ComponentFixture<CreateBenchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBenchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBenchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
