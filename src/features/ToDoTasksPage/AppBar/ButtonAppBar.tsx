


import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ToDoTaskForm from '../ToDoTaskForm/ToDoTaskForm';
import {useState} from "react";

interface ButtonAppBarProps{
    fetchData: ()=> void;
}

const ButtonAppBar:React.FC<ButtonAppBarProps> = ({fetchData}) => {
    const [isDialogOpen, setDialogOpen] = useState(false);

    const handleOpenDialog = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    return (
        <>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar sx={{ justifyContent: 'flex-start' }}>
                    <Typography variant="h6" component="div" sx={{ mr: 3 }}>
                        ToDoApp
                    </Typography>
                    <Button color="inherit" sx={{ border: 2}} onClick={handleOpenDialog}>Create Task</Button>
                </Toolbar>
            </AppBar>
        </Box>
            <ToDoTaskForm open={isDialogOpen} onClose={handleCloseDialog} fetchData={fetchData} />
        </>

    );
}

export default ButtonAppBar;