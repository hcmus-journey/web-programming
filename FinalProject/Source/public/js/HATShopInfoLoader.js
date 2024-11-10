import HATShopInfo from '/constants/HATShopInfo.js';

document.addEventListener('DOMContentLoaded', () => {
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
