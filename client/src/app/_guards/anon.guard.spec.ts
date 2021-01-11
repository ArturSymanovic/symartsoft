import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialsModule } from '../_modules/materials/materials.module';

import { AnonGuard } from './anon.guard';

describe('AnonGuard', () => {
  let guard: AnonGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MaterialsModule, RouterTestingModule],
    });
    guard = TestBed.inject(AnonGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
