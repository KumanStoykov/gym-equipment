import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DumbbellInfoComponent } from './dumbbell-info.component';

describe('DumbbellInfoComponent', () => {
  let component: DumbbellInfoComponent;
  let fixture: ComponentFixture<DumbbellInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DumbbellInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DumbbellInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
