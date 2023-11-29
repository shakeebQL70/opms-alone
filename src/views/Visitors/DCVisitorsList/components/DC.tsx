import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import Header from './Header';
import Filters from './Filters';
import List from './List';
import ViewVisitorDetails from './ViewDCDetails';
import AddEditVisitor from './AddEditDC';
import {useDCVisitorStore} from 'SUPER/store'

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
  visitNo: null,
  inTime: null,
  outTime: null,
  dailyAttendance: null,
  ictLab: null,
  issues: null,
  electricityCosumption: null,
  computerEdRegister: null,
  otherRegister: null,
  ictLabCheck: null,
  studentAttendance: null,
  reviewSc: null,
  studentFeedback: null,
  teacherFeedback: null,
  schoolFeedback: null,
  multimediaIssues: null,
  multimediaFeedback: null,
  visitorSuggestions: null,
};

const data = [
  { key: "School Name", value: "Real Madrid" },
  { key: "Visitor Name", value: "Siiuuuuu" },
  { key: "Date", value: "02-11-2023" },
  { key: "Type", value: "External Visitor" },
  { key: "Disgnation", value: "Invigilator" },
  { key: "Purpose", value: "Invigilation" },
  { key: "Feedback", value: "The ambience was great." },
  { key: "Issues", value: "Need more space for parking" },
];

const DC = () => {
  const dcVisitorStore = useDCVisitorStore((state: any) => state)
  const {openEditModal, setOpenEditModal} = dcVisitorStore
  
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

  useEffect(() => {
    if(!openEditModal) setId(0)
  }, [openEditModal])
  


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

export default DC