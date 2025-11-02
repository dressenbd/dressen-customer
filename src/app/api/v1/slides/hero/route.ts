import { NextResponse } from "next/server";

const slides = [
  { _id: "s1", imageUrl: "/Footwear.png",  alt: "Footwear Promo" },
  { _id: "s2", imageUrl: "/mens.png",      alt: "Mens Collection" },
  { _id: "s3", imageUrl: "/men-model.png", alt: "New Arrival" },
];

export async function GET() {
  return NextResponse.json({ data: slides }, { status: 200 });
}
