import passport from "passport";
import dotenv from "dotenv";
import { Strategy } from "passport-local";
import * as PassportGithub from "passport-github2";
import { createUser, getUserByEmail } from "../dao/user.mongo-dao.js";
import { login } from "../dao/auth.mongo-dao.js";

dotenv.config();

const formatUser = (user) => {
  return {
    id: user._id,
    email: user.email,
    firstName: user.firstName,
    middleName: user.middleName,
    lastName: user.lastName,
    gender: user.gender,
    age: user.age,
    role: user.isAdmin ? "admin" : "user",
  };
};

const getDefaultDateOfBirth = () => {
  const today = new Date(Date.now());
  const past = new Date(
    today.getFullYear() - 18,
    today.getMonth() + 1,
    today.getDate()
  );

  const monthString = new Intl.NumberFormat("es-MX", {
    minimumIntegerDigits: 2,
  }).format(past.getMonth());

  const dateString = new Intl.NumberFormat("es-MX", {
    minimumIntegerDigits: 2,
  }).format(past.getDate());

  return `${past.getFullYear()}-${monthString}-${dateString}`;
};

passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser(async (email, done) => {
  try {
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      done(null, formatUser(existingUser));
    }

    done(new Error("User not found"), null);
  } catch (error) {
    done(new Error(err.message), null);
  }
});

passport.use(
  "signup",
  new Strategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const newUser = await createUser(req.body);

        return done(null, formatUser(newUser));
      } catch (error) {
        return done(new Error(error.message), null);
      }
    }
  )
);

passport.use(
  "login",
  new Strategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        if (await login(email, password)) {
          const user = formatUser(await getUserByEmail(email));

          return done(null, user);
        }

        return done(new Error("User not found"), null);
      } catch (error) {
        return done(new Error(error.message), null);
      }
    }
  )
);

passport.use(
  "github",
  new PassportGithub.Strategy(
    {
      clientID: process.env.GITHUB_APP_CLIENT_ID,
      clientSecret: process.env.GITHUB_APP_CLIENT_SECRET,
      callbackURL: `http://localhost:${
        process.env.PORT || 8080
      }/api/github/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const { node_id, email, name } = profile._json;

        const userAlreadyExists = await getUserByEmail(email);

        if (!userAlreadyExists) {
          const userNames = name.split(" ");

          const defaultDateOfBirth = getDefaultDateOfBirth();

          const userData = {
            email: email,
            firstName: userNames[0],
            lastName: userNames[1],
            gender: "no especificado",
            dateOfBirth: defaultDateOfBirth,
            password: node_id,
          };

          const newUser = formatUser(await createUser(userData));

          return done(null, newUser);
        } else {
          const existingUser = formatUser(userAlreadyExists);
          return done(null, existingUser);
        }
      } catch (error) {
        return done(new Error(error.message), false);
      }
    }
  )
);

export default passport;
