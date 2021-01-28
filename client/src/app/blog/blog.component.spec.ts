import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonHarness } from '@angular/material/button/testing';
import { BlogTag } from '../_models/blog-tag';
import { MaterialsModule } from '../_modules/materials/materials.module';
import { BlogComponent } from './blog.component';

describe('BlogComponent', () => {
  let component: BlogComponent;
  let fixture: ComponentFixture<BlogComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlogComponent],
      imports: [MaterialsModule, FormsModule],
    }).compileComponents();
    fixture = TestBed.createComponent(BlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render search button', async () => {
    const searchButton = await loader.getAllHarnesses(
      MatButtonHarness.with({ text: `search` })
    );
    expect(searchButton.length).toBeGreaterThan(0);
  });

  it('should render search button', async () => {
    const searchButton = await loader.getAllHarnesses(
      MatButtonHarness.with({ text: `search` })
    );
    expect(searchButton.length).toBeGreaterThan(0);
  });
});
