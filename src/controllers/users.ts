import express from "express";
import { getUsers, deleteUserById, getUserById } from "../db/users";

export const getAllUsers = async (req: express.Request, res: express.Response) => {
  try {
    const users = await getUsers();
    return res.sendStatus(200).json(users);
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
};

export const deleteUser = async (req: express.Request, res: express.Response) => {
  try {
    // we dont need to check authentication because we are using middleware to check auth here
    const { id } = req.params;
    const deletedUser = await deleteUserById(id);
    return res.json(deletedUser);
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
};

export const updateUser = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const { username } = req.body;
    if (!username || !id) return res.sendStatus(400);

    const user = await getUserById(id);
    user.username = username;
    await user.save();

    return res.sendStatus(200).json(user).end();
  } catch (e) {
    console.log(e);
    return res.status(400);
  }
};
