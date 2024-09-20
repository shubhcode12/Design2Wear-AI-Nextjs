import { NextResponse } from "next/server";

export async function GET() {
  const PROJECT_MODE = process.env.PROJECT_MODE;
  console.log(PROJECT_MODE);
  return NextResponse.json({ message: "Hello World" });
}
