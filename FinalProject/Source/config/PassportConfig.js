import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt';
import UserService from '../services/UserService.js'; 
import { User } from "../models/User.js";


class PassportConfig {
    constructor(app) {
        this.userService = new UserService(User);
        app.use(passport.initialize());
        app.use(passport.session());

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
}

export default PassportConfig;
