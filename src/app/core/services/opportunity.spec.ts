import { TestBed } from '@angular/core/testing';

import { Opportunity } from './opportunity.interface';

describe('Opportunity', () => {
  let service: Opportunity;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Opportunity);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
