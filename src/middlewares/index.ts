import express from "express";
import { get, merge } from "lodash";

import { getUserBySessionToken } from "db/users";

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies["SESSION_TOKEN"];
    if (!sessionToken) return res.status(404);

    const existingUser = await getUserBySessionToken(sessionToken);
    if (!existingUser) return res.status(404);

    merge(req, { indentity: existingUser });
    next();
  } catch (e) {
    console.log(e);
    return res.status(400);
  }
};
