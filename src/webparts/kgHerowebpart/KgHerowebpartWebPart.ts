import * as React from "react";
import * as ReactDom from "react-dom";
import { Version, DisplayMode } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import * as strings from "KgHerowebpartWebPartStrings";
import KgHerowebpart from "./components/KgHerowebpart";
import { IKgHerowebpartProps } from "./components/IKgHerowebpartProps";
import { IReactSearchBoxWebPartProps } from "./IReactSearchBoxWebPartProps";
import Utils from "./Utils";

import { sp } from "@pnp/sp/presets/all";

// export interface IKgHerowebpartWebPartProps {
//   description: string;
// }

export default class KgHerowebpartWebPart extends BaseClientSideWebPart<IReactSearchBoxWebPartProps> {
  public render(): void {
    const element: React.ReactElement<IKgHerowebpartProps> = React.createElement(
      KgHerowebpart,
      {
        // description: this.properties.description,
        context: this.context,
        listTitle: this.properties.listTitle,
        mainTitle: this.properties.mainTitle,
        searchResultsPageUrl: this.properties.searchResultsPageUrl,
        tenantUrl: Utils.getTenantUrl(
          this.context.pageContext.site.absoluteUrl,
          this.context.pageContext.site.serverRelativeUrl
        ),
      }
    );

    ReactDom.render(element, this.domElement);
  }

  //add this function for pnpjs
  protected onInit(): Promise<void> {
    return super.onInit().then((_) => {
      // other init code may be present
      sp.setup({
        spfxContext: this.context,
      });
    });
  }
  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("mainTitle", {
                  label: strings.mainTitleFieldLabel,
                }),
                PropertyPaneTextField("searchResultsPageUrl", {
                  label: strings.DefaultSearchResultsPageUrlFieldLabel,
                }),

                PropertyPaneTextField("listTitle", {
                  label: strings.listTitle,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
