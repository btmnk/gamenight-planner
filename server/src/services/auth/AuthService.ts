import cookie from "cookie";
import { jwtVerify, SignJWT } from "jose";
import { addDays } from "date-fns";

import { JWTSessionPayload } from "../../domain/auth/SessionJwtToken.js";
import { Config } from "../../Config.js";

const AUTH_COOKIE_NAME = "lb_tok";

export class AuthServiceError extends Error {
  public readonly code: string;
  constructor(code: "invalid_auth_cookie") {
    super(code);
    this.code = code;
  }
}

export const AuthService = {
  async verifyCookieToken(cookieContent: string | undefined): Promise<JWTSessionPayload> {
    if (!cookieContent) throw new AuthServiceError("invalid_auth_cookie");

    const authTokenCookie = cookie.parse(cookieContent)[AUTH_COOKIE_NAME];
    if (!authTokenCookie) throw new AuthServiceError("invalid_auth_cookie");

    const secret = new TextEncoder().encode(Config.CLIENT_SECRET);
    const verifyResult = await jwtVerify(authTokenCookie, secret);
    const token = verifyResult.payload as JWTSessionPayload;

    return token;
  },

  async createCookie(payload: JWTSessionPayload) {
    const secret = new TextEncoder().encode(Config.CLIENT_SECRET);
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .sign(secret);

    const expirationDate = addDays(new Date(), 7);

    const tokenCookie = cookie.serialize(AUTH_COOKIE_NAME, token, {
      path: "/",
      httpOnly: !Config.DEVELOPMENT,
      secure: !Config.DEVELOPMENT,
      expires: expirationDate,
    });

    return tokenCookie;
  },

  createLogoutCookie() {
    return cookie.serialize(AUTH_COOKIE_NAME, "", {
      path: "/",
      httpOnly: !Config.DEVELOPMENT,
      secure: !Config.DEVELOPMENT,
      expires: new Date(),
    });
  },
};
