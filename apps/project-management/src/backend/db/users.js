import { v4 as uuid } from "uuid";

/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Adarsh",
    lastName: "Balika",
    email: "adarshbalika@gmail.com",
    password: "adarshBalika123",
  },
  {
    _id: uuid(),
    firstName: "Dhruvi",
    lastName: "Shah",
    email: "dhruvishah@gmail.com",
    password: "dhruviShah123",
  },
  {
    _id: uuid(),
    firstName: "Shubham",
    lastName: "Soni",
    email: "shubhamsoni@gmail.com",
    password: "shubhamSoni123",
  },
];
