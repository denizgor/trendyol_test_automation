import { Page } from "@playwright/test"
import { BaseFunctions } from "../base/base_functions.ts"
import { CartPage } from "./CartPage.ts"

export class ProductPage extends BaseFunctions {
      constructor(page: Page) {
        super(page)
    }

    PRODUCT_TITLE = () => this.page.locator("h1.pr-new-br span:last-child").nth(0)
    PRODUCT_SIZE = () => this.page.locator(".sp-itm").getByText('S', { exact: true })
    PRODUCT_PRICE = () => this.page.locator(".prc-dsc").nth(0)
    CART_COUNTER = () => this.page.locator(".basket-item-count-container")
    ADD_TO_CART_BTN = () => this.page.getByText("Sepete Ekle")



    async get_product_name() {
        const product_name = await this.get_item_text(this.PRODUCT_TITLE)
        return product_name
    }

    async select_product_size() {
        await this.click_element(this.PRODUCT_SIZE)
    }

    async click_add_to_cart_btn() {
        await this.click_element(this.ADD_TO_CART_BTN)
    }

    async get_cart_count() {
        const count = await this.get_item_text(this.CART_COUNTER) as string
        const cart_count = parseInt(count, 10)

        return cart_count
    }

    async get_product_page_price() {
        return await this.get_product_price(this.PRODUCT_PRICE)
    }

    async click_cart_button() {
        await this.click_element(this.CART_COUNTER)

        return new CartPage(this.page)
    }

}    