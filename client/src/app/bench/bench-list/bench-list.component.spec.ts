import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenchListComponent } from './bench-list.component';

describe('BenchListComponent', () => {
  let component: BenchListComponent;
  let fixture: ComponentFixture<BenchListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenchListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
