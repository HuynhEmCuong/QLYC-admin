/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TaskRequestService } from './task-request.service';

describe('Service: TaskRequest', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskRequestService]
    });
  });

  it('should ...', inject([TaskRequestService], (service: TaskRequestService) => {
    expect(service).toBeTruthy();
  }));
});
