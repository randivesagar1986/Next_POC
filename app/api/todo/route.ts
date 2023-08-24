import {todo} from '@/utils/db';
import { NextResponse } from 'next/server';
export async function GET(){
    const data = todo;
    return NextResponse.json(data,{status:200});
}

export async function POST(request:any){
    const data = JSON.parse(JSON.stringify(todo));
    const requireData = data?.todos;
    const recivedBody = await request.json();
    const isComplete = recivedBody.isComplete;
    let result = [];
    if(requireData.length > 0){
        result=requireData.filter((task:any)=>{
            return task.completed === isComplete;
        })
    }
    const response ={"todos":[...result],"resultCount":result.length};
    return NextResponse.json(response,{status:200});
}