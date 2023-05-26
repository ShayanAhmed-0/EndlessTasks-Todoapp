import { QueryResult } from '@vercel/postgres';
import { NextRequest,NextResponse } from 'next/server'; 
import {Todo,NewTodo,db,todoTable} from "../../../../lib/drizzle"
import { sql } from '@vercel/postgres';
import {eq} from "drizzle-orm"

export async function GET(request:NextRequest,{params}:{params:{id:number}}){
  try {
    const res = await db.select().from(todoTable).where(eq(todoTable.id,params.id))

    return NextResponse.json({data:res})
  } catch (error) {
    console.log("get catch")
    console.log((error as {message:string}).message)
    return NextResponse.json({message:"Something Went Wrong"})
  }
}

export async function DELETE(request:NextRequest,{params}:{params:{id:number}}) {
  try {
    await db.delete(todoTable).where(eq(todoTable.id,params.id))
    return NextResponse.json({"Deleted":"Task Deleted"});
  } catch (error) {
    console.log("DELETE Catch")
  }
}

export async function PUT(request : NextRequest,{params}:{params:{id:number}}){

  const req = await request.json();
try {
  const updateResult = await db.update(todoTable).set({task:req.task}).where(eq(todoTable.id, params.id))

  return NextResponse.json({"Task updated":`${todoTable.task}`});
} catch (error) {
  
}
}
