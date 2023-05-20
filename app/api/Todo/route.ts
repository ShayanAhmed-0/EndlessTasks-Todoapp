
import { QueryResult } from '@vercel/postgres';
import { NextRequest,NextResponse } from 'next/server'; 
import {Todo,NewTodo,db,todoTable} from "../../lib/drizzle"
import { sql } from '@vercel/postgres';

export async function GET(request:NextRequest){
  
  try {
    await sql`Create table if not exists Todos(id serial,Task varchar(255))`
    const res = await db.select().from(todoTable)

    return NextResponse.json({data:res})
  } catch (error) {
    console.log((error as {message:string}).message)
    return NextResponse.json({message:"Something Went Wrong"})
  }
}

export async function POST(request:NextRequest){
const req=await request.json()
// const client =await db.connect();
try {
  if(req.Task){
const res = db.insert(todoTable).values(
  {
    task:req.task
  }
).returning()
    return NextResponse.json({message:`${req.Task} inserted successfully`})

  }else{
    throw new Error("Task Field is Required")
  }
} catch (error) {
  return NextResponse.json({message:(error as {message:string}).message})
}
}