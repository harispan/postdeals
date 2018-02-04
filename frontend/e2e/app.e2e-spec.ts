import { DealsPage } from './app.po';

describe('deals App', () => {
  let page: DealsPage;

  beforeEach(() => {
    page = new DealsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
