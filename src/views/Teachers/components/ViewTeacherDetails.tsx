import React, {useEffect, useState} from 'react'
import {
  DialogBody,
  DialogHeader,
  CustomizedDialog,
} from "UI/modal";
import {useTeacherStore} from 'SUPER/store'
import { Box, Typography, CircularProgress } from "@mui/material";
import {
    TableWrapper,
    TableBodyWrapper,
    StyledTableCell,StyledTableRow
} from "UI/table";

interface IViewDetails {
    handleClose: Function;
    id: number;
}


const initialState = [
    { title: "Teacher Name", value: "", key:"name" },
    { title: "Gender", value: "", key:"gender" },
    { title: "Mobile", value: "", key:"mobile" },
    { title: "School Name", value: "", key:"school.name" },
    { title: "Skills", value: "", key:"skills" },
    { title: "School Code", value: "", key:"school.bccl_code" },
    { title: "UDISE Code", value: '', key:"school.udise_code" },
    { title: "Block", value: "", key:"school.block" },
    { title: "Class Taught", value: "", key:"class_taught" },
    { title: "Appointed For", value: "", key:"appointed_subject" },
    { title: "Teacher Qualification", value: "", key:"qualification" },
    { title: "Teacher Skills", value: "",key:"teacherSkills" },
    { title: "Teacher Category", value: "", key:"category" },
    { title: "ICT Trained", value: "", key:"ict_trained" },
    { title: "Experience", value: "", key:"experience" },
    { title: "State", value: "", key:"state" },
    { title: "District", value: "", key:"district" },
    { title: "Country", value: "", key:"country" },
    { title: "Village", value: "", key:"village" },
    { title: "Session", value: '', key:"session" },
    { title: "Status", value: "", key:"status" },
    { title: "Inactive Reasons", value: "", key:"inactive_reason" },
    { title: "Inactive Date", value: "", key:"inactive_date" },
  ];

const ViewTeacherDetails = ({handleClose, id} : IViewDetails) => {
    const teacherStore = useTeacherStore((state: any) => state)
    const {getDetails, details, actionLoading, actionError} = teacherStore 

    const [data, setData] = useState(initialState)


    useEffect(() => {
        getDetails(id.toString())
    }, [])

    useEffect(() => {
        const newDetails = JSON.parse(JSON.stringify(initialState));
        for(const element of newDetails){
            // to get the first place detail and the nested detail
            const keys = element.key.split('.')
            for (const key of keys) {
                element.value = details[key]
            }   
        }
        setData(newDetails)
    }, [details])

  return (
    <Box>
        <CustomizedDialog open={open} handleClose={handleClose} fullWidth>
            <DialogHeader handleClose={handleClose}>  <Typography variant='h5' component={'h2'}>Teacher Details</Typography> </DialogHeader>
            <DialogBody> 
                <Box>
                    <TableWrapper>
                        <TableBodyWrapper>
                            {
                                actionLoading ? 
                                    <Box display='flex' alignItems='center' justifyContent='center' height={400}>
                                        <CircularProgress />
                                    </Box>
                                : actionError ? 
                                    <Typography> {actionError} </Typography>
                                :
                                data?.map((detail, index) => (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell>{detail.title}: </StyledTableCell>
                                        <StyledTableCell>{detail.value || 'N/A'}</StyledTableCell>
                                    </StyledTableRow>
                                ))
                            }
                        </TableBodyWrapper>
                    </TableWrapper>
                </Box>
            </DialogBody>
        </CustomizedDialog>
    </Box>
  )
}

export default ViewTeacherDetails