import React, { useState } from 'react'
import {
    DialogBody,
    DialogHeader,
    CustomizedDialog,
} from "UI/modal";
import {
    TableWrapper,
    TableHeadWrapper,
    TableBodyWrapper,
    PaginationWrapper,
    StyledTableCell, StyledTableRow
} from "UI/table";
import { Box, Button, Table, Typography } from "@mui/material";
import ViewDetails from './ViewDetails';
import ChangeStatus from './ChangeStatus';

interface IView {
    handleClose: Function;
}

const clientInformation = [
    { title: "School Name", value: "UPG RAJKIYEKRIT MS KEWAL" },
    { title: "Principal Name", value: "durga ram" },
    { title: "District", value: "palamu" },
    { title: " Block", value: "chainpur" },
    { title: " Address", value: "upg rajiyekrit ms kewal,kewal,chainpur,palamu,822110" },
    { title: " Complaint Logged By", value: "Sumit Chaudahry" },
    { title: " Contact No.", value: "7979840956" },
    { title: "School Co-ordinator", value: "durga ram" },
]

const problemDescription = [
    { title: 'Equipment Name', value: "Desktop" },
    { title: 'Serial Number', value: "UXBVSI322M3931999" },
    { title: 'OEM Name', value: "ACER" },
    { title: 'Service Provider', value: "Acer" },
    { title: 'Model Name', value: "VERTION X2680G" },
    { title: 'Installation Date', value: "14-11-2022" },
    { title: 'Warranty Expire Date', value: "30-11-2027" },
    { title: 'Warranty Status', value: "Active" },
    { title: 'Request Type', value: "SW" },
    { title: 'Problem Type', value: "Other" },
    { title: 'Complaint Severity', value: "High" },
    { title: 'Complaint Remarks', value: "Screen is fluctuating" },
]


const callLogHeading = [
    { id: 1, label: "#" },
    { id: 2, label: "Open Date" },
    { id: 1, label: "Follow Up Date" },
    { id: 1, label: "Status Remark" },
    { id: 1, label: "Current Status" }
]

const callLogData = [{
    id: 455,
    open_data: "19-10-2023",
    follow_up_date: null,
    status_remark: "Screen is fluctuating",
    current_status: "Assigned to Technical Desk"
}]

const View = ({ handleClose }: IView) => {
    const [id, setId] = useState(0);

    const handleCloseChangeStatus = () => {
        setId(0);
    }

    return (
        <Box>
            <CustomizedDialog open={open} handleClose={handleClose} maxWidth="650px">
                <DialogHeader handleClose={handleClose}>  <Typography variant='h5' component={'h2'}>Complaint History List</Typography> </DialogHeader>
                <DialogBody>

                    <Typography sx={{ fontWeight: "700", paddingBottom: "15px" }}>Client Information</Typography>
                    <ViewDetails data={clientInformation} />

                    <Typography sx={{ padding: "15px", fontWeight: "700" }}>Problem Description</Typography>
                    <ViewDetails data={problemDescription} />

                    <Box sx={{ display: "flex", justifyContent: "space-between", padding: "15px" }}>
                        <Typography sx={{ fontWeight: "700" }} >Call Log Summary</Typography>
                        <Button variant='contained' size="small" color='warning' onClick={() => setId(1)}>Change Status</Button>
                    </Box>

                    <TableWrapper>
                        <TableHeadWrapper>
                            {callLogHeading.map((item: any, index: number) => {
                                return (
                                    <StyledTableCell key={item.id}>
                                        {item.label}
                                    </StyledTableCell>
                                )
                            })}
                        </TableHeadWrapper>
                        <TableBodyWrapper>
                            {callLogData.map((item: any, index: number) => {
                                return (
                                    <StyledTableRow key={item.id}>
                                        <StyledTableCell>{index + 1}</StyledTableCell>
                                        <StyledTableCell>{item.open_data || "N/A"}</StyledTableCell>
                                        <StyledTableCell>{item.follow_up_date || "N/A"}</StyledTableCell>
                                        <StyledTableCell>{item.status_remark || "N/A"}</StyledTableCell>
                                        <StyledTableCell>{item.current_status || "N/A"}</StyledTableCell>
                                    </StyledTableRow>
                                )
                            })}
                        </TableBodyWrapper>

                    </TableWrapper>
                </DialogBody>
            </CustomizedDialog>
            {id ? <ChangeStatus handleClose={handleCloseChangeStatus} id={id} /> : null}
        </Box>
    )
}

export default View