import React, {useEffect} from 'react'
import {
  DialogBody,
  DialogFooter,
  DialogHeader,
  CustomizedDialog,
} from "UI/modal";
import { Box, Grid, Typography, Backdrop, CircularProgress } from "@mui/material";
import { CustomButton } from "UI/button";
import { RHFAutoComplete } from "UI/select";
import { FieldInput } from "UI/input";
import { inputsType, RegisterOption } from "UI/utils";
import {useProjectStore} from 'SUPER/store'
import { useForm } from 'react-hook-form';
import { getAllStates} from "UI/indianStateAndDistrict";
import { initialDetails } from '../helper/initialData';
import { allCurrency, allProjectScheme } from '../../../utils/data';

interface IEdit {
    handleClose: Function;
    id: number;
}

const defaultValues = initialDetails.reduce((acc: any, item) => {
    acc[item.key] = item.value;
    return acc;
}, {});

const EditDetails = ({handleClose, id} : IEdit) => {
    const projects = useProjectStore((state: any) => state)
    const {updateData, updating, updateError, dataById, dataLoading, getDataById} = projects
    const states = getAllStates();

    const {
        watch,
        control,
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm<typeof defaultValues>({ defaultValues });
    
    useEffect(() => {
        getDataById(id)
    }, [id])
    

    useEffect(() => {
        setValue('name', dataById['name'])
        setValue('client_name', dataById['client_name'])
        setValue('department_name', dataById['department_name'])
        setValue('state', dataById['state'])
        setValue('scheme', dataById['scheme'])
        setValue('scheme_other', dataById['scheme_other'])
        setValue('value', dataById['value'])
        setValue('value_currency', dataById['value_currency'])
        setValue('brief', dataById['brief'])
        setValue('number_of_schools', dataById['number_of_schools'])
        setValue('number_of_hd', dataById['number_of_hd'])
        setValue('number_of_td', dataById['number_of_td'])
        setValue('number_of_control_total', dataById['number_of_control_total'])
        setValue('number_of_zonal_coordinator', dataById['number_of_zonal_coordinator'])
        setValue('number_of_district_coordinator', dataById['number_of_district_coordinator'])
        setValue('number_of_school_coordinator', dataById['number_of_school_coordinator'])
        setValue('manpower_sla_days', dataById['manpower_sla_days'])
        setValue('manpower_penalty_per_day', dataById['manpower_penalty_per_day'])
        setValue('hardware_sla_days', dataById['hardware_sla_days'])
        setValue('hardware_penalty_per_day', dataById['hardware_penalty_per_day'])
    }, [dataById])

  return (
    <Box>
        <CustomizedDialog open={open} handleClose={handleClose} fullWidth maxWidth="lg">
            <DialogHeader handleClose={handleClose}>  <Typography variant='h5' component={'h2'}>Edit Project Details</Typography> </DialogHeader>
            <form
                onSubmit={handleSubmit((data) => {
                    updateData(
                        {...data, scheme: data?.scheme.label, value_currency: data?.value_currency?.label},
                        id
                    )
                })}
            >
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={dataLoading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <DialogBody> 
                    <Grid container columnSpacing={2}>
                        <Grid item xs={12} md={12}>
                            <FieldInput
                                type={inputsType.TEXT}
                                fullWidth
                                label="Project Name*"
                                placeholder="Project Name"
                                isError={!!errors.name?.message}
                                control={control}
                                register={register}
                                helperText={errors?.name?.message}
                                registerWith={'name'}
                                isRequired={true}
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <FieldInput
                                type={inputsType.TEXT}
                                fullWidth
                                label="Project Brief"
                                placeholder="Project Brief"
                                isError={!!errors.brief?.message}
                                control={control}
                                register={register}
                                helperText={errors?.brief?.message}
                                registerWith={'brief'}
                            />
                        </Grid>
                    </Grid>
                    <Grid container  spacing={2}>
                        <Grid item xs={12} md={6}>
                        <FieldInput
                            type={inputsType.TEXT}
                            fullWidth
                            label="Client name*"
                            placeholder="Client name"
                            isError={!!errors.client_name?.message}
                            control={control}
                            register={register}
                            helperText={errors?.client_name?.message}
                            registerWith={'client_name'}
                            isRequired={true}
                        />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FieldInput
                                type={inputsType.TEXT}
                                fullWidth
                                label="Department name*"
                                placeholder="Department name"
                                isError={!!errors.department_name?.message}
                                control={control}
                                register={register}
                                helperText={errors?.department_name?.message}
                                registerWith={'department_name'}
                                isRequired={true}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <RHFAutoComplete
                                selectLabel="Project In State*"
                                placeholder="State"
                                control={control}
                                registerWith={'state'}
                                options={states}
                                error={!!errors.state?.message}
                                errorMessage={errors.state?.message}
                                isRequired={true}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <RHFAutoComplete
                                selectLabel="Project Under Scheme*"
                                placeholder="Scheme"
                                control={control}
                                registerWith={'scheme'}
                                options={allProjectScheme}
                                error={!!errors.scheme?.message}
                                errorMessage={errors.scheme?.message}
                                isRequired={true}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FieldInput
                            type={inputsType.TEXT}
                            fullWidth
                            label="Project Under Scheme Other"
                            placeholder="Enter scheme"
                            isError={!!errors.scheme_other?.message}
                            control={control}
                            register={register}
                            helperText={errors?.scheme_other?.message}
                            registerWith={'scheme_other'}
                        />
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <FieldInput
                                type={inputsType.TEXT}
                                fullWidth
                                label="Project Value"
                                placeholder="Project Value"
                                isError={!!errors.value?.message}
                                control={control}
                                register={register}
                                helperText={errors?.value?.message}
                                registerWith={'value'}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <RHFAutoComplete
                                selectLabel="Project Value Currency"
                                placeholder="Currency"
                                control={control}
                                registerWith={'value_currency'}
                                options={allCurrency}
                                error={!!errors.value_currency?.message}
                                errorMessage={errors.value_currency?.message}
                            />
                        </Grid>
                    </Grid>
                    <Grid container  spacing={2}>
                        <Grid item xs={12} md={4}>
                        <FieldInput
                            type={inputsType.NUMBER}
                            fullWidth
                            label="Number of schools"
                            placeholder="Number of schools"
                            isError={!!errors.number_of_schools?.message}
                            control={control}
                            register={register}
                            helperText={errors?.number_of_schools?.message}
                            registerWith={'number_of_schools'}
                        />
                        </Grid>
                        <Grid item xs={12} md={4}>
                        <FieldInput
                            type={inputsType.NUMBER}
                            fullWidth
                            label="Number Of HD"
                            placeholder="Number of hd"
                            isError={!!errors.number_of_hd?.message}
                            control={control}
                            register={register}
                            helperText={errors?.number_of_hd?.message}
                            registerWith={'number_of_hd'}
                        />
                        </Grid>
                        <Grid item xs={12} md={4}>
                        <FieldInput
                            type={inputsType.NUMBER}
                            fullWidth
                            label="Number Of TD"
                            placeholder="Number of td"
                            isError={!!errors.number_of_td?.message}
                            control={control}
                            register={register}
                            helperText={errors?.number_of_td?.message}
                            registerWith={'number_of_td'}
                        />
                        </Grid>
                    </Grid>
                    <Grid container  columnSpacing={2}>
                        <Grid item xs={12} md={6}>
                        <FieldInput
                            type={inputsType.NUMBER}
                            fullWidth
                            label="Number Of Control Total"
                            placeholder="Number of control total"
                            isError={!!errors.number_of_control_total?.message}
                            control={control}
                            register={register}
                            helperText={errors?.number_of_control_total?.message}
                            registerWith={'number_of_control_total'}
                        />
                        </Grid>
                        <Grid item xs={12} md={6}>
                        <FieldInput
                            type={inputsType.NUMBER}
                            fullWidth
                            label="Number Of Zonal Coordinator"
                            placeholder="Number of zonal coordinator"
                            isError={!!errors.number_of_zonal_coordinator?.message}
                            control={control}
                            register={register}
                            helperText={errors?.number_of_zonal_coordinator?.message}
                            registerWith={'number_of_zonal_coordinator'}
                        />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FieldInput
                                type={inputsType.NUMBER}
                                fullWidth
                                label="Number Of District Coordinator"
                                placeholder="Number of District coordinator"
                                isError={!!errors.number_of_district_coordinator?.message}
                                control={control}
                                register={register}
                                helperText={errors?.number_of_district_coordinator?.message}
                                registerWith={'number_of_district_coordinator'}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FieldInput
                                type={inputsType.NUMBER}
                                fullWidth
                                label="Number Of School Coordinator"
                                placeholder="Number of School coordinator"
                                isError={!!errors.number_of_school_coordinator?.message}
                                control={control}
                                register={register}
                                helperText={errors?.number_of_school_coordinator?.message}
                                registerWith={'number_of_school_coordinator'}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FieldInput
                                type={inputsType.NUMBER}
                                fullWidth
                                label="ManPower SLA Days"
                                placeholder="ManPower SLA Days"
                                isError={!!errors.manpower_sla_days?.message}
                                control={control}
                                register={register}
                                helperText={errors?.manpower_sla_days?.message}
                                registerWith={'manpower_sla_days'}
                            />
                        </Grid>
                        
                        <Grid item xs={12} md={6}>
                            <FieldInput
                                type={inputsType.NUMBER}
                                fullWidth
                                label="ManPower Penalty Per Day"
                                placeholder="ManPower Penalty Per Day"
                                isError={!!errors.manpower_penalty_per_day?.message}
                                control={control}
                                register={register}
                                helperText={errors?.manpower_penalty_per_day?.message}
                                registerWith={'manpower_penalty_per_day'}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FieldInput
                                type={inputsType.NUMBER}
                                fullWidth
                                label="HardWare SLA Days"
                                placeholder="HardWare SLA Days"
                                isError={!!errors.hardware_sla_days?.message}
                                control={control}
                                register={register}
                                helperText={errors?.hardware_sla_days?.message}
                                registerWith={'hardware_sla_days'}
                            />
                        </Grid>
                        
                        <Grid item xs={12} md={6}>
                            <FieldInput
                                type={inputsType.NUMBER}
                                fullWidth
                                label="HardWare Penalty Per Day"
                                placeholder="HardWare Penalty Per Day"
                                isError={!!errors.hardware_penalty_per_day?.message}
                                control={control}
                                register={register}
                                helperText={errors?.hardware_penalty_per_day?.message}
                                registerWith={'hardware_penalty_per_day'}
                            />
                        </Grid>
                    </Grid>
                </DialogBody>
                <DialogFooter>
                    <div className="flex gap-4 justify-end">
                        <CustomButton variant="contained" type="submit" color="primary" disabled={updating}>
                            {updating ? 'Updating...' : 'Update'}
                        </CustomButton>
                        <CustomButton
                            variant="outline"
                            color="primary"
                            type="reset"
                            onClick={handleClose}
                            disabled={updating}
                        >
                            Cancel
                        </CustomButton>
                    </div>
                </DialogFooter>
            </form>
        </CustomizedDialog>
    </Box>
  )
}

export default EditDetails