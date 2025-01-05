import PagePath from "../constants/PagePath.js";
import UserService from "../services/UserService.js";
import { User } from "../models/User.js";
import AdminService from "../services/AdminService.js";
import ejs from "ejs";

class AdminController {
  constructor() {
    this.userService = new UserService(User);
    this.showProfilePage = this.showProfilePage.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.showUserListPage = this.showUserListPage.bind(this);
    this.actionOnUser = this.actionOnUser.bind(this);
  }
  async showProfilePage(req, res) {
    if (!req.isAuthenticated()) {
      res.redirect('/login');
      return;
    }
    const user = req.user;
    res.render(PagePath.ADMIN_PAGE_PATH, {
      user: user, 
      isLoggedIn: true,
      successMessage: req.flash('success'),
      errorMessage: req.flash('error'),
    });
  }

  async showUserListPage(req, res) {
    if (!req.isAuthenticated()) {
      res.redirect('/login');
      return;
    }

    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const query = req.query.query || "";
    const sort = req.query.sort || "";
  
    try {
      const users = await AdminService.searchUsers(query, sort);
      const filteredUsers = users;
  
      const totalFilteredPages = Math.ceil(filteredUsers.length / limit);
      const paginatedUsers = filteredUsers.slice((page - 1) * limit, page * limit);
  
      if (Object.keys(req.query).length !== 0) {
        const html = await ejs.renderFile("views/pages/admin/userList.ejs", { users: paginatedUsers, user: req.user });
        const pagination = await ejs.renderFile("views/layouts/pagination.ejs", { totalPages: totalFilteredPages, currentPage: page });
        return res.json({ html, pagination });
      }

      const user = req.user;
      res.render(PagePath.USER_LIST_PAGE_PATH, {
        user,
        users: paginatedUsers,
        totalPages: totalFilteredPages,
        currentPage: page,
        selectedSort: sort,
        isLoggedIn: true,
        selectedFilters: {},
      });

    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).send("Error loading products");
    }
  }
  
  async updateProfile(req, res) {
    if (req.isAuthenticated()) {
      const userData = {
        name: req.body.name,
      };
      try {
        this.userService.updateUser(
          req.user.user_id,
          userData
        );
      res.json({ success: true, message: "Profile updated!" });

      } catch (error) {
        res.json({ success: false, message: error.message });
      }
    } else {
      res.redirect('/');
    }
  }

  async actionOnUser(req, res) {
    if (req.isAuthenticated()) {
      const userActionData = {
        status: req.body.status
      };

      try {
        this.userService.updateUser(
          req.body.id,
          userActionData
        );
        const action = req.body.status == 'ACTIVE' ? 'unbanned' : 'banned';

        res.json({ success: true, message: "User " + action + " successfully!" });

      } catch (error) {
        res.json({ success: false, message: error.message });
      }
    } else {
      res.redirect('/');
    }
  }
}

export default  new AdminController();