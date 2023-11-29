import React from 'react'
import { Grid, Paper, Typography } from '@mui/material'
import {CustomButton, exportToXLSX} from 'UI/button'
import {Add, Upload, Download} from 'UI/icons'
import { LabAssetTemplate } from '../helper'

interface IHeader{
  handleOpen: Function
}

const Header = ({handleOpen}: IHeader) => {
  return (
    <Paper elevation={0} sx={{ padding: "1rem", mb: "1rem", borderRadius:'10px' }}>
      <Grid container justifyContent={"space-between"} alignItems={"center"}>
        <Grid item>
            <Typography variant="h6" component="h3" fontWeight='bold'> Asset Details List </Typography>
        </Grid>
        <Grid item>
            <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
            gap={2}
            >
              <Grid item>
                  <CustomButton
                    variant="contained"
                    color="primary"
                    startIcon={<Add />}
                    onClick={() => handleOpen(1)}
                  >
                    Add Lab Asset
                  </CustomButton>
              </Grid>
              <Grid item>
                  <CustomButton
                    variant="contained"
                    color="primary"
                    startIcon={<Upload />}
                  >
                    Lab Asset Bulk Upload
                  </CustomButton>
              </Grid>
              <Grid item>
                  <CustomButton
                    variant="contained"
                    color="primary"
                    startIcon={<Download />}
                    onClick={() => exportToXLSX(LabAssetTemplate, 'Student Details Template')}
                  >
                    Download Template
                  </CustomButton>
              </Grid>
            </Grid>
        </Grid>
      </Grid>
     </Paper>
  )
}

export default Header