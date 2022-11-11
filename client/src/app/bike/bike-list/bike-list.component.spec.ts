import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BikeListComponent } from './bike-list.component';

describe('BikeListComponent', () => {
  let component: BikeListComponent;
  let fixture: ComponentFixture<BikeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BikeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BikeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
