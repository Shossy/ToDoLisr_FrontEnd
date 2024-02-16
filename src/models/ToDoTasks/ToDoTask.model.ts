export default interface ToDoTask {
    id:number;
    title:string;
    description:string;
    startDateTime:string;
    dueDateTime:string;
    priority:Priority;
    status:Status;

}

export interface ToDoTaskCreateUpdateRequest{
    title:string;
    description:string;
    startDateTime:string;
    dueDateTime:string;
    priority:Priority;
    status:Status;
}




export enum Priority{
    High,
    Medium,
    Low
}

export enum Status{
    ToDo,
    InProgress,
    Done
}