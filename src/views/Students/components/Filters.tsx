import React from 'react'
import { Grid, Paper } from '@mui/material';
import { FieldInput } from "UI/input";
import { RHFAutoComplete } from "UI/select";
import { inputsType } from "UI/utils";
import { useForm } from 'react-hook-form';
import {CustomButton} from 'UI/button'

const Filters = ({data}: {data: any}) => {
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
                        error={!!errors.schoolCode?.message}
                        errorMessage={errors.schoolCode?.message}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={2}>
                    <RHFAutoComplete
                        selectLabel="District"
                        placeholder="Select District"
                        control={control}
                        registerWith={'district'}
                        options={[]}
                        error={!!errors.district?.message}
                        errorMessage={errors.district?.message}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={2}>
                    <RHFAutoComplete
                        selectLabel="Class Taught"
                        placeholder="Select Class"
                        control={control}
                        registerWith={'class'}
                        options={[
                            { label: 6, id: 1 },
                            { label: 7, id: 2 },
                            { label: 8, id: 3 },
                            { label: 9, id: 4 },
                            { label: 10, id: 5 },
                            { label: 11, id: 6 },
                            { label: 12, id: 7 },
                        ]}
                        error={!!errors.class?.message}
                        errorMessage={errors.class?.message}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={2}>
                    <RHFAutoComplete
                        selectLabel="Gender"
                        placeholder="Select Gender"
                        control={control}
                        registerWith={'gender'}
                        options={[
                            { label: "Male", id: 1 },
                            { label: "Female", id: 2 },
                        ]}
                        error={!!errors.gender?.message}
                        errorMessage={errors.gender?.message}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={2}>
                    <RHFAutoComplete
                        selectLabel="Session"
                        placeholder="Select Session"
                        control={control}
                        registerWith={'session'}
                        options={[
                            { label: "2022-2023", id: 1 },
                            { label: "2023-2024", id: 2 },
                            { label: "2024-2025", id: 3 },
                            { label: "2025-2026", id: 4 },
                        ]}
                        error={!!errors.session?.message}
                        errorMessage={errors.session?.message}
                    />
                </Grid>
                
                <Grid container alignItems={"center"} justifyContent="flex-end" spacing={2}>
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
            </Grid>
            </form>
        </Paper>
  )
}

export default Filters