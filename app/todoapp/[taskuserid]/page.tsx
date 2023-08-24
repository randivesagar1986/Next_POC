import TaskDetails from "./taskDetails";
import UserDetails from "./userDetails";
interface paraType{
    taskuserid:string
}
const Moreinfo = ({params}:{params:paraType}) =>{
    const id:string= params?.taskuserid;
    console.log(params);
    const id1:number = Number(id.split("_")[1]);
    return(
        <>
            {
                (id.includes("task"))?<TaskDetails taskId={id1}/>:<UserDetails userId={id1}/>
            }
        </>
        
    )
}

export default Moreinfo;