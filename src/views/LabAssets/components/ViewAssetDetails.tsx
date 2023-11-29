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
import {useLabAssetStore} from 'SUPER/store'
import { formatDateYYYYMMDD } from '../../../utils';

interface IViewDetails {
    handleClose: Function;
    id: number
}

const initialState = [
    { title: "School Name", value: "", key: 'school.school_name' },
    { title: "School UDISE Code", value: '', key: 'school.udise_code' },
    { title: "School District", value: "", key: 'school.district' },
    { title: "School Block", value: "", key: 'school.block' },
    { title: "Asset Item Category", value: "", key: 'item_category' },
    { title: "Asset Category", value: "", key: 'category' },
    { title: "Asset Item Make", value: "", key: 'item_make' },
    { title: "Asset Serial No", value: "", key: 'item_serial_no' },
    { title: "Asset Model Name", value: "", key: 'item_model_name' },
    { title: "Asset Service Provider", value: "", key: 'asset_service_provider' },
    { title: "Asset Service Sla Amount", value: "", key: 'service_sla_amount' },
    { title: "Asset Service Sla Days", value: "", key: 'service_sla_days' },
    { title: "Asset Purchage Date", value: "", key: 'purchase_date' },
    { title: "Asset Warranty End Date", value: "", key: 'warranty_end_date' },
    { title: "Asset Omt Serial Key", value: "", key: 'omt_serial_key' },
    { title: "Description", value: "", key: 'description' },
    { title: "Theft Status", value: "", key: 'theft_status' },
    { title: "Asset Status", value: "", key: 'status' },
  ];

const ViewAssetDetails = ({handleClose, id} : IViewDetails) => {
    const store = useLabAssetStore((state: any) => state)   
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
            if(cur_key === 'purchase_date' || cur_key === 'warranty_end_date'){
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

export default ViewAssetDetails