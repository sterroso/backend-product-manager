// Imports
import pkg from "connect-mongo";
import mongoose from "mongoose";

const sessionStore = pkg.getSession({ mongooseConnection: mongoose.connection });

export const getCurrentSession = async (sessionID) => {
  try {
    const session = await sessionStore.get(sessionID);

    return session;
  } catch (error) {
    throw new Error(`Error getting current session: ${error.message}`);
  }
};
