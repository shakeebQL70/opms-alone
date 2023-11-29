import { Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { RHFSelect } from "UI/select";
import { useForm } from "react-hook-form";

const statuses = [
    { id: 1, label: "Call Assigned (TD)" },
    { id: 2, label: "Call Assigned (Vendor)" },
    { id: 3, label: "Call Assigned (HD)" }
]

const defaultValues = {
    serviceDesk: 1
}

const Header = () => {
    const {
        watch,
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<typeof defaultValues>({ defaultValues: defaultValues });

    return (
        <Paper elevation={0} sx={{ padding: "0.5rem", mb: "1rem", borderRadius: "10px" }}>
            <Grid container justifyContent={"space-between"} alignItems={"center"}>
                <Grid item>
                    <Typography fontWeight='bold'>Technical Desk</Typography>
                </Grid>
                <Grid item>
                    <RHFSelect
                        selectLabel=""
                        placeholder="Select Status"
                        control={control}
                        registerWith={'serviceDesk'}
                        options={statuses}
                        isRequired={false}
                    />
                </Grid>
            </Grid>
        </Paper>
    );
}

export default Header;