import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import { User } from "../models/user";


const GOOGLE_CALLBACK_URL = "http://localhost:3000/auth/google/callback";

passport.use(
  new GoogleStrategy.Strategy(
    {
      clientID:
        "384332751954-itnhdjhi23r195r45t4jlgbpvstdq6el.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    },
    async (
      req: any,
      accessToken: string,
      profile: any,
      cb: any
    ) => {
      console.log("auth completed");
      const defaultUser = {
        fullName: `${profile.name.givenName} ${profile.name.familyName}`,
        email: profile.emails[0].value,
        picture: profile.photos[0].value,
        googleId: profile.id,
      };
      let user: any;

      user = await User.findOne({ googleId: profile.id }).catch((err: any) => {
        console.log("Error signing up", err);
        return cb(err, null);
      });

      if (!user) {
        user = await User.create(defaultUser).catch((err: any) => {
          console.log("Error signing up", err);
          return cb(err, null);
        });
      }

      if (user) return cb(null, user.googleId);

      if (user) {
        const tokenInfo = {
          token: accessToken,
          userId: user.googleId,
          expiresIn: 3600, // set the token expiration time in seconds
        };
        return cb(null, tokenInfo);
      }
      if (user) {
        // include a line that updates the user object with the token
        user.token = accessToken;
        user.expiresIn = 3600; // set the token expiration time in seconds
        user.save(); // save the updated user object
        return cb(null, user);
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  console.log("Serializing user:", user);
  cb(null, user);
});

passport.deserializeUser(async (id, cb) => {
  const user = await User.findOne({ googleId: id }).catch((err) => {
    console.log("Error deserializing", err);
    cb(err, null);
  });

  console.log("DeSerialized user", user);

  if (user) cb(null, user);
});
