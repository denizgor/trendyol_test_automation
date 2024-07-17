import { Page } from "@playwright/test"
import { BaseFunctions } from "./../base/base_functions.ts"
import { SearchResultsPage } from "./SearchResultsPage"


export default class HomePage extends BaseFunctions {

    constructor(page: Page) {
        super(page)
    }

    SEARCH_BAR = () => this.page.getByTestId("suggestion");
    ACCEPT_COOKIES_BTN = () => this.page.getByText("KABUL ET");



    async accept_cookies() {
        await this.click_element(this.ACCEPT_COOKIES_BTN);
    }

    async search_for_a_product(search_term) {
        await this.input_text(this.SEARCH_BAR, search_term);
        return new SearchResultsPage(this.page)
    }

}