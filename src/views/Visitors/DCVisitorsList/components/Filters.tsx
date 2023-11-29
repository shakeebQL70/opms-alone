import React, { useState } from 'react'
import { Box, Grid, Paper } from '@mui/material';
import { FieldInput } from "UI/input";
import { RHFAutoComplete } from "UI/select";
import { inputsType } from "UI/utils";
import { useForm } from 'react-hook-form';
import {CustomButton} from 'UI/button'
import DateRangePicker from "UI/daterange";

const Filters = ({data}: {data: any}) => {
    const [selectedRange, setSelectedRange] = useState()
    const {
        watch,
        control,
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<typeof data>({ defaultValues: data });
  return (
    <Paper elevation={0} sx={{ padding: "1rem", mb: "1rem", borderRadius:'10px'  }}>
            <form
                onSubmit={handleSubmit((data) => {
                    console.log(data);
                })}
            >
            <Grid container spacing={2} alignItems={"center"}>
                <Grid item xs={12} md={6} lg={2}>
                    <RHFAutoComplete
                        selectLabel="School Code"
                        placeholder="Search & Select School Code"
                        control={control}
                        registerWith={'schoolCode'}
                        options={[
                            { label: "School 1", id: 1 },
                            { label: "School 2", id: 2 },
                            { label: "School 3", id: 3 },
                        ]}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={2}>
                    <FieldInput
                        type={inputsType.TEXT}
                        label="Designation*"
                        placeholder="Search by designation"
                        control={control}
                        register={register}
                        helperText={errors?.designation?.message}
                        registerWith={'designation'}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={2}>
                    <RHFAutoComplete
                        selectLabel="Visitor Type"
                        placeholder="Search & Select Visitor Type"
                        control={control}
                        registerWith={'visitorType'}
                        options={[
                            { label: 'External to agency', id: 1 },
                            { label: 'Internal to agency', id: 2 },
                        ]}
                    />
                </Grid>
                <Grid item xs={6} md={3} lg={3}>
                    <Box mt={2.2}>
                        <DateRangePicker
                            selectedRange={selectedRange}
                            setSelectedRange={setSelectedRange}
                        />
                    </Box>
                </Grid>

                <Grid item xs={6} md={3} lg={1}>
                        <CustomButton
                            variant="contained"
                            color="primary"
                            type="submit"
                            sx={{ padding: "08px 12px", width: "100%" }}
                            >
                            Search
                        </CustomButton>
                </Grid>
                <Grid item xs={6} md={3} lg={1}>
                    <CustomButton
                        variant="contained"
                        color="primary"
                        type="reset"
                        sx={{ padding: "08px 12px", width: "100%" }}
                    >
                        Reset
                    </CustomButton>
                </Grid>
            </Grid>
            </form>
        </Paper>
  )
}

export default Filters