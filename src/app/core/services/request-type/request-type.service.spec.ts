/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RequestTypeService } from './request-type.service';

describe('Service: RequestType', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequestTypeService]
    });
  });

  it('should ...', inject([RequestTypeService], (service: RequestTypeService) => {
    expect(service).toBeTruthy();
  }));
});
