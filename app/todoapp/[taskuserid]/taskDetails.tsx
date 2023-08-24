import { fetchTodo } from "../page";
const TaskDetails = async ({taskId}:{taskId:number}) =>{
    const URL = "http://localhost:3000/api/todo/task_"+taskId+"";
    const result = await fetchTodo(URL);
    const resTodo = result?.todos;
    return(
        <div style={{margin:"10px 50px"}}>
            <h2 style={{textAlign:"center",marginBottom:"20px"}}>Task Name: {resTodo[0]?.todo}</h2>
            <p style={{textAlign:"center"}}>
                <h4 style={{marginBottom:"5px"}}>Description: </h4> {resTodo[0]?.description}
            </p>
        </div>
    )
}

export default TaskDetails;