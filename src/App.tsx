import React, {useEffect, useState} from 'react';
import './App.css';
import ToDoTask from "./models/ToDoTasks/ToDoTask.model";
import ToDoTasksApi from "./app/api/ToDoTask/ToDoTasks.api";
import ButtonAppBar from "./features/ToDoTasksPage/AppBar/ButtonAppBar";
import ToDoTaskForm from './features/ToDoTasksPage/ToDoTaskForm/ToDoTaskForm';
import ToDoTaskList from './features/ToDoTasksPage/ToDoTaskList/ToDoTaskList';
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function App() {
    const [taskList, setTaskList] = useState<ToDoTask[]>();
    const fetchData = () => {
        ToDoTasksApi.getAll()
            .then(response => {
                setTaskList(response);
                console.log(response);
            })
            .catch((error) => {
                // Handle errors
                console.error('API Error:', error);
            });
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <ButtonAppBar fetchData={fetchData}></ButtonAppBar>
            <ToDoTaskList taskList={taskList} fetchData={fetchData}></ToDoTaskList>
        </ThemeProvider>

    );
}

export default App;
