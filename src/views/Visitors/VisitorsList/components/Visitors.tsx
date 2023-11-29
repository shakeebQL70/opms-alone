import React, { useState } from 'react'
import { Box } from '@mui/material'
import Header from './Header';
import Filters from './Filters';
import List from './List';
import ViewVisitorDetails from './ViewVisitorDetails';
import AddEditVisitor from './AddEditVisitor';
import {useVisitorStore} from 'SUPER/store'

const defaultValues = {
    district: null,
    class: null,
    schoolCode: null,
    gender: null, 
    session: null, 
};

const addEditDefaultValues = {
  schoolCode: null,
  visitorName: null,
  date: null,
  visitorType: null,
  designation: null,
  purpose: null,
  feedback: null,
  issues: null,
}

const Visitors = () => {
  const visitorStore = useVisitorStore((state: any) => state)
  const {openEditModal, setOpenEditModal} = visitorStore
  
  const [openModal, setOpenModal] = useState(false);
  const [id, setId] = useState(0);

  const handleClose = () => {
    setOpenModal(false);
    setId(0)
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

  return (
    <Box>
        <Header handleOpen={handleOpenAdd} />
        <Filters data={defaultValues} />
        <List handleOpen={handleOpen} />

        {openModal && <ViewVisitorDetails handleClose={handleClose} id={id} />}
        {openEditModal ? <AddEditVisitor handleClose={handleClose} edit={!!id} id={id} /> : null}
    </Box>
  )
}

export default Visitors