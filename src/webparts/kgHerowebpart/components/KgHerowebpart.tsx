import * as React from "react";
import styles from "./KgHerowebpart.module.scss";
import { IKgHerowebpartProps } from "./IKgHerowebpartProps";
import { IKgHerowebpartState } from "./IKgHerowebpartState";
import { escape } from "@microsoft/sp-lodash-subset";
import { SearchBox } from "office-ui-fabric-react/lib/SearchBox";
import {
  Pivot,
  PivotItem,
  PivotLinkFormat,
  PivotLinkSize,
} from "office-ui-fabric-react";
import { Spinner } from "office-ui-fabric-react/lib/Spinner";
import { sp, IWebInfo } from "@pnp/sp/presets/all";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";

declare const window: any;
export default class KgHerowebpart extends React.Component<
  IKgHerowebpartProps,
  IKgHerowebpartState
> {
  public ResultsPageUri: string;

  constructor(props: IKgHerowebpartProps) {
    super(props);
    this.submit = this.submit.bind(this);
    this.changeTerm = this.changeTerm.bind(this);
    this.state = {
      searchQuery: "",
      loading: false,
      //  LoginName: "",
      //SiteTitle: "",
      items: [],
      bgStyle: {
        backgroundImage: "",
      },
    };
  }

  public async componentWillMount() {
    // test
  }

  public async componentDidMount() {
    await this.displayRandomImage();
  }

  public async componentDidUpdate(
    prevProps: Readonly<IKgHerowebpartProps>,
    prevState: Readonly<IKgHerowebpartState>
  ) {
    if (prevProps.listTitle != this.props.listTitle) {
      await this.displayRandomImage();
    }
  }

  public displayRandomImage = async () => {
    this.setState({
      loading: false,
    });
    //test getting user and site info
    //  const user: ISiteUserInfo = await sp.web.currentUser
    //   .select("Id,Title,LoginName")
    //   .get();
    // const web: IWebInfo = await sp.web.select("Id, Title").get();

    const allItems: any[] = await sp.web.lists
      // .getByTitle("HeroWebpartList-Temp")
      .getByTitle(this.props.listTitle)
      .items.get();

    this.setState({
      // SiteTitle: web.Title,
      // LoginName: user.LoginName,
      // items: allItems.map((i) => i.HeroImage),
      items: allItems.map((i) => JSON.parse(i.HeroImage).serverRelativeUrl),
    });
    //test FE only
    // console.log(" all " + this.state.items);
    // const pictureArray = [
    //   "https://lendleasetestenv.sharepoint.com/sites/pkg-dev/SiteAssets/paya-lebar-square.png",
    //   "https://www.lendlease.com/au/-/media/llcom/featurecarousel/ll9527-cam-lendlease-website-homepage-banner-1900x650-v2.jpg",
    //   "https://www.lendlease.com/au/-/media/llcom/ch02-proposition/1900x500_auskyline.jpg",
    //   "https://www.lendlease.com/au/-/media/llcom/ch02-proposition/61brisbaneshowgroundsk10061size1900x500.jpg",
    //   "https://www.lendlease.com/au/-/media/llcom/ch02-proposition/projects.jpg",
    //   "https://www.lendlease.com/au/-/media/llcom/ch02-proposition/expertise/expertiselandingpage_all_1900x500px.jpg",
    //   "https://www.lendlease.com/au/-/media/llcom/ch02-proposition/1900x500_purpose_strategy_hero.png",
    // ];
    const pictureArray = await this.state.items;
    const randomIndex = await Math.floor(Math.random() * pictureArray.length);
    const selectedPicture = await pictureArray[randomIndex];
    // console.log("all images " + pictureArray);

    this.setState({
      bgStyle: {
        backgroundImage: `url(${selectedPicture})`,
      },
      loading: true,
    });
    // console.log("selected " + selectedPicture);
  };

  public render(): React.ReactElement<IKgHerowebpartProps> {
   // let isLoading = this.state.loading;
    return (
      <div className={styles.kgHerowebpart}>
        {/* 
        <div>{this.state.SiteTitle}</div>
        <div>{this.state.LoginName}</div> 
        */}
        {/* {this.state.items.map((i) =>    
          <div>{i}</div>
        )} */}

        <div className={styles.heroImage} style={this.state.bgStyle}>
          {/* {!this.state.loading ? (
            <Spinner
              label="Loading Image..."
              ariaLive="assertive"
              labelPosition="bottom"
            />
          ) : (
          <div>console.log</div>
          )} */}

          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              {!this.state.loading && (
                <Spinner
                  label="Loading Image..."
                  ariaLive="assertive"
                  labelPosition="bottom"
                />
              )}
              {!this.props.mainTitle ? (
                <h2>Lorem Ipsum</h2>
              ) : (
                <h2>{this.props.mainTitle}</h2>
              )}
            </div>

            <Pivot
              aria-label="Links of Large Tabs Pivot Example"
              linkFormat={PivotLinkFormat.tabs}
              linkSize={PivotLinkSize.normal}
            >
              <PivotItem headerText="All">
                <SearchBox
                  placeholder="Search Knowledge"
                  className={styles.heroSearchBox}
                  onChange={this.changeTerm}
                  onSearch={this.submit}
                ></SearchBox>
              </PivotItem>

              <PivotItem headerText="People">
                <SearchBox
                  placeholder="Search People"
                  className={styles.heroSearchBox}
                  // onChange={this.changeTerm}
                  // onSearch={this.submit}
                ></SearchBox>
              </PivotItem>
            </Pivot>
          </div>
        </div>

        <div className={styles.exploreSection}>
          EXPLORE:&nbsp;&nbsp;&nbsp;Theme&nbsp;&nbsp;|&nbsp;&nbsp;Practice
        </div>
      </div>
    );
  }
  /**
   * Search input handler.
   * @param searchQuery
   */
  private changeTerm(searchQuery: string): void {
    //console.log(searchQuery);
    this.setState({ searchQuery });
  }
  /**
   * Search button event handler.
   * @param event
   */
  private submit(event: any): void {
    // https://github.com/VelinGeorgiev/spfx-react-search-box-webpart
    // if a page is specified in the search page results url property
    // then use it instead of the enterprise search results page.

    if (this.props.searchResultsPageUrl) {
      this.ResultsPageUri = this.props.searchResultsPageUrl;
    } else {
      // defaults to the enterprise search results page.
      //this.ResultsPageUri = `${this.props.tenantUrl}/search/Pages/results.aspx`;
      this.ResultsPageUri = `${this.props.tenantUrl}/_layouts/15/search.aspx`;
    }
    // this.ResultsPageUri = `https://lendleasetestenv.sharepoint.com/sites/pkg-dev/_layouts/15/search.aspx/siteall?q=${this.state.searchQuery}`;
    // append the query string to the url.
    this.ResultsPageUri += `?k=${this.state.searchQuery}`;
    this._redirect();
  }

  /**
   * Redirects to the results page.
   * windows.location wrapper so stub can be created in the unit tests.
   */
  private _redirect(): void {
    window.location = this.ResultsPageUri;
    console.log(this.ResultsPageUri);
  }
}
