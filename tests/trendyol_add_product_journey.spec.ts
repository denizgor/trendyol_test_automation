import { test, expect } from "@playwright/test"
import HomePage from "../pages/HomePage.ts"
import { ProductPage } from "../pages/ProductPage.ts"
import exp from "constants"
import { CartPage } from "../pages/CartPage.ts"

test("trendyol add product journey", async ({ page }) => {
    const homePage = new HomePage(page)

    const search_term = "tshirt"


    await page.goto("https://www.trendyol.com/")
    await homePage.accept_cookies()
    const searchResultsPage = await homePage.search_for_a_product(search_term)
    await homePage.SEARCH_BAR().press("Enter")
    await page.waitForTimeout(3000)
    await page.reload()

    expect(searchResultsPage.page.url()).toContain(`/sr?q=${search_term}`)
    expect(await searchResultsPage.get_search_result_title()).toEqual(search_term)
    const searched_product_name = await searchResultsPage.get_product_attribute_title()


    // Open clicked product in a new tab
    const [newTab] = await Promise.all([
        page.context().waitForEvent('page'),
        searchResultsPage.click_chosen_element()
    ]);

    await newTab.bringToFront()
    const productPage = new ProductPage(newTab)
    await page.reload()

    const selected_product_name = await productPage.get_product_name()

    expect(searched_product_name).toEqual(selected_product_name)

    await productPage.select_product_size()
    await productPage.click_add_to_cart_btn()
    await page.waitForTimeout(1000)

    expect(productPage.CART_COUNTER()).toBeVisible()
    expect(await productPage.get_cart_count()).toBeGreaterThan(0)

    await page.waitForTimeout(1000)
    const cartPage = await productPage.click_cart_button()

    expect(cartPage.page.url()).toContain(`/sepet`)
    const added_product_name = await cartPage.get_product_name_wo_brand()

    expect(added_product_name).toEqual(selected_product_name)

})

