import {Page} from "@playwright/test"
import { BaseFunctions } from "./../base/base_functions"
import { ProductPage } from "./ProductPage"


export class SearchResultsPage extends BaseFunctions{    
    constructor(page: Page){
        super(page)
    }
    
    SEARCH_RESULTS = () => this.page.locator(".with-campaign-view")
    OVERLAY = () => this.page.locator(".overlay")
    PRODUCT_TITLE_FIRST_LINE = () => this.page.locator(".prdct-desc-cntnr-name")
    PRODUCT_TITLE_SECOND_LINE = () => this.page.locator(".product-desc-sub-text")
    SEARCH_TITLE = () => this.page.locator('.dscrptn.dscrptn-V2').getByRole("heading")
    
    product_index = 4
    
    async get_search_result_title(){
        return await this.get_item_text(this.SEARCH_TITLE)

    }

    async click_chosen_element(){
        await this.click_element(this.SEARCH_RESULTS, this.product_index)
        return new ProductPage(this.page)        
    }

    async get_product_attribute_title(){
        const first_line = await this.get_item_attribute(this.PRODUCT_TITLE_FIRST_LINE, this.product_index, "title") ?? ""
        const second_line = await this.get_item_attribute(this.PRODUCT_TITLE_SECOND_LINE, this.product_index, "title") ?? ""
        const product_title = first_line +" "+ second_line
        return product_title
    }



}