import {todo} from '@/utils/db';
import { NextResponse } from 'next/server';
interface paraType{
    todoID:string
}
export async function GET(request:any,{params}:{params:paraType}){
    const data = JSON.parse(JSON.stringify(todo));
    const requireData = data?.todos;
    console.log(requireData);
    const todoID = params.todoID;
    const Id = Number(todoID.split("_")[1]);
    let result = [];
    if(requireData.length > 0){
        if(todoID.split("_")[0] === "task"){
            result = requireData.filter((task:any)=>{
               return task.id === Id
            })
        }else{
            result = requireData.filter((task:any)=>{
                return task.userId === Id
            })
        }
    }
    console.log(result);
    const response ={"todos":[...result],"resultCount":result.length};
    return NextResponse.json(response,{status:200});
}