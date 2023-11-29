import React, { useState } from 'react'
import { Box } from '@mui/material'
import Header from './Header';
import Filters from './Filters';
import List from './List';
import ViewDetails from './ViewDetails';
import AddEditSchool from './AddEditSchool';
import {useSchoolStore} from 'SUPER/store'

const defaultValues = {
    schoolType: null,
    schoolCode: null,
    pinCode: null, 
};

const Schools = () => {
  const schoolStore = useSchoolStore((state: any) => state)
  const {openEditModal, setOpenEditModal} = schoolStore
  
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
        <Filters data={defaultValues}/>
        <List handleOpen={handleOpen} />

        {openModal && <ViewDetails handleClose={handleClose} id={id} />}
        {openEditModal ? <AddEditSchool handleClose={handleClose} edit={!!id} id={id} /> : null}
    </Box>
  )
}

export default Schools