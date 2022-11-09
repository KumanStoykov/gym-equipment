import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreadmillCatalogComponent } from './treadmill-catalog.component';

describe('TreadmillCatalogComponent', () => {
  let component: TreadmillCatalogComponent;
  let fixture: ComponentFixture<TreadmillCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreadmillCatalogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreadmillCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
