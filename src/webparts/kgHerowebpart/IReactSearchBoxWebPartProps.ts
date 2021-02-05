import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IReactSearchBoxWebPartProps {
  context: WebPartContext;
  listTitle: string;
  mainTitle: string;
  /**
   * Search results page url.
   * Full url should be specified e.g. https://<your_tenant>.sharepoint.com/search/Pages/results.aspx.
   */
  searchResultsPageUrl: string;

}
