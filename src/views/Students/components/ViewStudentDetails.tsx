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
import {useStudentStore} from 'SUPER/store'
import { formatDateYYYYMMDD } from '../../../utils';

interface IViewDetails {
    handleClose: Function;
    id: number
}

const initialState = [
    { title: "Teacher Name", value: "", key:"name" },
    { title: "Gender", value: "", key:'gender' },
    { title: "School Name", value: "", key: 'school.name' },
    { title: "School UDISE Code", value: '', key: 'school.udise_code' },
    { title: "School District", value: "", key: 'school.district' },
    { title: "School Block", value: "", key: 'school.block' },
    { title: "State", value: "", key:"state" },
    { title: "District", value: "", key:'district' },
    { title: "Village", value: "", key:'village' },
    { title: "Session", value: "", key:"session" },
    { title: "Date Of Birth", value: "", key: 'd_o_b' },
  ];

const ViewStudentDetails = ({handleClose, id} : IViewDetails) => {
    const store = useStudentStore((state: any) => state)   
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
            if(cur_key === 'd_o_b'){
                value = formatDateYYYYMMDD(value)
            }
            element.value = value 
        }
        setData(newDetails)
    }, [details])
  return (
    <Box>
        <CustomizedDialog open={open} handleClose={handleClose} fullWidth>
            <DialogHeader handleClose={handleClose}>  <Typography variant='h5' component={'h2'}>Student Details</Typography> </DialogHeader>
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

export default ViewStudentDetails