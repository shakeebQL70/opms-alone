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
import {useVisitorStore} from 'SUPER/store'

import {
    formatDateYYYYMMDD,
  } from "../../../../utils";
interface IViewDetails {
    handleClose: Function;
    id: number
}

const initialState = [
    { title: "School Name", value: "", key: 'school.name' },
    { title: "Visitor Name", value: "", key:"name" },
    { title: "Date", value: "", key:'date' },
    { title: "Type", value: "", key:'type' },
    { title: "Disgnation", value: "", key:'designation' },
    { title: "Purpose", value: "", key:'purpose' },
    { title: "Feedback", value: "", key:"feedback" },
    { title: "Issues", value: "", key:'any_issue' },
];

const ViewVisitorDetails = ({handleClose, id} : IViewDetails) => {
    const visitorStore = useVisitorStore((state: any) => state)   
    const {getDetails, details, actionLoading, actionError} = visitorStore

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
        newDetails[0].value = details?.school?.name
        setData(newDetails)
    }, [details])

  return (
    <Box>
        <CustomizedDialog open={open} handleClose={handleClose} fullWidth>
            <DialogHeader handleClose={handleClose}>  <Typography variant='h5' component={'h2'}>Visitor Details</Typography> </DialogHeader>
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

export default ViewVisitorDetails