import { WebpackLandPage } from './app.po';

describe('webpack-land App', () => {
  let page: WebpackLandPage;

  beforeEach(() => {
    page = new WebpackLandPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
