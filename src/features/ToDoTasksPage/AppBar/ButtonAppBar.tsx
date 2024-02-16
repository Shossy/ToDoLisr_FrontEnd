import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ToDoTaskForm from '../ToDoTaskForm/ToDoTaskForm';
import {useState} from "react";
import ToDoTasksApi from "../../../app/api/ToDoTask/ToDoTasks.api";
import {Priority, Status, ToDoTaskCreateUpdateRequest} from "../../../models/ToDoTasks/ToDoTask.model";

interface ButtonAppBarProps {
    fetchData: () => void;
}


const ButtonAppBar: React.FC<ButtonAppBarProps> = ({fetchData}) => {
    const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
    const [taskData, setTaskData] = useState<ToDoTaskCreateUpdateRequest>({
        title: "",
        description: "",
        startDateTime: "",
        dueDateTime: "",
        status: Status.ToDo,
        priority: Priority.High,
    })
    const handleCreateTask = async (taskData: ToDoTaskCreateUpdateRequest) => {
        // Validate the form data or perform any other necessary checks
        // Your logic to create the task goes here
        console.log('Task created!', taskData);
        // eslint-disable-next-line no-lone-blocks
        {/*onTaskCreate(taskData);*/
        }
        await ToDoTasksApi.create(taskData)
            .then(response => console.log(response))
            .catch((error) => {
                // Handle errors
                console.error('API Error:', error);
            });
        fetchData();
    };

    const handleOpenDialog = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    return (
        <>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar sx={{justifyContent: 'flex-start'}}>
                        <Typography variant="h6" component="div" sx={{mr: 3}}>
                            ToDoApp
                        </Typography>
                        <Button color="inherit" sx={{border: 2}} onClick={handleOpenDialog}>Create Task</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <ToDoTaskForm open={isDialogOpen}
                          onClose={handleCloseDialog}
                          button={{label: "Create", func: handleCreateTask}}
                          taskData={taskData}
                          setTaskData={setTaskData}/>
        </>

    );
}

export default ButtonAppBar;