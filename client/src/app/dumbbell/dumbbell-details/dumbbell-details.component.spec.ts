import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DumbbellDetailsComponent } from './dumbbell-details.component';

describe('DumbbellDetailsComponent', () => {
  let component: DumbbellDetailsComponent;
  let fixture: ComponentFixture<DumbbellDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DumbbellDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DumbbellDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
