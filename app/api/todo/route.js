import { connectDb } from "@/lib/config/Db";
import TodoModel from "@/lib/models/TodoModel";
import { NextResponse } from "next/server";

const LoadDb = async() => {
    await connectDb();
}

LoadDb()

export async function GET(request){

  const todos = await TodoModel.find({})
  return NextResponse.json({todos:todos})
}

export async function POST(request){
    const {title, description} = await request.json()
    await TodoModel.create({
        title,
        description
    })
  return NextResponse.json({msg: "Todo created"})
}

export async function DELETE(request){
  const { searchParams } = new URL(request.url);
  const mongoID = searchParams.get('mongoId');
  await TodoModel.findByIdAndDelete(mongoID);
  return NextResponse.json({msg: "Todo Deleted"});
}

export async function PUT(request){
  const { searchParams } = new URL(request.url);
  const mongoID = searchParams.get('mongoId');
  await TodoModel.findByIdAndUpdate(mongoID, {
    $set: {
      isCompleted: true
    }
  });
  return NextResponse.json({msg: "Todo Updated"});
}

