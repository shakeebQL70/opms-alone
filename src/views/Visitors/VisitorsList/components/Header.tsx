import React from 'react'
import { Grid, Paper, Typography } from '@mui/material'
import {CustomButton} from 'UI/button'
import {Add} from 'UI/icons'

interface IHeader{
  handleOpen: Function
}

const Header = ({handleOpen}: IHeader) => {
  return (
    <Paper elevation={0} sx={{ padding: "1rem", mb: "1rem", borderRadius:'10px' }}>
      <Grid container justifyContent={"space-between"} alignItems={"center"}>
        <Grid item>
            <Typography variant="h6" component="h3" fontWeight='bold'> Visitor Details List </Typography>
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
                    Add Visitor Details
                  </CustomButton>
              </Grid>
            </Grid>
        </Grid>
      </Grid>
     </Paper>
  )
}

export default Header