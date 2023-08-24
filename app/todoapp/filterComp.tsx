"use client";
import "../todoapp/radio.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import todo from "./todo.module.css";
//React.FC<reactType1>
const FilterComp = ({isServer,resultCount}:{isServer:boolean,resultCount:number}) => {
    const [selected, setSelected] = useState<string | number>("");
    const [serverRender,setServerRender] = useState<boolean>(isServer);
    const [filterCount, setFilterCount] = useState<number>(resultCount);
    let resTodo:any = [];
    let data;
    const radioClick = (e:React.ChangeEvent<HTMLInputElement>) => {
        setSelected(e.target.value);
        setServerRender(false);
    }
    const fetchFilterData = async () => {
        let postData: any = {
            method: "POST"
        };
        if (selected === 1) {
            postData = { ...postData, body: JSON.stringify({ isComplete: true }) };
        } else if (selected === 0) {
            postData = { ...postData, body: JSON.stringify({ isComplete: false }) };
        } else {
            postData = { ...postData, body: JSON.stringify({ isComplete: "" }) };
        }
        let response = await fetch("http://localhost:3000/api/todo", postData);
        let response1 = response.json();
        return response1;

    }
    const fetchResponseData = async () => {
        data = await fetchFilterData();
        resTodo = data?.todos;
    }
    useEffect(() => {
        (!serverRender)?fetchResponseData():"";
    }, [selected])
    return (
        <>
            {serverRender?<div className="filterMain">
                <h4 className="filterTitle">Filter By: </h4>
                <div className="filterSub">
                    <label className="container">All
                        <input type="radio" checked={selected === ""} value={""} onChange={radioClick} name="radio" />
                        <span className="checkmark"></span>
                    </label>
                    <label className="container">Completed
                        <input type="radio" checked={selected === 1} value={1} onChange={radioClick} name="radio" />
                        <span className="checkmark"></span>
                    </label>
                    <label className="container">Incomplete
                        <input type="radio" checked={selected === 0} value={0} onChange={radioClick} name="radio" />
                        <span className="checkmark"></span>
                    </label>
                </div>
                <h4 className="filterCount">
                    All Count: 30
                </h4>
            </div>:""
            }
            {
                (!serverRender)?(!resTodo) ? <span>You have not assigned any task</span> : resTodo.map((task: any) => {
                    return (
                        <div className={todo.todo} key={task.id}>
                            <Link href={`/todoapp/task_${task?.id}`}><h3 className={todo.taskTitle}>{task?.id}: {task?.todo}</h3></Link>
                            <div className={todo.assign}>
                                Assigned to: <Link href={`/todoapp/user_${task?.userId}`}><span style={{ color: "blue" }}> {task?.userName}</span></Link>,
                                {task?.completed ? <span style={{ color: "green" }}> Completed</span> : <span style={{ color: "red" }}> Incomplete</span>}
                            </div>
                        </div>
                    )
                }):""

            }
        </>
    )
}

export default FilterComp;