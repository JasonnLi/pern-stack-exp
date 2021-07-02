import express, { NextFunction, Request, Response } from "express";
import bodyParser from 'body-parser';
import api from "./api";

export class Server {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.configure();
  }

  private configure() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
    // Serve static files
    // app.use("/static", express.static("public"));

    // Mount api router
    this.app.use("/api", api);

    // Error handler
    this.app.use(
      (err: any, req: Request, res: Response, next: NextFunction) => {
        console.log("Error handler triggered: ", err);
        next();
      }
    );
  }

  async listen() {
    return new Promise((resolve, reject) => {
      try {
        // Begin listning
        const port = process.env.PORT || 3000;
        this.app.listen(port, () => {
          console.log(`Server listening on port ${port}`);
          resolve();
        });
      } catch (err) {
        reject(err);
      }
    });
  };
};
