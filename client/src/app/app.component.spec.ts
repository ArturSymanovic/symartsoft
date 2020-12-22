import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AuthService } from './_services/auth.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([]), HttpClientModule],
      providers: [AuthService],
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should create navbar', () => {
    const navbar = fixture.nativeElement.querySelector('app-nav');
    expect(navbar).toBeTruthy();
  });

  it('should create router outlet', () => {
    const routerOutlet = fixture.nativeElement.querySelector('router-outlet');
    expect(routerOutlet).toBeTruthy();
  });

  it(`#setCurrentUser should call auth services setCurrentUser method`, () => {
    spyOn(fixture.componentInstance.authService, 'setCurrentUser');
    fixture.componentInstance.setCurrentUser();
    expect(fixture.componentInstance.authService.setCurrentUser).toHaveBeenCalled();
  });
});
