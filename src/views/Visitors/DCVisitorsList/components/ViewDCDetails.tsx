import React, {useState, useEffect} from 'react'
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
import { formatDateYYYYMMDD } from '../../../../utils';
import {useDCVisitorStore} from 'SUPER/store'

interface IViewDetails {
    handleClose: Function;
    id: number;
}

const initialState =[
    { "title": "School Name", "value": "", "key": "school.name" },
    { "title": "School BCCL Code", "value": "", "key": "school.bccl_code" },
    { "title": "School UDISE Code", "value": "", "key": "school.udise_code" },
    { "title": "School District", "value": "", "key": "school.district" },
    { "title": "School Block", "value": "", "key": "school.block" },
    { "title": "Visit Type", "value": "", "key": "visit_type" },
    { "title": "Visit Number", "value": "", "key": "visit_number" },
    { "title": "Visit Name", "value": "", "key": "visit_name" },
    { "title": "Date of Visit", "value": "", "key": "date_of_visit" },
    { "title": "School Coordinator Attendance", "value": "", "key": "school_coordinator_attendance" },
    { "title": "ICT Lab Utilization", "value": "", "key": "ict_lab_utilization" },
    { "title": "In Time", "value": "", "key": "in_time" },
    { "title": "Out Time", "value": "", "key": "out_time" },
    { "title": "Computer Education Consumable", "value": "", "key": "computer_edu_consumable" },
    { "title": "Electricity Bill Consumption ICT Lab", "value": "", "key": "electricity_bill_consumption_ict_lab" },
    { "title": "Any Other Register", "value": "", "key": "any_other_register" },
    { "title": "ICT Lab Hardware Functional", "value": "", "key": "ict_lab_hardware_functional" },
    { "title": "ICT Lab Student Teacher Attendance", "value": "", "key": "ict_lab_student_teacher_attendance" },
    { "title": "Performance Review SC", "value": "", "key": "performance_review_sc" },
    { "title": "Feedback from Students", "value": "", "key": "feedback_from_students" },
    { "title": "Feedback from Principal", "value": "", "key": "feedback_from_principal" },
    { "title": "Comments on Feedback Complaints from School", "value": "", "key": "comments_on_feedback_complaints_from_school" },
    { "title": "Multimedia Econtent Issue", "value": "", "key": "multimedia_econtent_issue" },
    { "title": "Multimedia Econtent Feedback", "value": "", "key": "multimedia_econtent_feedback" },
    { "title": "Comments Suggestions by Visitor", "value": "", "key": "comments_suggestions_by_visitor" },
    { "title": "Image URL", "value": "", "key": "image_url" }
  ]
  

const ViewDCDetails = ({handleClose, id} : IViewDetails) => {
    const dcVisitorStore = useDCVisitorStore((state: any) => state)   
    const {getDetails, details, actionLoading, actionError} = dcVisitorStore

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
                if(key === 'date') element.value = formatDateYYYYMMDD(details[key])
                else element.value = details[key]?.toString()
            }   
        }
        setData(newDetails)
    }, [details])
  return (
    <Box>
        <CustomizedDialog open={open} handleClose={handleClose} fullWidth>
            <DialogHeader handleClose={handleClose}>  <Typography variant='h5' component={'h2'}>DC Details</Typography> </DialogHeader>
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

export default ViewDCDetails