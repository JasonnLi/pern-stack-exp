import { Request, Response, Router } from "express";
import express from "express";
import * as bcrypt from "bcrypt";
import { pool } from "../Database";
import { hashPassword, validatePassword } from "../utils/encrypt";
import jwtGenerator from "../utils/jwtGenerator";

// handling error message
const HTTP_INTERNAL_SERVER_ERROR = 500;
const HTTP_NOT_FOUND = 404;
const HTTP_BAD_REQUEST = 400;

export class UserController {
  private router: Router;

  mount(parentRouter: Router) {
    this.router = express.Router();
    this.router.post("/register", this.register);
    this.router.post("/login", this.login);
    parentRouter.use("/users", this.router);
  }

  private async register(req: Request, res: Response) {
    const email = req.body.user_email.toLowerCase();
    const name = req.body.user_name;
    const password = req.body.user_password;

    try {
      const user = await pool.query(
        "SELECT * FROM users WHERE user_email = $1",
        [email]
      );

      if (user.rows.length > 0) {
        return res.status(401).json("User already exist!");
      }

      // const bcryptPassword = await hashPassword(password)
      const salt = await bcrypt.genSalt(10);
      const bcryptPassword = await bcrypt.hash(password, salt);

      let newUser = await pool.query(
        "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
        [name, email, bcryptPassword]
      );

      const jwtToken = jwtGenerator(newUser.rows[0].user_id);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.send({
        success: true,
        token: "Bearer " + jwtToken,
        status: "You are successfully register!",
      });
      return res.json({ jwtToken });
    } catch (err) {
      res.status(HTTP_INTERNAL_SERVER_ERROR).send({ message: err });
    }
  }

  private async login(req: Request, res: Response) {
    const email = req.body.user_email.toLowerCase();
    const password = req.body.user_password;

    try {
      const user = await pool.query(
        "SELECT * FROM users WHERE user_email = $1",
        [email]
      );

      if (user.rows.length === 0) {
        return res.status(401).json("Invalid Credential");
      }

      validatePassword(
        password,
        user.rows[0].user_password,
        async (err: any, isMatch: boolean) => {
          if (err) {
            throw err;
          } else if (isMatch) {
            const jwtToken = jwtGenerator(user.rows[0].user_id);
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.send({
              success: true,
              token: "Bearer " + jwtToken,
              status: "You are successfully login!",
            });
          } else {
            res.statusCode = 400;
            res.json({ passwordincorrect: "Password incorrect" });
          }
        }
      );
    } catch (err) {
      res.status(HTTP_BAD_REQUEST).send({ message: err });
    }
  }
}
