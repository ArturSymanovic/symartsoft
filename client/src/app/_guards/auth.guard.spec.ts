import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MaterialsModule } from '../_modules/materials/materials.module';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MaterialsModule],
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
