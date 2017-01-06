import { SearchFormPage } from './app.po';

describe('search-form App', function() {
  let page: SearchFormPage;

  beforeEach(() => {
    page = new SearchFormPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
