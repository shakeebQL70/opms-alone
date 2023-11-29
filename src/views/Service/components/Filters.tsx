import React, { useState } from "react"
import { Paper, Grid } from "@mui/material"
import { inputsType } from "UI/utils";
import { FieldInput } from "UI/input";
import { RHFAutoComplete } from "UI/select";
import { useForm } from "react-hook-form";
import { BasicSelect, RHFSelect } from "UI/select";
import { CustomButton } from "UI/button";
import DateRangePicker from "UI/daterange";

import { schoolCodes } from "../../../utils/data";

const statuses = [
    { id: 1, label: "Open" },
    { id: 2, label: "Closed" },
    { id: 3, label: "Resolved" },
    { id: 4, label: "Process to Service Provider" },
    { id: 5, label: "No Part of SOW" },
]

const component = [
    { id: 1, label: "Desktop" },
    { id: 2, label: "IR Camera" },
    { id: 3, label: "Monitor" },
    { id: 4, label: "Printer" },
    { id: 5, label: "Projector" },
    { id: 6, label: "Speaker" },
    { id: 7, label: "Stabilizer" },
    { id: 8, label: "Thin Client" },
    { id: 9, label: "UPS" },
]

const defaultValuesFilter = {
    tokenNo:'',
    collegeCode:'',
    schoolCodes:"",
    component:"",
    status:"",
    dateRange:""
}


const Filters = ({ data }: { data: any }) => {
    const [selectedRange, setSelectedRange] = useState("");
   
    const {
        watch,
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<typeof defaultValuesFilter>({ defaultValues: defaultValuesFilter });

    return (
        <Paper elevation={0} sx={{ padding: "1rem", mb: "1rem", borderRadius: '10px' }}>
            <form>
                <Grid container spacing={2} alignItems={"center"}>
                    <Grid item xs={12} md={5} lg={2}>
                        <FieldInput
                            type={inputsType.TEXT}
                            fullWidth
                            placeholder="Token No."
                            isError={!!errors.tokenNo?.message}
                            control={control}
                            register={register}
                            helperText={errors?.tokenNo?.message}
                            registerWith={"tokenNo"}

                        />
                    </Grid>
                    <Grid item xs={12} md={5} lg={3}>
                        <RHFAutoComplete
                            placeholder="Search & Select School Code"
                            control={control}
                            registerWith={'school'}
                            options={schoolCodes}
                        />
                    </Grid>
                    <Grid item xs={12} md={5} lg={2}>
                        <RHFSelect
                            selectLabel=""
                            placeholder="Select Component"
                            control={control}
                            registerWith={'component'}
                            options={component}
                            isRequired={false}
                        />
                    </Grid>
                    <Grid item xs={12} md={5} lg={2}>
                    <RHFSelect
                            selectLabel=""
                            placeholder="Select Status"
                            control={control}
                            registerWith={'status'}
                            options={statuses}
                            isRequired={false}
                        />
                    </Grid>
                    <Grid item xs={12} md={5} lg={3}>
                        <DateRangePicker
                            selectedRange={selectedRange}
                            setSelectedRange={setSelectedRange}
                        />
                    </Grid>
                    <Grid item xs={12} md={5} lg={2}>
                        <Grid container alignItems={"center"} spacing={2}>
                            <Grid item xs={6} md={6} lg={6}>
                                <CustomButton
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    sx={{ padding: "07px 12px", width: "100%" }}
                                >
                                    Search
                                </CustomButton>
                            </Grid>
                            <Grid item xs={6} md={6} lg={6}>
                                <CustomButton
                                    variant="contained"
                                    color="primary"
                                    type="reset"
                                    sx={{ padding: "07px 12px", width: "100%" }}
                                >
                                    Reset
                                </CustomButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    )
}

export default Filters;