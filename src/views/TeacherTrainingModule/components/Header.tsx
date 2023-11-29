import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import { CustomButton } from 'UI/button';
import { Add } from 'UI/icons'

interface IHeader {
    handleOpen: Function
}

const Header = ({ handleOpen }: IHeader) => {
    return (
        <Paper elevation={0} sx={{ padding: "0.5rem", mb: "1rem", borderRadius: "10px" }}>
            <Grid container justifyContent={"space-between"} alignItems={"center"}>
                <Grid item>
                    <Typography fontWeight='bold'>Teacher Training List</Typography>
                </Grid>
                <Grid item>
                    <CustomButton
                        variant="contained"
                        color="primary"
                        startIcon={<Add />}
                        onClick={() => handleOpen()}
                    >
                        Add Teacher Training
                    </CustomButton>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default Header;