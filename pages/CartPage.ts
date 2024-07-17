import { Page } from "@playwright/test"
import { BaseFunctions } from "./../base/base_functions"


export class CartPage extends BaseFunctions {
    constructor(page: Page) {
        super(page)
    }

    PRODUCT_TITLE = () => this.page.locator(".pb-item[title]")
    BRAND_NAME = () => this.PRODUCT_TITLE().locator('span');

    async get_product_name_wo_brand(): Promise<string> {
        return this.get_product_name_without_brand(this.PRODUCT_TITLE, this.BRAND_NAME)
    }

}