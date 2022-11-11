import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DumbbellListComponent } from './dumbbell-list.component';

describe('DumbbellListComponent', () => {
  let component: DumbbellListComponent;
  let fixture: ComponentFixture<DumbbellListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DumbbellListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DumbbellListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
