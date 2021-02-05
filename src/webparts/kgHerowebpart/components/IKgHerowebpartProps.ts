import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IKgHerowebpartProps {
  context: WebPartContext;
  listTitle: string;
  mainTitle: string;
  //  description: string;
  /**
   * Search results page url.
   * Full url should be specified e.g. https://<your_tenant>.sharepoint.com/search/Pages/results.aspx.
   */
  searchResultsPageUrl: string;
  // /**
  //  * The current tenant url.
  //  */
  tenantUrl: string;

}
