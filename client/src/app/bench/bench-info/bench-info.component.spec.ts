import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenchInfoComponent } from './bench-info.component';

describe('BenchInfoComponent', () => {
  let component: BenchInfoComponent;
  let fixture: ComponentFixture<BenchInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenchInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenchInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
