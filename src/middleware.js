// middleware.ts

import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./auth";

// utilise le middleware pour vérifier l'autentification
export function middleware(req) {
  const token = req.cookies.get("access_token");

  if (!token) {
    return NextResponse.redirect(
      new URL("/login", req.url)
    );
  }

  const user = verifyToken(token);
  if (!token) {
    return NextResponse.redirect(
      new URL("/login", req.url)
    );
  }

  return NextResponse.next();
}

// routes qui seront controlées par le middleware
export const config = {
  matcher: [
    "/account/:path*",
    "/dashboard/:path*",
    "/projects/:path*",
  ],
};