import { FccRandomQuoteMachinePage } from './app.po';

describe('fcc-random-quote-machine App', () => {
  let page: FccRandomQuoteMachinePage;

  beforeEach(() => {
    page = new FccRandomQuoteMachinePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
