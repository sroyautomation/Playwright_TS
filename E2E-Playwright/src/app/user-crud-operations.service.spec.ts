import { TestBed } from '@angular/core/testing';

import { UserCrudOperationsService } from './user-crud-operations.service';

describe('UserCrudOperationsService', () => {
  let service: UserCrudOperationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserCrudOperationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
