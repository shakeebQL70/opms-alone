import React, {useEffect, useMemo} from 'react'
import {
  DialogBody,
  DialogHeader,
  CustomizedDialog,
} from "UI/modal";
import { Box, Typography, CircularProgress } from "@mui/material";
import ViewDetails from './ViewDetails';
import {useProjectStore} from 'SUPER/store'
import { initialDetails } from '../helper/initialData';

interface IView {
    handleClose: Function;
    id: number;
}

const View = ({handleClose, id} : IView) => {
  const projects = useProjectStore((state: any) => state)
  const {dataById, dataLoading, getDataById} = projects || {}

  const details = useMemo(() => {
    return initialDetails.map((data) => ({...data, value: dataById[data.key]}))
  }, [dataById])

  useEffect(() => {
    getDataById(id)
  }, [id])

  return (
    <Box>
        <CustomizedDialog open={open} handleClose={handleClose} fullWidth>
            <DialogHeader handleClose={handleClose}>  <Typography variant='h5' component={'h2'}>View Project Details</Typography> </DialogHeader>
            <DialogBody> 
              {
                dataLoading ?
                <Box height={500} display='flex' justifyContent='center' alignItems='center'>
                  <CircularProgress />
                </Box> :
                <ViewDetails data={details} />
              }
            </DialogBody>
        </CustomizedDialog>
    </Box>
  )
}

export default View