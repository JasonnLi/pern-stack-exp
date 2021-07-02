import * as jwt from "jsonwebtoken";
import { keys } from "./jwtConfig";

export default function jwtGenerator (user_id: string) {
    const payload = {
        user: {
          id: user_id
        }
      };
      return jwt.sign(payload, keys.secretOrKey, { expiresIn: "1h" });
};
