import { TestBed, inject } from '@angular/core/testing';

import { CollectionRestaurantService } from './collection-restaurant.service';

describe('CollectionRestaurantService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CollectionRestaurantService]
    });
  });

  it('should be created', inject([CollectionRestaurantService], (service: CollectionRestaurantService) => {
    expect(service).toBeTruthy();
  }));
});
