import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterBrandComponent } from './filter-brand.component';

describe('FilterBrandComponent', () => {
  let component: FilterBrandComponent;
  let fixture: ComponentFixture<FilterBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterBrandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
