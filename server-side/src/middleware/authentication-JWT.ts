// import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { UserModel } from "../database/users";
import passport from 'passport'
import dotenv from "dotenv";

dotenv.config();

// JWT configuration

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: process.env.SECRET_KEY || "default_secret_key",
};

passport.use(
  new Strategy(options, async (jwtPayload, done) => {
    try {
      const user = await UserModel.findById(jwtPayload.data._id);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

export const authenticateJwt = passport.authenticate("jwt", { session: false });
