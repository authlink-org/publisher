import {
  authMiddleware,
  redirectToSignIn,
  withClerkMiddleware,
} from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
import ClerkExists from "./actions/profile/clerk-exists";
import CreateProfile from "./actions/profile/create-profile";

import { generateFromEmail } from "unique-username-generator";

import { NextRequest, NextFetchEvent, NextResponse } from "next/server";

import requestIp from "request-ip";

export default authMiddleware({
  beforeAuth: (req, evt) => {},
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
