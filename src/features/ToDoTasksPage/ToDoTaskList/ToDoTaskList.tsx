import * as React from 'react';
import {useEffect, useState} from 'react';
import List from '@mui/material/List';
import ToDoTasksApi from "../../../app/api/ToDoTask/ToDoTasks.api";
import ToDoTask, {Priority, Status, ToDoTaskCreateUpdateRequest} from "../../../models/ToDoTasks/ToDoTask.model";
import "./ToDoTaskList.css"
import Typography from "@mui/material/Typography";


import TaskForm from "../ToDoTaskForm/ToDoTaskForm";
import ToDoTaskCard from "../ToDoTaskCard/ToDoTaskCard";


interface ListProps {
    taskList: ToDoTask[] | undefined;
    fetchData: () => void;
}

const InsetList: React.FC<ListProps> = ({taskList, fetchData}) => {
    const [isDialogOpen, setDialogOpen] = useState(false);

    const [taskData, setTaskData] = useState<ToDoTaskCreateUpdateRequest>({
        title: "",
        description: "",
        startDateTime: "",
        dueDateTime: "",
        status: Status.ToDo,
        priority: Priority.High,


    });
    const [idCurrent, setIdCurrent] = useState<number>(-1);
    useEffect(() => {
        fetchData();
    }, [])


    const handleUpdate = async (taskData: ToDoTaskCreateUpdateRequest) => {
        await ToDoTasksApi.update(idCurrent, taskData)
            .then(response => {
                console.log(response);
            })
            .catch((error) => {
                // Handle errors
                console.error('API Error:', error);
            });
        fetchData()
    }


    const doneTasks = taskList?.filter(task => task.status === Status.Done);
    const inProgressTasks = taskList?.filter(task => task.status === Status.InProgress);
    const toDoTasks = taskList?.filter(task => task.status === Status.ToDo);

    return (<>
            <div className="list_category">
                <div className="list">
                    <Typography variant="h6" gutterBottom>
                        ToDo
                    </Typography>
                    <List
                        sx={{width: '100%'}}
                        aria-label="contacts"
                    >
                        {toDoTasks?.map((value, index) => {
                            return <ToDoTaskCard key={index}
                                                 value={value}
                                                 setTaskData={setTaskData}
                                                 setIdCurrent={setIdCurrent}
                                                 setDialogOpen={setDialogOpen}
                                                 fetchData={fetchData}></ToDoTaskCard>


                        })}
                    </List>
                </div>
                <div className="list">
                    <Typography variant="h6" gutterBottom>
                        InProgress
                    </Typography>
                    <List
                        sx={{width: '100%'}}
                        aria-label="contacts"
                    >
                        {inProgressTasks?.map((value, index) => {
                            return <ToDoTaskCard key={index}
                                                 value={value}
                                                 setTaskData={setTaskData}
                                                 setIdCurrent={setIdCurrent}
                                                 setDialogOpen={setDialogOpen}
                                                 fetchData={fetchData}></ToDoTaskCard>

                        })}
                    </List>
                </div>
                <div className="list">
                    <Typography variant="h6" gutterBottom>
                        Done
                    </Typography>
                    <List
                        sx={{width: '100%'}}
                        aria-label="contacts"
                    >
                        {doneTasks?.map((value, index) => {
                            return <ToDoTaskCard key={index}
                                                 value={value}
                                                 setTaskData={setTaskData}
                                                 setIdCurrent={setIdCurrent}
                                                 setDialogOpen={setDialogOpen}
                                                 fetchData={fetchData}></ToDoTaskCard>

                        })}
                    </List>
                </div>
            </div>

            <TaskForm open={isDialogOpen}
                      onClose={() => setDialogOpen(false)}
                      button={{label: "Save", func: handleUpdate}}
                      taskData={taskData}
                      setTaskData={setTaskData}
            ></TaskForm>


        </>
    );
}

export default InsetList;