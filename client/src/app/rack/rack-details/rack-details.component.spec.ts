import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RackDetailsComponent } from './rack-details.component';

describe('RackDetailsComponent', () => {
  let component: RackDetailsComponent;
  let fixture: ComponentFixture<RackDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RackDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RackDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
