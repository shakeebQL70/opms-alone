import React from 'react'
import { Grid, Paper, Typography } from '@mui/material'

interface IHeader{
  handleOpen: Function
}

const Header = ({handleOpen}: IHeader) => {
  return (
    <Paper elevation={0} sx={{ padding: "1rem", mb: "1rem", borderRadius:'10px' }}>
      <Grid container justifyContent={"space-between"} alignItems={"center"}>
        <Grid item>
            <Typography variant="h6" component="h3" fontWeight='bold'> Asset Feedback List </Typography>
        </Grid>
      </Grid>
     </Paper>
  )
}

export default Header