import { QueryResult } from '@vercel/postgres';
import { NextRequest,NextResponse } from 'next/server'; 
import {Todo,NewTodo,db,todoTable} from "../../../lib/drizzle"
import { sql } from '@vercel/postgres';

export async function GET(request:NextRequest){
  
  try {
    await sql`Create table if not exists todos(id serial,Task varchar(255))`
    const res = await db.select().from(todoTable)

    return NextResponse.json({data:res})
  } catch (error) {
    console.log("get catch")
    console.log((error as {message:string}).message)
    return NextResponse.json({message:"Something Went Wrong"})
  }
}

export async function POST(request:NextRequest){
const req=await request.json()
// const client =await db.connect();
try {
  if(req.task){
const res = await db.insert(todoTable).values(
  {
    task:req.task
  }
).returning()
    return NextResponse.json({message:`${req.task} inserted successfully`})

  }else{
    console.log("post else")
    throw new Error("Task Field is Required")
  }
} catch (error) {
  console.log("post catch")
  return NextResponse.json({message:(error as {message:string}).message})
}
}