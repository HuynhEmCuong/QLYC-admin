/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DepartService } from './depart.service';

describe('Service: Depart', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DepartService]
    });
  });

  it('should ...', inject([DepartService], (service: DepartService) => {
    expect(service).toBeTruthy();
  }));
});
