import pagePath from "../constants/PagePath.js";

class CartController {
    showCartPage(req, res) {
      if (req.isAuthenticated()) {
        res.render(pagePath.CART_PAGE_PATH, {isLoggedIn: true});
      }
      else {
        res.redirect('/login');
      }
    }
    
      showCheckoutPage(req, res) {
        if (req.isAuthenticated()) {
          res.render(pagePath.CHECKOUT_PAGE_PATH, {isLoggedIn: true});
        }
        else {
          res.redirect('/login');
        }
      }   
}

export default  new CartController();