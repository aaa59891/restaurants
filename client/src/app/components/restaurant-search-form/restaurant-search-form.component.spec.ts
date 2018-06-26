import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantSearchFormComponent } from './restaurant-search-form.component';

describe('RestaurantSearchFormComponent', () => {
  let component: RestaurantSearchFormComponent;
  let fixture: ComponentFixture<RestaurantSearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantSearchFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
