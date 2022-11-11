import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RackInfoComponent } from './rack-info.component';

describe('RackInfoComponent', () => {
  let component: RackInfoComponent;
  let fixture: ComponentFixture<RackInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RackInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RackInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
