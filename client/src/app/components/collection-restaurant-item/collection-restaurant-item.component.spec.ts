import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionRestaurantItemComponent } from './collection-restaurant-item.component';

describe('CollectionRestaurantItemComponent', () => {
  let component: CollectionRestaurantItemComponent;
  let fixture: ComponentFixture<CollectionRestaurantItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionRestaurantItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionRestaurantItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
