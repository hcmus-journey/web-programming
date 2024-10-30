import { PageURL, HATShopInfo } from '../constant/constants.js';

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

    const hatshopEmails = document.querySelectorAll('.hatshopEmail');
    if (hatshopEmails) {
        hatshopEmails.forEach(email => {
            email.href = `mailto:${HATShopInfo.HATSHOP_EMAIL}`;
            email.textContent = HATShopInfo.HATSHOP_EMAIL;
        });
    }

    const hatshopPhoneNumbers = document.querySelectorAll('.hatshopPhoneNumber');
    if (hatshopPhoneNumbers) {
        hatshopPhoneNumbers.forEach(phone => {
            phone.textContent = HATShopInfo.HATSHOP_PHONE_NUMBER;
        });
    }

    const hatshopAddresses = document.querySelectorAll('.hatshopAddress');
    if (hatshopAddresses) {
        hatshopAddresses.forEach(address => {
            address.textContent = HATShopInfo.HATSHOP_ADDRESS;
        });
    }

    const hatshopFanpages = document.querySelectorAll('.hatshopFanpage');
    if (hatshopFanpages) {
        hatshopFanpages.forEach(fanpage => {
            fanpage.href = HATShopInfo.HATSHOP_FANPAGE;
            fanpage.textContent = HATShopInfo.HATSHOP_FANPAGE;
        });
    }

    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    menuToggle.addEventListener('click', function (event) {
        mobileMenu.classList.toggle('hidden');
        event.stopPropagation();
    });


    document.addEventListener('click', function (event) {
        if (!menuToggle.contains(event.target) && !mobileMenu.contains(event.target)) {
            mobileMenu.classList.add('hidden');
        }
    });

});
