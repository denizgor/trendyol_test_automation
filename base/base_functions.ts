import { Page, Locator } from "@playwright/test"

export class BaseFunctions {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * A description of the entire function.
     *
     * @param {() => Locator} locator - The function to locate the element
     * @param {number} [index=0] - The index of the element to interact with
     * @return {Promise<void>} Promise that resolves when the element is clicked
     */
    async click_element(locator: () => Locator, index: number = 0): Promise<void> {
        try {
            await locator().nth(index).waitFor({ state: 'visible' });
            await locator().nth(index).click();
        } catch (error) {
            console.error(`Failed to click element: ${error}`);
            throw error;
        }
    }

    /**
     * Asynchronously inputs text into a specified locator after waiting for it to become visible.
     *
     * @param {() => Locator} locator - A function that returns a Locator object representing the element to fill.
     * @param {string} text - The text to fill into the locator.
     * @return {Promise<void>} A Promise that resolves when the text has been filled into the locator.
     * @throws {Error} If the locator is not visible or if there is an error filling the locator.
     */
    async input_text(locator, text: string): Promise<void> {
        try {
            await locator().waitFor({ state: 'visible' });
            await locator().fill(text);
        } catch (error) {
            console.error(`Failed to input text: ${error}`);
            throw error;
        }
    }

    /**
     * Retrieves the value of a specified attribute from an element.
     *
     * @param {() => Locator} locator - A function that returns a Locator object representing the element.
     * @param {number} [index=0] - The index of the element to interact with.
     * @param {string} attributeName - The name of the attribute to retrieve.
     * @return {Promise<string | null>} A Promise that resolves to the value of the specified attribute, or null if the attribute is not found.
     * @throws {Error} If there is an error retrieving the attribute.
     */
    async get_item_attribute(locator: () => Locator, index: number = 0, attributeName: string): Promise<string | null> {
        try {
            await locator().nth(index).waitFor();
            return await locator().nth(index).getAttribute(attributeName);
        } catch (error) {
            console.error(`Failed to get attribute: ${error}`);
            throw error;
        }

    }

    /**
     * Gets the text content of an element.
     *
     * @param {() => Locator} locator - A function that returns a Locator object representing the element to get text from.
     * @return {Promise<string>} Promise that resolves with the text of the element or an empty string if no text found.
     */
    async get_item_text(locator: () => Locator): Promise<string | null> {
  
        try {
            await locator().waitFor(/*{ state: 'visible' }*/);
            const text = await locator().textContent();
            return text ? text.trim() : "";
        } catch (error) {
            console.error(`Failed to get text: ${error}`);
            throw error;
        }
    }
    

/**
     * Gets the product name by removing the brand name from the full text.
     * @param productTitleLocator Function that returns a Locator for the product title element
     * @param brandLocator Function that returns a Locator for the brand name element within the product title
     */
async get_product_name_without_brand(productTitleLocator: () => Locator, brandLocator: () => Locator): Promise<string> {
    try {
        await productTitleLocator().waitFor({ state: 'visible' });
        const fullText = await this.get_item_text(productTitleLocator);
        const brandName = await this.get_item_text(brandLocator);
        if (fullText !== null && brandName !== null) {
            return fullText.replace(brandName, '').trim();
        } else {
            return fullText !== null ? fullText.trim() : "";
        }
    } catch (error) {
        console.error(`Failed to get product name: ${error}`);
        throw error;
    }
}

/**
 * Retrieves the product price using the provided locator.
 *
 * @param {() => Locator} locator - A function to locate the element containing the price.
 * @return {Promise<number>} Promise that resolves with the product price as a number.
 */

async get_product_price(locator: () => Locator): Promise<number> {
    try {
        const price = await this.get_item_text(locator);
        if (price === null) {
            throw new Error('Failed to get product price: element not found or empty');
        }
        const numericPrice = price.replace(/[^\d,]/g, '').replace(',', '.');
        return parseFloat(numericPrice);
    } catch (error) {
        console.error(`Failed to get product price: ${error}`);
        throw error;
    }

}

}