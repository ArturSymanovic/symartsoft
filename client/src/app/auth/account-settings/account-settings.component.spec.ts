import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatDialog } from '@angular/material/dialog';
import { MaterialsModule } from 'src/app/_modules/materials/materials.module';
import { AccountSettingsComponent } from './account-settings.component';

describe('AccountSettingsComponent', () => {
  let component: AccountSettingsComponent;
  let fixture: ComponentFixture<AccountSettingsComponent>;
  let dialogSpy: jasmine.SpyObj<MatDialog> = jasmine.createSpyObj<MatDialog>(
    `MatDialog`,
    [`open`]
  );
  let loader: HarnessLoader;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountSettingsComponent],
      imports: [MaterialsModule],
      providers: [{ provide: MatDialog, useValue: dialogSpy }],
    }).compileComponents();
    fixture = TestBed.createComponent(AccountSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`#opendialog() should call dialog open method`, () => {
    component.openDialog();
    expect(dialogSpy.open).toHaveBeenCalled();
  });

  it('should render Delete Account button that calls openDialog method', async () => {
    let button = await loader.getHarness(
      MatButtonHarness.with({ text: new RegExp('Delete Account') })
    );
    expect(button).toBeTruthy();
    spyOn(component, `openDialog`);
    await button.click();
    expect(component.openDialog).toHaveBeenCalled();
  });
});
