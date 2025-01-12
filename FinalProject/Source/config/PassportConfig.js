import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt';
import UserService from '../services/UserService.js'; 
import { User } from "../models/User.js";


class PassportConfig {
    constructor(app) {
        this.userService = new UserService(User);
        if (app) {
            app.use(passport.initialize());
            app.use(passport.session());
        }

        passport.use(
            new LocalStrategy(
            { usernameField: 'username', passwordField: 'password' },
            async (username, password, done) => {
                try {
                const user = await this.userService.getUserByUsername(username);
                if (!user) {
                    return done(null, false, { message: 'Email chưa được đăng ký' });
                }
        
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    return done(null, false, { message: 'Sai mật khẩu' });
                }

                if (user.status == 'BANNED') {
                    return done(null, false, {message: 'Tài khoản đã bị cấm'});
                }
        
                return done(null, user);
                } catch (err) {
                return done(err);
                }
            }
            )
        );

        passport.serializeUser((user, done) => {
            done(null, user.user_id);
        });

        passport.deserializeUser(async (id, done) => {
        try {
            const user = await this.userService.getUserById(id); 
            done(null, user);
        } catch (err) {
            done(err, null);
        }
        });
    }

    verifyRole(allowedRoles) {
        return (req, res, next) => {
            if (req.isAuthenticated()) {
                const userRole = req.user.user_role; // Assuming role is stored in req.user

                if (!allowedRoles.includes(userRole)) {
                    return res.redirect('/');
                }
            }

            next(); // Proceed if the role is valid
        };
    }
}

export default PassportConfig;
