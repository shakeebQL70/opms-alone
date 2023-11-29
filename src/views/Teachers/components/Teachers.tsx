import React, { useState } from 'react'
import { Box } from '@mui/material'
import Header from './Header';
import Filters from './Filters';
import List from './List';
import ViewTeacherDetails from './ViewTeacherDetails';
import AddEditTeacher from './AddEditTeacher';
import {useTeacherStore} from 'SUPER/store'

const filterDefaultValues = {
    teacherName: null,
    schoolCode: null,
    gender: null, 
    session: null, 
};

const Teachers = () => {
    const teacherStore = useTeacherStore((state: any) => state)
    const {openEditModal, setOpenEditModal} = teacherStore 
    const [openModal, setOpenModal] = useState(false);
    const [editId, setEditId] = useState(0);

    const handleClose = () => {
      setOpenModal(false);
      setEditId(0)
      setOpenEditModal(false);
    };
  
    const handleOpen = (isEdit: boolean, id:number) => {
        setEditId(id)
        if(isEdit){
          setOpenEditModal(true)
        }else {
          setOpenModal(true);
        }
    };

    const handleOpenAdd = () => {
        setOpenEditModal(true)
    }

  return (
    <Box>
        <Header handleOpen={handleOpenAdd} />
        <Filters data={filterDefaultValues} />
        <List handleOpen={handleOpen} />

        {openModal ? <ViewTeacherDetails handleClose={handleClose} id={editId || -1} /> : null}
        {openEditModal ? <AddEditTeacher handleClose={handleClose} edit={!!editId} id={editId || -1} /> : null}
    </Box>
  )
}

export default Teachers