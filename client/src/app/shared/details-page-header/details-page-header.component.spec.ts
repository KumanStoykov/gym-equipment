import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPageHeaderComponent } from './details-page-header.component';

describe('DetailsPageHeaderComponent', () => {
  let component: DetailsPageHeaderComponent;
  let fixture: ComponentFixture<DetailsPageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsPageHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsPageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
