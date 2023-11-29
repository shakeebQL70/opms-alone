import React, { useState } from "react";
import { Box } from "@mui/material"
import Header from "./Header";
import List from "./List";
import AddTeacherTraining from "./AddTeacherTraining";
import {useTeacherTrainingStore} from 'SUPER/store'
import ViewTrainingDetails from "./ViewTrainingDetails";


const Teacher = () => {
    const store = useTeacherTrainingStore((state: any) => state)
    const {openEditModal, setOpenEditModal} = store
    
    const [openModal, setOpenModal] = useState(false);
    const [id, setId] = useState(0);

    const handleClose = () => {
        setOpenModal(false);
        setOpenEditModal(false);
    };

    const handleOpen = (id:number, type: 'edit' | 'view') => {
        if(type === 'edit'){
            setOpenEditModal(true)
        }else {
            setOpenModal(true);
        }
        setId(id)
    };

    const handleOpenAdd = () => {
        setOpenEditModal(true)
    }

    React.useEffect(() => {
        if(!openEditModal) setId(0)
    }, [openEditModal])
    

    return (<Box>
        <Header handleOpen={handleOpenAdd} />
        <List handleOpen={handleOpen} />

        {openModal ? <ViewTrainingDetails handleClose={handleClose} id={id || -1} /> : null}
        {openEditModal ? <AddTeacherTraining handleClose={handleClose} edit={!!id} id={id} /> : null}
    </Box>);
}

export default Teacher;