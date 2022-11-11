import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenchDetailsComponent } from './bench-details.component';

describe('BenchDetailsComponent', () => {
  let component: BenchDetailsComponent;
  let fixture: ComponentFixture<BenchDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenchDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenchDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
