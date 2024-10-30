import PageURL from '../constant/PageURL.js';

document.addEventListener('DOMContentLoaded', () => {
    // Create a map to associate href values with their corresponding PAGE_URLs
    const hrefMap = {
        'CART_PAGE_URL': PageURL.CART_PAGE_URL,
        'CHECKOUT_PAGE_URL': PageURL.CHECKOUT_PAGE_URL,
        'ABOUT_US_PAGE_URL': PageURL.ABOUT_US_PAGE_URL,
        'CONTACT_PAGE_URL': PageURL.CONTACT_PAGE_URL,
        'LOGIN_PAGE_URL': PageURL.LOGIN_PAGE_URL,
        'REGISTER_PAGE_URL': PageURL.REGISTER_PAGE_URL,
        'ACCOUNT_PAGE_URL': PageURL.ACCOUNT_PAGE_URL,
        'SHOP_PAGE_URL': PageURL.SHOP_PAGE_URL,
        'PROFILE_PAGE_URL': PageURL.PROFILE_PAGE_URL,
        'HOME_PAGE_URL': PageURL.HOME_PAGE_URL,
        'PRODUCT_PAGE_URL': PageURL.PRODUCT_PAGE_URL,
        'PRIVACY_PAGE_URL': PageURL.PRIVACY_PAGE_URL,
    };

    // Select all <a> tags in the document that have an href attribute
    const links = document.querySelectorAll('a[href]');
    
    // Loop through each <a> tag
    links.forEach(link => {
        const currentHref = link.getAttribute('href');
        
        // Check if currentHref exists in the hrefMap
        if (hrefMap[currentHref]) {
            link.href = hrefMap[currentHref]; // Update the href attribute with the new URL
        }
    });
});
