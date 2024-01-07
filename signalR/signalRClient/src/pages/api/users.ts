import { NextApiRequest, NextApiResponse } from "next";

const initialUsers = [
  {
    id: 1092313120,
    firstName: "Nikola",
    lastName: "Davinic",
    age: 23,
    occupation: "Frontend",
    status: "active",
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse){
    res.status(200).json(initialUsers);
}