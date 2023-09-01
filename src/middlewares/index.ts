import express from "express";
import { get, merge } from "lodash";

import { getUserBySessionToken } from "../db/users";

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, "identity._id") as string;

    if (!currentUserId) return res.sendStatus(404);
    if (currentUserId.toString() !== id) return res.status(404);
    next();
  } catch (e) {
    console.log(e);
    res.status(400);
  }
};

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
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
