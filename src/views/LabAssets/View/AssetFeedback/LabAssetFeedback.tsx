import React, { useState } from "react";
import { Box } from "@mui/material";
import Header from "./Header";
import List from "./List";
import ViewFeedbackDetils from "./ViewAssetFeedbackDetails";
import {useLabAssetStore} from 'SUPER/store'

const defaultValues = {
  district: null,
  class: null,
  schoolCode: null,
  gender: null,
  session: null,
};

const LabAssetFeedback = () => {
  const store = useLabAssetStore((state: any) => state)
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
  

  return (
    <Box>
      <Header handleOpen={handleOpenAdd} />
      <List handleOpen={handleOpen} />

      {openModal && (
        <ViewFeedbackDetils handleClose={handleClose} id={id} />
      )}
    </Box>
  );
};

export default LabAssetFeedback;
