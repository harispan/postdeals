import { TestBed, inject } from '@angular/core/testing';

import { PostdataService } from './postdata.service';

describe('PostdataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostdataService]
    });
  });

  it('should be created', inject([PostdataService], (service: PostdataService) => {
    expect(service).toBeTruthy();
  }));
});
