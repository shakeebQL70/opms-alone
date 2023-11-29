import React from 'react'
import { Grid, Paper, Typography } from '@mui/material'


const Header = () => {
  return (
    <Paper elevation={0} sx={{ padding: "1rem", mb: "1rem", borderRadius:'10px' }}>
      <Grid container justifyContent={"space-between"} alignItems={"center"}>
        <Grid item>
            <Typography variant="h6" component="h3" fontWeight='bold'> Students Details List </Typography>
        </Grid>
      </Grid>
     </Paper>
  )
}

export default Header