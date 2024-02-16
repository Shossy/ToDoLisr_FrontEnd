import {IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import * as React from "react";
import ToDoTask, {Priority, ToDoTaskCreateUpdateRequest} from "../../../models/ToDoTasks/ToDoTask.model";
import Low from "../../../common/assets/svg/green.svg";
import Medium from "../../../common/assets/svg/orange.svg";
import High from "../../../common/assets/svg/red.svg";
import ToDoTasksApi from "../../../app/api/ToDoTask/ToDoTasks.api";

interface CardProps{
    value: ToDoTask;
    setIdCurrent: React.Dispatch<React.SetStateAction<number>>;
    setTaskData: React.Dispatch<React.SetStateAction<ToDoTaskCreateUpdateRequest>>;
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    fetchData: () => void;
}
const ToDoTaskCard:React.FC<CardProps> = ({value,
                                              setIdCurrent,
                                              setTaskData,
                                              setDialogOpen,
                                              fetchData}) => {

    // Function to parse ToDoTask to ToDoTaskUpdateRequest
    function parseToDoTaskToUpdateRequest(task: ToDoTask): ToDoTaskCreateUpdateRequest {
        const {title, description, startDateTime, dueDateTime, priority, status} = task;
        return {title, description, startDateTime, dueDateTime, priority, status};
    }

    //fix date type
    const setDate = (time: string) => {
        const writeTime = time.split('T');
        return writeTime[0];
    }

    const ItemIcons = {
        [Priority.Low]: Low,
        [Priority.Medium]: Medium,
        [Priority.High]: High,
    };
    const handleClick = (taskData: ToDoTask) => {
        setIdCurrent(taskData.id);
        const taskRequest = parseToDoTaskToUpdateRequest(taskData);
        taskRequest.startDateTime = setDate(taskRequest.startDateTime);
        taskRequest.dueDateTime = setDate(taskRequest.dueDateTime);
        setTaskData(taskRequest);
        setDialogOpen(true);
    }

    const handleDelete = async (id: number) => {
        await ToDoTasksApi.delete(id)
            .then(response => {
                console.log(response);
            })
            .catch((error) => {
                // Handle errors
                console.error('API Error:', error);
            });
        fetchData()
    }

    return <ListItem sx={{border: 1, borderRadius: 2, marginBottom: 2}}
              secondaryAction={
                  <IconButton edge="end" aria-label="delete"
                              onClick={() => handleDelete(value.id)}>
                      <DeleteIcon/>
                  </IconButton>

              }
              disablePadding
    >
        <ListItemButton onClick={() => handleClick(value)}>
            <img className="icon" src={ItemIcons[value.priority]} alt="priority"></img>

            <ListItemText
                primary={value.title}
                secondary={setDate(value.startDateTime) + ' - ' + setDate(value.dueDateTime)}
            />
        </ListItemButton>
    </ListItem>
}

export default ToDoTaskCard;