import React, { useEffect, useState } from 'react'
import {
  DialogBody,
  DialogHeader,
  CustomizedDialog,
} from "UI/modal";
import { Box, CircularProgress, Typography } from "@mui/material";
import {
    TableWrapper,
    TableBodyWrapper,
    StyledTableCell,StyledTableRow
} from "UI/table";
import {useTeacherTrainingStore} from 'SUPER/store'
import { formatDateYYYYMMDD } from '../../../utils';

interface IViewDetails {
    handleClose: Function;
    id: number
}

const initialState = [
    { title: "School Name", value: "", key:"school.school_name" },
    { title: "School District", value: "", key:"school.district" },
    { title: "School Code", value: "", key:"school.bccl_code" },
    { title: "UDISE Code", value: '', key:"school.udise_code" },
    { title: "Block", value: "", key:"school.block" },
    { key: 'district', title: 'District', value: "" },
    { key: 'type_of_residential', title: 'Type of Residential', value: "" },
    { key: 'training_branch', title: 'Training Branch', value: "" },
    { key: 'teacher_name', title: 'Teacher Name', value: "" },
    { key: 'teacher_contact', title: 'Teacher Contact', value: "" },
    { key: 'training_subject', title: 'Training Subject', value: "" },
    { key: 'trainer_name', title: 'Trainer Name', value: "" },
    { key: 'trainer_contact', title: 'Trainer Contact', value: "" },
    { key: 'number_of_trainers', title: 'Number of Trainers', value: "" },
    { key: 'training_center', title: 'Training Center', value: "" },
    { key: 'training_start_date', title: 'Training Start Date', value: "" },
    { key: 'training_end_date', title: 'Training End Date', value: "" },
    { key: 'session', title: 'Session', value: "" },
    { key: 'duration', title: 'Duration', value: "" }
  ];

const ViewTrainingDetails = ({handleClose, id} : IViewDetails) => {
    const store = useTeacherTrainingStore((state: any) => state)   
    const {getDetails, details, actionLoading, actionError} = store

    const [data, setData] = useState(initialState)


    useEffect(() => {
        getDetails(id.toString())
    }, [])

    useEffect(() => {
        const newDetails = JSON.parse(JSON.stringify(initialState));
        for(const element of newDetails){
            // to get the first place detail and the nested detail
            const keys = element.key.split('.')
            let cur_key = keys[0]
            let value = details?.[cur_key]
            if(keys.length > 1){
                for (let i = 1; i<keys.length; i++) {
                    const key = keys[i]
                    value = details?.[cur_key]?.[key]
                    cur_key += key
                }  
            }
            if(cur_key === 'training_start_date' || cur_key === 'training_end_date'){
                value = formatDateYYYYMMDD(value)
            }
            element.value = value 
        }
        setData(newDetails)
    }, [details])
  return (
    <Box>
        <CustomizedDialog open={open} handleClose={handleClose} fullWidth>
            <DialogHeader handleClose={handleClose}>  <Typography variant='h5' component={'h2'}>Asset Details</Typography> </DialogHeader>
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

export default ViewTrainingDetails