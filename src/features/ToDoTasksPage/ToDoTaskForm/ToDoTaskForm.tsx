
import React, {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem, Select,
    TextField
} from "@mui/material";
import ToDoTask, {
    Priority,
    Status,
    ToDoTaskCreateUpdateRequest
} from "../../../models/ToDoTasks/ToDoTask.model";
import ToDoTasksApi from "../../../app/api/ToDoTask/ToDoTasks.api";


interface DialogProps {
    open: boolean;
    onClose: () => void;
    fetchData: () => void;
    button: {
        label: string;
        func: (taskData: ToDoTaskCreateUpdateRequest) => void;
    }
    taskData: ToDoTaskCreateUpdateRequest;
    setTaskData: React.Dispatch<React.SetStateAction<ToDoTaskCreateUpdateRequest>>;
}


const TaskForm: React.FC<DialogProps> = ({ open, onClose, fetchData, button, taskData, setTaskData}) => {


    const reset = () => {
        setTaskData({
            title: '',
            description: '',
            startDateTime: '',
            dueDateTime: '',
            priority: Priority.High,
            status: Status.ToDo,
        })
    }

    const today = new Date().toISOString().split('T')[0];

    const handleInputChange = (fieldName: keyof ToDoTaskCreateUpdateRequest, value: string) => {
        setTaskData((prevData) => ({ ...prevData, [fieldName]: value }));
    };



    return (
        <div>
            <Dialog open={open}>
                <DialogTitle>Create New Task</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Task Name"
                        fullWidth
                        value={taskData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        inputProps={{ maxLength: 50 }}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        multiline
                        fullWidth
                        value={taskData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        inputProps={{ maxLength: 255 }}
                    />
                    <TextField
                        margin="dense"
                        label="Start Date"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                            inputProps: {
                                max: taskData.dueDateTime,
                            },
                        }}
                        value={taskData.startDateTime}
                        onChange={(e) => handleInputChange('startDateTime', e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Due Date"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                            inputProps: {
                                min: taskData.startDateTime==='' ? today: taskData.startDateTime,
                            },
                        }}
                        value={taskData.dueDateTime}
                        onChange={(e) => handleInputChange('dueDateTime', e.target.value)}
                    />
                    <FormControl fullWidth margin="dense" >
                        <InputLabel>Priority</InputLabel>
                        <Select
                            label="Priority"
                            value={taskData.priority}
                            onChange={(e) => handleInputChange('priority', e.target.value as string)}
                        >
                            <MenuItem value={Priority.High}>High</MenuItem>
                            <MenuItem value={Priority.Medium}>Medium</MenuItem>
                            <MenuItem value={Priority.Low}>Low</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth  margin="dense">
                        <InputLabel >Status</InputLabel>
                        <Select
                            label="Priority"
                            value={taskData.status}
                            onChange={(e) => handleInputChange('status', e.target.value as string)}
                        >
                            <MenuItem value={Status.ToDo}>To Do</MenuItem>
                            <MenuItem value={Status.InProgress}>In Progress</MenuItem>
                            <MenuItem value={Status.Done}>Done</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>{console.log(taskData);reset(); onClose()}}>Cancel</Button>
                    <Button onClick={() => {button.func(taskData); reset(); onClose()}} color="primary">
                        {button.label}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default TaskForm;
