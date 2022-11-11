import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreadmillListComponent } from './treadmill-list.component';

describe('TreadmillListComponent', () => {
  let component: TreadmillListComponent;
  let fixture: ComponentFixture<TreadmillListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreadmillListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreadmillListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
