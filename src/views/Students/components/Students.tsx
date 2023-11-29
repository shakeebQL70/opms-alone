import React, { useState } from "react";
import { Box } from "@mui/material";
import Header from "./Header";
import Filters from "./Filters";
import List from "./List";
import ViewStudentDetails from "./ViewStudentDetails";
import AddEditStudent from "./AddEditStudent";
import {useStudentStore} from 'SUPER/store'

const defaultValues = {
  district: null,
  class: null,
  schoolCode: null,
  gender: null,
  session: null,
};

const Students = () => {
  const store = useStudentStore((state: any) => state)
  const {openEditModal, setOpenEditModal} = store
  
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

      {openModal && (
        <ViewStudentDetails handleClose={handleClose} id={id} />
      )}
      {openEditModal ? (
        <AddEditStudent
          handleClose={handleClose}
          edit={!!id}
          id={id}
        />
      ) : null}
    </Box>
  );
};

export default Students;
