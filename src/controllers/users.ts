import express from "express";
import { getUsers, deleteUserById } from "../db/users";

export const getAllUsers = async (req: express.Request, res: express.Response) => {
  try {
    const users = await getUsers();
    return res.status(200).json(users);
  } catch (e) {
    console.log(e);
    return res.status(400);
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
    return res.status(400);
  }
};
