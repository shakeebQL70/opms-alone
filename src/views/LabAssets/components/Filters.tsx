import React from 'react'
import { Grid, Paper } from '@mui/material';
import { FieldInput } from "UI/input";
import { RHFAutoComplete } from "UI/select";
import { inputsType } from "UI/utils";
import { useForm } from 'react-hook-form';
import {CustomButton} from 'UI/button'
import { allClasses, allGenders, allSessions, schoolCodes } from '../../../utils/data';

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
                        options={schoolCodes}
                        error={!!errors.schoolCode?.message}
                        errorMessage={errors.schoolCode?.message}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={2}>
                    <RHFAutoComplete
                        selectLabel="Component"
                        placeholder="Select Component"
                        control={control}
                        registerWith={'component'}
                        options={[]}
                        error={!!errors.component?.message}
                        errorMessage={errors.component?.message}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={2}>
                    <RHFAutoComplete
                        selectLabel="Items"
                        placeholder="Select Item"
                        control={control}
                        registerWith={'item'}
                        options={allClasses}
                        error={!!errors.item?.message}
                        errorMessage={errors.item?.message}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={2}>
                    <FieldInput
                        type={inputsType.TEXT}
                        label="Serial Number*"
                        placeholder="Enter serial number"
                        control={control}
                        register={register}
                        registerWith={"serialNumber"}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={2}>
                    <RHFAutoComplete
                        selectLabel="Status"
                        placeholder="Select Status"
                        control={control}
                        registerWith={'status'}
                        options={allSessions}
                        error={!!errors.status?.message}
                        errorMessage={errors.status?.message}
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