import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ToDoTasksApi from "../../../app/api/ToDoTask/ToDoTasks.api";
import ToDoTask, {Priority, Status} from "../../../models/ToDoTasks/ToDoTask.model";
import "./ToDoTaskList.css"
import Typography from "@mui/material/Typography";
import {IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Low from '../../../common/assets/svg/green.svg'
import Medium from '../../../common/assets/svg/orange.svg'
import High from '../../../common/assets/svg/red.svg'
import {useEffect} from "react";

interface ListProps {
    taskList: ToDoTask[] | undefined;
    fetchData: () => void;
}

const InsetList: React.FC<ListProps> = ({taskList, fetchData}) => {
    useEffect(() => {
        fetchData();
    }, [])
    const setDate = (time: string) => {
        const writeTime = time.split('T');
        return writeTime[0];
    }

    const ItemIcons = {
        [Priority.Low]: Low,
        [Priority.Medium]: Medium,
        [Priority.High]: High,
    };

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


    const doneTasks = taskList?.filter(task => task.status === Status.Done);
    const inProgressTasks = taskList?.filter(task => task.status === Status.InProgress);
    const toDoTasks = taskList?.filter(task => task.status === Status.ToDo);

    return (<div className="list_category">
            <div className="list">
                <Typography variant="h6" gutterBottom>
                    ToDo
                </Typography>
                <List
                    sx={{width: '100%'}}
                    aria-label="contacts"
                >
                    {toDoTasks?.map((value, index) => {
                        return <ListItem sx={{border: 1, borderRadius: 2, marginBottom: 2}}
                                         secondaryAction={
                                             <IconButton edge="end" aria-label="delete"
                                                         onClick={() => handleDelete(value.id)}>
                                                 <DeleteIcon/>
                                             </IconButton>

                                         }
                                         disablePadding
                        >
                            <ListItemButton>
                                <img className="icon" src={ItemIcons[value.priority]} alt="priority"></img>

                                <ListItemText
                                    primary={value.title}
                                    secondary={setDate(value.startDateTime) + ' - ' + setDate(value.dueDateTime)}
                                />
                            </ListItemButton>
                        </ListItem>


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
                        return <ListItem sx={{border: 1, borderRadius: 2}}
                                         secondaryAction={
                                             <IconButton edge="end" aria-label="delete"
                                                         onClick={() => handleDelete(value.id)}>
                                                 <DeleteIcon/>
                                             </IconButton>

                                         }
                                         disablePadding
                        >
                            <ListItemButton>
                                <img className="icon" src={ItemIcons[value.priority]} alt="priority"></img>

                                <ListItemText
                                    primary={value.title}
                                    secondary={setDate(value.startDateTime) + ' - ' + setDate(value.dueDateTime)}
                                />
                            </ListItemButton>
                        </ListItem>

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
                        return <ListItem sx={{border: 1, borderRadius: 2}}
                                         secondaryAction={
                                             <IconButton edge="end" aria-label="delete"
                                                         onClick={() => handleDelete(value.id)}>
                                                 <DeleteIcon/>
                                             </IconButton>

                                         }
                                         disablePadding
                        >
                            <ListItemButton>
                                <img className="icon" src={ItemIcons[value.priority]} alt="priority"></img>

                                <ListItemText
                                    primary={value.title}
                                    secondary={setDate(value.startDateTime) + ' - ' + setDate(value.dueDateTime)}
                                />
                            </ListItemButton>
                        </ListItem>

                    })}
                </List>
            </div>
        </div>
    );
}

export default InsetList;