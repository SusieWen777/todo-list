import { ConnectDB } from "@/lib/config/db";
import TodoModel from "@/lib/models/TodoModel";
import { NextResponse } from "next/server";

const LoadDB = async () => {
  await ConnectDB();
};

LoadDB();

export async function GET(request) {
  const todos = await TodoModel.find({});
  return NextResponse.json({ success: true, todos });
}

export async function POST(request) {
  const { title, description } = await request.json();
  await TodoModel.create({ title, description });
  return NextResponse.json({ success: true, msg: "Todo Created" });
}

export async function DELETE(request) {
  const mongoId = await request.nextUrl.searchParams.get("mongoId");
  await TodoModel.findByIdAndDelete(mongoId);
  return NextResponse.json({ success: true, msg: "Todo deleted" });
}

export async function PATCH(request) {
  const mongoId = await request.nextUrl.searchParams.get("mongoId");
  await TodoModel.findByIdAndUpdate(mongoId, { $set: { isCompleted: true } });
  return NextResponse.json({ success: true, msg: "Todo completed" });
}
