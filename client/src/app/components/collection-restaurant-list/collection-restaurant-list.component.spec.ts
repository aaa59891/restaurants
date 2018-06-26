import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionRestaurantListComponent } from './collection-restaurant-list.component';

describe('CollectionRestaurantListComponent', () => {
  let component: CollectionRestaurantListComponent;
  let fixture: ComponentFixture<CollectionRestaurantListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionRestaurantListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionRestaurantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
