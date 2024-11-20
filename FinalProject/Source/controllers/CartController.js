import PagePath from "../constants/PagePath.js";

class CartController {
    showCartPage(req, res) {
      if (req.isAuthenticated()) {
        res.render(PagePath.CART_PAGE_PATH, {isLoggedIn: true});
      }
      else {
        res.redirect('/login');
      }
    }
    
      showCheckoutPage(req, res) {
        if (req.isAuthenticated()) {
          res.render(PagePath.CHECKOUT_PAGE_PATH, {isLoggedIn: true});
        }
        else {
          res.redirect('/login');
        }
      }   
}

export default  new CartController();