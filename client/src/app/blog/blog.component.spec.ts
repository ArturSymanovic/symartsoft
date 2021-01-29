import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonHarness } from '@angular/material/button/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialsModule } from '../_modules/materials/materials.module';
import { BlogComponent } from './blog.component';
import { MatChipListHarness } from '@angular/material/chips/testing';
import { By } from '@angular/platform-browser';

describe('BlogComponent', () => {
  let component: BlogComponent;
  let fixture: ComponentFixture<BlogComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlogComponent],
      imports: [
        MaterialsModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(BlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render search button if search sidebar is closed', async () => {
    component.drawer.opened = false;
    const buttons = await loader.getAllHarnesses(
      MatButtonHarness.with({ text: `search` })
    );
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('should render close search button if search sidebar is opened', async () => {
    component.drawer.opened = true;
    const buttons = await loader.getAllHarnesses(
      MatButtonHarness.with({ text: `search_off` })
    );
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('search button should call searchClicked method', async () => {
    component.drawer.opened = false;
    const searchButton = await loader.getHarness(
      MatButtonHarness.with({ text: `search` })
    );
    spyOn(component, 'searchClicked');
    await searchButton.click();
    expect(component.searchClicked).toHaveBeenCalled();
  });

  it('close search button should call searchClicked method', async () => {
    component.drawer.opened = true;
    const searchButton = await loader.getHarness(
      MatButtonHarness.with({ text: `search_off` })
    );
    spyOn(component, 'searchClicked');
    await searchButton.click();
    expect(component.searchClicked).toHaveBeenCalled();
  });

  it('should render tag filter "prev" button', async () => {
    const buttons = await loader.getAllHarnesses(
      MatButtonHarness.with({ text: `keyboard_arrow_left` })
    );
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('tag filter "prev" button should be disabled if showLeftButton is false', async () => {
    component.showLeftButton = false;
    const button = await loader.getHarness(
      MatButtonHarness.with({ text: `keyboard_arrow_left` })
    );
    expect(await button.isDisabled()).toBeTrue();
  });

  it('tag filter "prev" button should call scrollLeft method', async () => {
    spyOn(component, `scrollLeft`);
    component.showLeftButton = true;
    const button = await loader.getHarness(
      MatButtonHarness.with({ text: `keyboard_arrow_left` })
    );
    await button.click();

    expect(component.scrollLeft).toHaveBeenCalled();
  });

  it('should render tag filter "next" button', async () => {
    const buttons = await loader.getAllHarnesses(
      MatButtonHarness.with({ text: `keyboard_arrow_right` })
    );
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('tag filter "next" button should be disabled if showRightButton is false', async () => {
    component.showRightButton = false;
    const button = await loader.getHarness(
      MatButtonHarness.with({ text: `keyboard_arrow_right` })
    );
    expect(await button.isDisabled()).toBeTrue();
  });

  it('tag filter "next" button should call scrollRight method', async () => {
    spyOn(component, `scrollRight`);
    component.showLeftButton = true;
    const button = await loader.getHarness(
      MatButtonHarness.with({ text: `keyboard_arrow_right` })
    );
    await button.click();
    expect(component.scrollRight).toHaveBeenCalled();
  });

  it('should render tag list correctly mapped tags', async () => {
    component.tags = [
      { name: `All`, selected: true, class: `first-chip` },
      { name: `test1`, selected: false, class: `` },
      { name: `Github Actions`, selected: false, class: `last-chip` },
    ];

    const taglist = await loader.getHarness(MatChipListHarness);
    expect(taglist).toBeTruthy();

    let tags = await taglist.getChips();
    expect(tags.length).toEqual(3);
    expect(await tags[0].getText()).toEqual(`All`);

    const testingElement = await tags[0].host();
    expect(await testingElement.hasClass(component.tags[0].class)).toBeTrue();

    spyOn(component, `tagSelected`);
    await testingElement.click();
    expect(component.tagSelected).toHaveBeenCalledWith(component.tags[0]);
  });

  it('should render search form with necessary bindings', async () => {
    const searchButton = await loader.getHarness(
      MatButtonHarness.with({ text: `search` })
    );
    await searchButton.click();
    expect(component.searchForm).toBeTruthy();
    expect(component.searchForm.controls.searchCriteria).toBeTruthy();

    const searchCriteriaInput = fixture.debugElement.queryAll(
      By.css('input[formControlName=searchCriteria]')
    );
    expect(searchCriteriaInput.length).toBeGreaterThan(0);

    spyOn(component, `showSearchResults`);
    searchCriteriaInput[0].triggerEventHandler(`keyup`, {});
    expect(component.showSearchResults).toHaveBeenCalled();

    const clearButton = await loader.getHarness(
      MatButtonHarness.with({ text: `close` })
    );
    expect(clearButton).toBeTruthy();

    component.searchForm.controls.searchCriteria.setValue(`test`);
    spyOn(component, `clearSearchCriteria`);
    await clearButton.click();
    expect(component.clearSearchCriteria).toHaveBeenCalled();
  });

  it('should render search results when there are any', async () => {
    const searchButton = await loader.getHarness(
      MatButtonHarness.with({ text: `search` })
    );
    await searchButton.click();
    component.blogPosts = [
      {
        title: `Title placeholder for sample blogpost title1 test test  `,
        summary: `This is placeholder for the summary1 of the sample blogpost.This is placeholder for the summary of the sample blogpost.`,
        routerLink: `sampleurl`,
        date: new Date(2019, 1, 15),
        tags: [`Azure`, `Angular`, `Docker`],
      },
      {
        title: `Title placeholder for sample blogpost title2`,
        summary: `This is placeholder for the summary2 of the sample blogpost.This is placeholder for the summary of the sample blogpost.`,
        routerLink: `sampleurl`,
        date: new Date(2019, 5, 5),
        tags: [`Testing`, `NGINX`, `Github Actions`],
      },
    ];
    component.searchForm.controls.searchCriteria.setValue(`test`);
    component.showSearchResults();
    fixture.detectChanges();
    const searchResults = fixture.debugElement.queryAll(
      By.css('.search-result')
    );
    expect(searchResults.length).toEqual(2);
    const searchResultsHeader = fixture.debugElement.queryAll(
      By.css('.search-result-header')
    );
    expect(searchResults[0].nativeElement.textContent).toContain(`summary1`);
    expect(
      searchResults[0].queryAll(By.css('a'))[0].attributes[`href`]
    ).toEqual(`/sampleurl`);
    expect(searchResultsHeader[0].nativeElement.textContent).toContain(`test`);
  });

  it('should display no results message when there are no results', async () => {
    const searchButton = await loader.getHarness(
      MatButtonHarness.with({ text: `search` })
    );
    await searchButton.click();
    component.blogPosts = [];
    component.searchForm.controls.searchCriteria.setValue(`test`);
    component.showSearchResults();
    fixture.detectChanges();
    const searchResults = fixture.debugElement.queryAll(
      By.css('.search-result')
    );
    expect(searchResults.length).toEqual(0);
    const message = fixture.debugElement.queryAll(By.css('.search-drawer'));
    expect(message[0].nativeElement.textContent).toContain(`No blogposts`);
  });

  it('should render correct blogCards based on selected tags', async () => {
    component.tags = [
      { name: `All`, selected: true, class: `first-chip` },
      { name: `Azure`, selected: false, class: `` },
    ];
    component.filteredBlogPosts = [
      {
        title: `Title placeholder for sample blogpost title1 test test  `,
        summary: `This is placeholder for the summary1 of the sample blogpost.This is placeholder for the summary of the sample blogpost.`,
        routerLink: `sampleurl`,
        date: new Date(2019, 1, 15),
        tags: [`Azure`, `Angular`, `Docker`],
      },
      {
        title: `Title placeholder for sample blogpost title2`,
        summary: `This is placeholder for the summary2 of the sample blogpost.This is placeholder for the summary of the sample blogpost.`,
        routerLink: `sampleurl`,
        date: new Date(2019, 5, 5),
        tags: [`Testing`, `NGINX`, `Github Actions`],
      },
    ];
    fixture.detectChanges();
    const blogCards = fixture.debugElement.queryAll(By.css('.blog-card'));
    expect(blogCards.length).toEqual(2);
    expect(blogCards[0].nativeElement.textContent).toContain(`test`);
    expect(blogCards[0].nativeElement.textContent).toContain(`summary1`);
    expect(blogCards[0].nativeElement.textContent).toContain(`Feb 15, 2019`);
    expect(blogCards[0].nativeElement.textContent).toContain(
      `Azure, Angular, Docker`
    );
    expect(blogCards[0].queryAll(By.css('a'))[0].attributes[`href`]).toEqual(
      `/sampleurl`
    );
    const readButtons = await loader.getAllHarnesses(
      MatButtonHarness.with({ text: `share SHARE` })
    );
    expect(readButtons.length).toEqual(2);
  });

  it('should render no results view when selected tags dont have any blogposts', async () => {
    component.tags = [
      { name: `Allasdfasd`, selected: true, class: `first-chip` },
      { name: `Azure`, selected: false, class: `` },
    ];
    component.filteredBlogPosts = [];
    fixture.detectChanges();

    const noResultsMessage = fixture.debugElement.queryAll(
      By.css('.no-results-message')
    );
    expect(noResultsMessage.length).toBeGreaterThan(0);

    const resetFiltersButton = await loader.getHarness(
      MatButtonHarness.with({ text: `RESET FILTERS` })
    );
    expect(resetFiltersButton).toBeTruthy();
    spyOn(component, `resetFilters`);
    await resetFiltersButton.click();
    expect(component.resetFilters).toHaveBeenCalled();
  });

  it('#scrollLeft should scroll the element left', () => {
    spyOn(component.overflowContainer.nativeElement, 'scroll');
    component.scrollLeft();
    expect(
      component.overflowContainer.nativeElement.scroll
    ).toHaveBeenCalledWith({
      left: component.overflowContainer.nativeElement.scrollLeft - 150,
      behavior: 'smooth',
    });
  });

  it('#scrollLeft should disable left button if scrollLeft is 0', (done) => {
    component.overflowContainer.nativeElement.scrollLeft = 0;
    component.showLeftButton = true;
    component.scrollLeft();
    setTimeout(() => {
      expect(component.showLeftButton).toBeFalse();
      done();
    }, 500);
  });

  it('#scrollLeft should enable right button', (done) => {
    component.overflowContainer.nativeElement.scrollLeft = 500;
    component.showRightButton = false;
    fixture.detectChanges();
    component.scrollLeft();
    setTimeout(() => {
      expect(component.showRightButton).toBeTrue();
      done();
    }, 500);
  });

  it('#scrollRight should scroll the element right', () => {
    spyOn(component.overflowContainer.nativeElement, 'scroll');
    component.scrollRight();
    expect(
      component.overflowContainer.nativeElement.scroll
    ).toHaveBeenCalledWith({
      left: component.overflowContainer.nativeElement.scrollLeft + 150,
      behavior: 'smooth',
    });
  });

  it('#scrollRight should disable right button if scrollLeft didnt change', (done) => {
    const maxScrollLeft =
      component.overflowContainer.nativeElement.scrollWidth -
      component.overflowContainer.nativeElement.clientWidth;
    component.overflowContainer.nativeElement.scrollLeft = maxScrollLeft;
    component.showRightButton = true;
    component.scrollRight();
    setTimeout(() => {
      expect(component.showRightButton).toBeFalse();
      done();
    }, 500);
  });

  it('#scrollRight should enable left button', (done) => {
    component.overflowContainer.nativeElement.scrollLeft = 0;
    component.showLeftButton = false;
    fixture.detectChanges();
    component.scrollRight();
    setTimeout(() => {
      expect(component.showLeftButton).toBeTrue();
      done();
    }, 500);
  });

  it('#tagSelected should do nothing if it is "All" tag and it is already selected ', () => {
    component.tagSelected({
      name: `All`,
      selected: true,
      class: `first-chip`,
    });
    expect().nothing();
  });

  it('#tagSelected should deselect all other tags if "All" is selected', () => {
    component.tags = [
      {
        name: `All`,
        selected: false,
        class: `first-chip`,
      },
      {
        name: `test1`,
        selected: true,
        class: ``,
      },
      {
        name: `test2`,
        selected: true,
        class: ``,
      },
    ];
    component.tagSelected(component.tags[0]);
    expect(component.tags[0].selected).toBeTrue();
    expect(component.tags[1].selected).toBeFalse();
    expect(component.tags[2].selected).toBeFalse();
  });

  it('#tagSelected (when not "All" and not selected) should select tag and deselect "All"', () => {
    component.tags = [
      {
        name: `All`,
        selected: true,
        class: `first-chip`,
      },
      {
        name: `test1`,
        selected: false,
        class: ``,
      },
      {
        name: `test2`,
        selected: false,
        class: ``,
      },
    ];
    component.tagSelected(component.tags[1]);
    expect(component.tags[0].selected).toBeFalse();
    expect(component.tags[1].selected).toBeTrue();
    expect(component.tags[2].selected).toBeFalse();
  });

  it('#tagSelected (when not "All"; selected; it is last selected tag) should deselect tag and select "All" tag', () => {
    component.tags = [
      {
        name: `All`,
        selected: false,
        class: `first-chip`,
      },
      {
        name: `test1`,
        selected: true,
        class: ``,
      },
      {
        name: `test2`,
        selected: false,
        class: ``,
      },
    ];
    component.tagSelected(component.tags[1]);
    expect(component.tags[0].selected).toBeTrue();
    expect(component.tags[1].selected).toBeFalse();
    expect(component.tags[2].selected).toBeFalse();
  });

  it('#tagSelected (when not "All"; selected; it is not last selected tag) should only deselect tag', () => {
    component.tags = [
      {
        name: `All`,
        selected: false,
        class: `first-chip`,
      },
      {
        name: `test1`,
        selected: true,
        class: ``,
      },
      {
        name: `test2`,
        selected: true,
        class: ``,
      },
    ];
    component.tagSelected(component.tags[1]);
    expect(component.tags[0].selected).toBeFalse();
    expect(component.tags[1].selected).toBeFalse();
    expect(component.tags[2].selected).toBeTrue();
  });

  it('#filterByTags should set filtered blog posts to be equal to all blog posts', () => {
    component.tags = [
      { name: `All`, selected: true, class: `first-chip` },
      { name: `test1`, selected: false, class: `` },
      { name: `test2`, selected: false, class: `` },
    ];
    component.blogPosts = [
      {
        title: `Title1`,
        summary: `Summary1`,
        routerLink: `url1`,
        date: new Date(2019, 1, 15),
        tags: [`test1`, `Angular`, `Docker`],
      },
      {
        title: `Title2`,
        summary: `Summary2`,
        routerLink: `url3`,
        date: new Date(2019, 1, 15),
        tags: [`test2`, `Angular`, `Docker`],
      },
      {
        title: `Title3`,
        summary: `Summary3`,
        routerLink: `url3`,
        date: new Date(2019, 1, 15),
        tags: [`test1`, `test2`, `Docker`],
      },
    ];
    component.filterByTags();
    expect(component.filteredBlogPosts).toEqual(component.blogPosts);
  });

  it('#filterByTags should set filtered blog posts to matching blogposts', () => {
    component.tags = [
      { name: `All`, selected: false, class: `first-chip` },
      { name: `test1`, selected: true, class: `` },
      { name: `test2`, selected: false, class: `` },
    ];
    component.blogPosts = [
      {
        title: `Title1`,
        summary: `Summary1`,
        routerLink: `url1`,
        date: new Date(2019, 1, 15),
        tags: [`test1`, `Angular`, `Docker`],
      },
      {
        title: `Title2`,
        summary: `Summary2`,
        routerLink: `url3`,
        date: new Date(2019, 1, 15),
        tags: [`test2`, `Angular`, `Docker`],
      },
      {
        title: `Title3`,
        summary: `Summary3`,
        routerLink: `url3`,
        date: new Date(2019, 1, 15),
        tags: [`test1`, `test2`, `Docker`],
      },
    ];
    component.filterByTags();
    expect(component.filteredBlogPosts).toEqual([
      component.blogPosts[0],
      component.blogPosts[2],
    ]);
  });

  it('#resetFilters should select all tag and delelect other tags', () => {
    component.tags = [
      { name: `All`, selected: false, class: `first-chip` },
      { name: `test1`, selected: true, class: `` },
      { name: `test2`, selected: false, class: `` },
    ];
    component.blogPosts = [
      {
        title: `Title1`,
        summary: `Summary1`,
        routerLink: `url1`,
        date: new Date(2019, 1, 15),
        tags: [`test1`, `Angular`, `Docker`],
      },
      {
        title: `Title2`,
        summary: `Summary2`,
        routerLink: `url3`,
        date: new Date(2019, 1, 15),
        tags: [`test2`, `Angular`, `Docker`],
      },
      {
        title: `Title3`,
        summary: `Summary3`,
        routerLink: `url3`,
        date: new Date(2019, 1, 15),
        tags: [`test1`, `test2`, `Docker`],
      },
    ];
    component.resetFilters();
    expect(component.tags).toEqual([
      { name: `All`, selected: true, class: `first-chip` },
      { name: `test1`, selected: false, class: `` },
      { name: `test2`, selected: false, class: `` },
    ]);
  });

  it('#searchClicked should call showSearchResults and open search sidebar when from closed', () => {
    spyOn(component.drawer, `toggle`);
    spyOn(component, `showSearchResults`);
    component.searchClicked();
    expect(component.showSearchResults).toHaveBeenCalled();
    expect(component.drawer.toggle).toHaveBeenCalled();
  });

  it('#searchClicked should call showSearchResults and open search sidebar when from opened', () => {
    component.drawer.open();
    spyOn(component.drawer, `toggle`);
    spyOn(component, `showSearchResults`);
    component.searchClicked();
    expect(component.showSearchResults).not.toHaveBeenCalled();
    expect(component.drawer.toggle).toHaveBeenCalled();
  });

  it('#showSearchResults should set search results to empty array if search criteria field is empty or shorter thatn 3 chars ', () => {
    component.drawer.open();
    component.searchForm.controls.searchCriteria.setValue(``);
    component.showSearchResults();
    expect(component.searchResults).toEqual([]);
    component.searchForm.controls.searchCriteria.setValue(`as`);
    component.showSearchResults();
    expect(component.searchResults).toEqual([]);
  });

  it('#showSearchResults should set search results array of matched results', () => {
    component.blogPosts = [
      {
        title: `Title1`,
        summary: `Summary1`,
        routerLink: `url1`,
        date: new Date(2019, 1, 15),
        tags: [`test1`, `Angular`, `Docker`],
      },
      {
        title: `Title2`,
        summary: `Summary2`,
        routerLink: `url3`,
        date: new Date(2019, 1, 15),
        tags: [`test2`, `Angular`, `Docker`],
      },
      {
        title: `Title3`,
        summary: `Summary3`,
        routerLink: `url3`,
        date: new Date(2019, 1, 15),
        tags: [`test1`, `test2`, `Docker`],
      },
    ];
    component.drawer.open();
    component.searchForm.controls.searchCriteria.setValue(`Title1`);
    component.showSearchResults();
    expect(component.searchResults).toEqual([component.blogPosts[0]]);
    component.searchForm.controls.searchCriteria.setValue(`test1`);
    component.showSearchResults();
    expect(component.searchResults).toEqual([
      component.blogPosts[0],
      component.blogPosts[2],
    ]);
    component.searchForm.controls.searchCriteria.setValue(`summary2`);
    component.showSearchResults();
    expect(component.searchResults).toEqual([component.blogPosts[1]]);
  });

  it('#clearSearchCriteria should set search criteria field to "" and call showSearchResults', () => {
    component.blogPosts = [
      {
        title: `Title1`,
        summary: `Summary1`,
        routerLink: `url1`,
        date: new Date(2019, 1, 15),
        tags: [`test1`, `Angular`, `Docker`],
      },
      {
        title: `Title2`,
        summary: `Summary2`,
        routerLink: `url3`,
        date: new Date(2019, 1, 15),
        tags: [`test2`, `Angular`, `Docker`],
      },
      {
        title: `Title3`,
        summary: `Summary3`,
        routerLink: `url3`,
        date: new Date(2019, 1, 15),
        tags: [`test1`, `test2`, `Docker`],
      },
    ];
    component.drawer.open();
    component.searchForm.controls.searchCriteria.setValue(`Title1`);
    spyOn(component, 'showSearchResults');
    component.clearSearchCriteria();
    expect(component.showSearchResults).toHaveBeenCalled();
    expect(component.searchForm.controls.searchCriteria.value).toEqual(``);
  });
});
