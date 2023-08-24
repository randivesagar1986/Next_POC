import { fetchTodo } from "../page";
import todo from "../todo.module.css";
import Link from "next/link";
const UserDetails = async ({userId}:{userId:number}) =>{
    const URL = "http://localhost:3000/api/todo/user_"+userId+"";
    const result = await fetchTodo(URL);
    const resTodo = result?.todos;
    return(
        <div>
            <div className={todo.main}>
                <h2 className={todo.assignTitle}>Assigned Todo Tasks</h2>
                <h5>Owner : <span>{resTodo[0]?.userName}</span></h5>
                <h5>Count : <span>{result?.resultCount}</span></h5>
            </div>
             {
                (!resTodo)?<span>You have not assigned any task</span>:resTodo.map((task:any)=>{
                        return(
                            <div className={todo.todo} key={task.id}>
                            <Link href={`/todoapp/task_${task?.id}`}><h3 className={todo.taskTitle}>{task?.id}: {task?.todo}</h3></Link>
                            <div className={todo.assign}>
                                    {task?.completed? <span style={{color:"green"}}> Completed</span>:<span style={{color:"red"}}> Incomplete</span>}
                            </div>
                            </div>
                        )
                    })
            
            }
        </div>
    )
}

export default UserDetails;