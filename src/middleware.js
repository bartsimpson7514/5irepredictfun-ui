/* eslint-disable no-console */
import { NextResponse } from "next/server";

export const config = {
  matcher: [
    "/",
    "/stocks",
    "/commodities",
    "/profile",
    "/leaderboard",
    "/quest",
    "/vaults",
  ],
};

export default function middleware(request) {
  // Construct the url
  const notAllowed = [];
  const country = request.headers.get("x-vercel-ip-country")?.toUpperCase();
  if (notAllowed.includes(country)) {
    return NextResponse.redirect(new URL("/restricted", request.url));
  }

  return NextResponse.next();
}
