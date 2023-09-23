import todo from "./todo.module.css";
import Link from "next/link";
import Image from "next/image";
import todoImg from "./image/todo.jpg";
import FilterComp from "./filterComp";
//import { useUrl } from 'nextjs-current-url';

export async function fetchTodo(url: string) {
    const data = await fetch(url);
    const response = data.json();
    return response;
}
const TodoApp = async () => {
    //const { href: currentUrl, pathname } = useUrl() ?? {};
    const URL = "http://localhost:3000/api/todo"
    const result = await fetchTodo(URL);
    const resTodo = result?.todos;
    console.log(resTodo);
    return (
        <div>
            <div className={todo.main}>
                <Image src={todoImg} width={100} height={100} alt="todo" />
                <div className={todo.titleMain}>
                    <h1 className={todo.assignTitle}>Todo Tasks</h1>
                    <h5>Total Tasks : <span>{result?.total}</span></h5>
                </div>
            </div>
            <FilterComp isServer={true} resultCount={result?.resultCount}/>
            {
                (!resTodo) ? <span>You have not assigned any task</span> : resTodo.map((task: any) => {
                    return (
                        <div className={todo.todo} key={task.id}>
                            <Link href={`/todoapp/task_${task?.id}`}><h3 className={todo.taskTitle}>{task?.id}: {task?.todo}</h3></Link>
                            <div className={todo.assign}>
                                Assigned to: <Link href={`/todoapp/user_${task?.userId}`}><span style={{ color: "blue" }}> {task?.userName}</span></Link>,
                                {task?.completed ? <span style={{ color: "green" }}> Completed</span> : <span style={{ color: "red" }}> Incomplete</span>}
                            </div>
                        </div>
                    )
                })

            }
        </div>
    )
}

export default TodoApp;