/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NoteTaskService } from './note-task.service';

describe('Service: NoteTask', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoteTaskService]
    });
  });

  it('should ...', inject([NoteTaskService], (service: NoteTaskService) => {
    expect(service).toBeTruthy();
  }));
});
