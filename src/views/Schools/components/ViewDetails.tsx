import React, {useState, useEffect} from 'react'
import {
  DialogBody,
  DialogHeader,
  CustomizedDialog,
} from "UI/modal";
import { Box, CircularProgress, Typography } from "@mui/material";
import {useSchoolStore} from 'SUPER/store'
import {
    TableWrapper,
    TableBodyWrapper,
    StyledTableCell,StyledTableRow
} from "UI/table";

interface IViewDetails {
    handleClose: Function;
    id: number
}

const initialState = [
    { title: "UDISE Code", value: '', key: 'udise_code' },
    { title: "BCCL Code", value: "", key: 'bccl_code' },
    { title: "School Name", value: "", key:'name' },
    { title: "School Type", value: "", key: 'type' },
    { title: "PIN", value: '', key:'pincode' },
    { title: "Country", value: "", key:"country" },
    { title: "State", value: "", key:'state' },
    { title: "District", value: "", key:'district' },
    { title: "Block", value: "", key:'block' },
    { title: "Village", value: "", key:'village' },
    { title: "Address", value: "", key:'address' },
    { title: "School Land Line No.", value: "", key:'landline' },
    { title: "School Principal Name", value: "", key:'principal_name' },
    { title: "School Principal Mobile No", value: "", key:'principal_mobile' },
    { title: "Police Station Nearest Name", value: "", key:'policestation_name' },
    { title: "Police Station Nearest Address", value: "", key:"policestation_address" },
    { title: "Police Station Nearest Land Line No", value: 0, key:'policestation_landline' },
    { title: "Police Station Nearest Contact Person", value: "", key:'policestation_contact_person' },
    { title: "Police Station Nearest Contact Person No", value: "", key:'policestation_contact_person_no' },
    { title: "Is ESIC Avail", value: "", key:'is_esic_available' },
    { title: "Is School Active", value: "", key:'isActive' },
    { title: "School Latitude", value: '', key:'latitude' },
    { title: "School Longitude", value: '', key: 'longitude' },
    { title: "SW Code", value: "", key:'sw_code' },
    { title: "SW Activation Key", value: "", key:'sw_activation_key' },
    { title: "Device Token", value: "", key:'devide_token' },
    { title: "Zone", value: 0, key:'zone' }
  ];

const ViewDetails = ({handleClose, id} : IViewDetails) => {
    const schoolStore = useSchoolStore((state: any) => state)   
    const {getDetails, details, actionLoading, actionError} = schoolStore

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
                element.value = details[key]?.toString()
            }   
        }
        setData(newDetails)
    }, [details])


  return (
    <Box>
        <CustomizedDialog open={open} handleClose={handleClose} fullWidth>
            <DialogHeader handleClose={handleClose}>  <Typography variant='h5' component={'h2'}>School Details</Typography> </DialogHeader>
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

export default ViewDetails