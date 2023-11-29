import React, {useEffect, useState} from 'react'
import { Backdrop, Box, CircularProgress, Grid, Typography } from '@mui/material';
import { useForm } from "react-hook-form";
import {useTeacherStore} from 'SUPER/store'
import { RHFAutoComplete } from "UI/select";
import { FieldInput, RadioInputGroup } from "UI/input";
import { inputsType } from "UI/utils";
import {
  DialogBody,
  DialogHeader,
  CustomizedDialog,DialogFooter
} from "UI/modal";
import {CustomButton} from 'UI/button'
import { getAllStates, getDistrictFromState} from "UI/indianStateAndDistrict";
import useSelectorOptions from '../../../hooks/useSelectorOptions';
import { allClasses, allGenders, allQualifications, allSessions, allSubject, allTeachersCategory, schoolCodes } from '../../../utils/data';

interface IAddEdit {
    handleClose: Function;
    edit: boolean;
    id: number;
}

const defaultValues: any = {
    teacherName: '',
    gender: '',
    ict_trained: '',
    mobileNumber: '',
    schoolName: null,
    class: null,
    subject: null,
    teacherQualification: null,
    teacherSkills: '',
    teacherCategory: null,
    experience: '',
    state: null,
    district: null,
    country: null,
    village: '',
    session: null
  }

const AddEditTeacher = ({handleClose, edit, id} : IAddEdit) => {
    const teacherStore = useTeacherStore((state: any) => state)
    const {actionError, actionMessage, actionLoading, createTeacher, updateTeacher, getDetails, details} = teacherStore 
    const selectorOptions = useSelectorOptions()
    const {schoolsList, schoolsLoading} = selectorOptions || {}
    const {
        watch,
        control,
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<typeof defaultValues>({ defaultValues });

    const stateOptions = getAllStates()
    const selectedState: {label: string, id: string} = watch('state');
    const gender: string = watch('gender');
    const ict: string = watch('ict_trained');

    const districtOptions: any[] = React.useMemo(() => {
        if (selectedState) {
            return getDistrictFromState(selectedState?.label || '') || [];
        }
        return [];
    }, [selectedState]);

    const handleAdd = async (data: any) => {
        await createTeacher(data)
    }

    const handleUpdate = async (data: any) => {
        await updateTeacher(data, id)
    }

    useEffect(() => {
        if(id && edit){
            getDetails(id.toString())
        }
    }, [])

    useEffect(() => {
        if(details?.id && edit){
            const schoolName = schoolCodes.filter((school) => school.label === details?.school?.name )
            const cur_class = allClasses.filter((item) => details?.class_taught?.includes(item.id))
            const cur_sub = allSubject.filter((item) => details?.appointed_subject?.includes(item.label))
            const cur_qualifications = allQualifications.filter((item) => details?.qualification === item.value)
            const cur_category = allTeachersCategory.filter((item) => details?.category === item.value)
            const cur_session = allSessions.filter((item) => details?.session === item.value)
            const cur_state = {label: details?.state, value: details?.state, id: details?.state}
            const cur_dist = {label: details?.district, value: details?.district, id: details?.district}
            const cur_country = {label: 'India', id: 1}
            const cur_experience = details?.experience?.split(' ')?.[0]

            setValue('teacherName', details.name);
            setValue('gender', details.gender);
            setValue('ict_trained', details.ict_trained);
            setValue('mobileNumber', details.mobile);
            setValue('schoolName', schoolName[0] || '');
            setValue('class', cur_class?.[0]);
            setValue('subject', cur_sub?.[0]);
            setValue('teacherQualification', cur_qualifications?.[0]);
            setValue('teacherSkills', details?.skills);
            setValue('teacherCategory', cur_category?.[0]);
            setValue('experience', cur_experience);
            setValue('state', cur_state);
            setValue('district', cur_dist);
            setValue('country', cur_country);
            setValue('village', details?.village);
            setValue('session', cur_session?.[0]);
        }
    }, [details])

    return <CustomizedDialog open={open} handleClose={handleClose} fullWidth maxWidth="lg">
        <DialogHeader handleClose={handleClose}>  <Typography variant='h5' component={'h2'}>{edit ? 'Edit' : 'Add'} Teacher Details</Typography> </DialogHeader>
        <form
            onSubmit={handleSubmit(async (data) => {
                const payload = {
                    "school_id": data.schoolName?.id,
                    "name": data.teacherName,
                    "gender": data.gender,
                    "mobile": data.mobileNumber,
                    "class_taught": [data?.class?.id],
                    "appointed_subject": [data.subject.label],
                    "qualification": data?.teacherQualification?.value,
                    "skills": data?.teacherSkills,
                    "category": data.teacherCategory?.value,
                    "ict_trained": data?.ict_trained,
                    "experience": `${data.experience} years`,
                    "state": data.state.value,
                    "district": data.district.value,
                    "village": data.village,
                    "session": data.session.value,
                }
                if(edit){
                    handleUpdate(payload)
                }else {
                    handleAdd(payload)
                }
            })}
        >
            <DialogBody> 
                <Box>
                        <Grid container columnSpacing={2}>
                            <Grid item xs={12} md={6}>
                                <RHFAutoComplete
                                    selectLabel="School Name*"
                                    placeholder="Search & Select School"
                                    control={control}
                                    registerWith={'schoolName'}
                                    options={schoolCodes}
                                    error={!!errors.schoolName?.message}
                                    errorMessage={errors.schoolName?.message}
                                    isRequired={true}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FieldInput
                                    type={inputsType.TEXT}
                                    fullWidth
                                    label="Teacher Name*"
                                    placeholder="Enter teacher name"
                                    isError={!!errors.teacherName?.message}
                                    control={control}
                                    register={register}
                                    helperText={errors?.teacherName?.message}
                                    registerWith={'teacherName'}
                                    isRequired={true}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <RadioInputGroup
                                    isRow
                                    label="Gender*"
                                    control={control}
                                    registerWith={'gender'}
                                    options={allGenders}
                                    defaultValue={gender}
                                    isError={!!errors.gender?.message}
                                    helperText={errors?.gender?.message}
                                    isRequired={true}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <RadioInputGroup
                                    isRow
                                    label="ICT Trained*"
                                    control={control}
                                    registerWith={'ict_trained'}
                                    options={[
                                        { label: 'YES', value:'yes' },
                                        { label: 'NO', value:'no' },
                                    ]}
                                    defaultValue={ict}
                                    isError={!!errors.ict_trained?.message}
                                    helperText={errors?.ict_trained?.message}
                                    isRequired={true}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FieldInput
                                    type={inputsType.NUMBER}
                                    fullWidth
                                    label="Mobile*"
                                    placeholder="Enter mobile number"
                                    isError={!!errors.mobileNumber?.message}
                                    control={control}
                                    register={register}
                                    helperText={errors?.mobileNumber?.message}
                                    registerWith={'mobileNumber'}
                                    isRequired={true}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <RHFAutoComplete
                                    selectLabel="Class Taught*"
                                    placeholder="Search & Select Class"
                                    control={control}
                                    registerWith={'class'}
                                    options={allClasses}
                                    error={!!errors.class?.message}
                                    errorMessage={errors.class?.message}
                                    isRequired={true}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <RHFAutoComplete
                                    selectLabel="Appointed For*"
                                    placeholder="Search & Select Subject"
                                    control={control}
                                    registerWith={'subject'}
                                    options={allSubject}
                                    error={!!errors.subject?.message}
                                    errorMessage={errors.subject?.message}
                                    isRequired={true}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <RHFAutoComplete
                                    selectLabel="Teacher Qualification*"
                                    placeholder="Search & Select Qualification"
                                    control={control}
                                    registerWith={'teacherQualification'}
                                    options={allQualifications}
                                    error={!!errors.teacherQualification?.message}
                                    errorMessage={errors.teacherQualification?.message}
                                    isRequired={true}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FieldInput
                                    type={inputsType.TEXT}
                                    fullWidth
                                    label="Teacher Skills*"
                                    placeholder="Enter skills"
                                    isError={!!errors.teacherSkills?.message}
                                    control={control}
                                    register={register}
                                    helperText={errors?.teacherSkills?.message}
                                    registerWith={'teacherSkills'}
                                    isRequired={true}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <RHFAutoComplete
                                    selectLabel="Teacher Category*"
                                    placeholder="Search & Select Category"
                                    control={control}
                                    registerWith={'teacherCategory'}
                                    options={allTeachersCategory}
                                    error={!!errors.teacherCategory?.message}
                                    errorMessage={errors.teacherCategory?.message}
                                    isRequired={true}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FieldInput
                                    type={inputsType.NUMBER}
                                    fullWidth
                                    label="Experience*"
                                    placeholder="Enter experience"
                                    isError={!!errors.experience?.message}
                                    control={control}
                                    register={register}
                                    helperText={errors?.experience?.message}
                                    registerWith={'experience'}
                                    isRequired={true}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FieldInput
                                    type={inputsType.TEXT}
                                    fullWidth
                                    label="Village*"
                                    placeholder="Enter village"
                                    isError={!!errors.village?.message}
                                    control={control}
                                    register={register}
                                    helperText={errors?.village?.message}
                                    registerWith={'village'}
                                    isRequired={true}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <RHFAutoComplete
                                    selectLabel="State"
                                    placeholder="Select State"
                                    control={control}
                                    registerWith={'state'}
                                    options={stateOptions}
                                    error={!!errors.state?.message}
                                    errorMessage={errors.state?.message}
                                    isRequired={true}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <RHFAutoComplete
                                    selectLabel="District"
                                    placeholder="Select District"
                                    control={control}
                                    registerWith={'district'}
                                    options={districtOptions}
                                    error={!!errors.district?.message}
                                    errorMessage={errors.district?.message}
                                    isRequired={true}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <RHFAutoComplete
                                    selectLabel="Country*"
                                    placeholder="Select Country"
                                    control={control}
                                    registerWith={'country'}
                                    options={[
                                        { label: "India", id: 1 },
                                    ]}
                                    error={!!errors.country?.message}
                                    errorMessage={errors.country?.message}
                                    isRequired={true}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <RHFAutoComplete
                                    selectLabel="Session*"
                                    placeholder="Select Session"
                                    control={control}
                                    registerWith={'session'}
                                    options={allSessions}
                                    error={!!errors.session?.message}
                                    errorMessage={errors.session?.message}
                                    isRequired={true}
                                />
                            </Grid>
                        </Grid>
                </Box>
            </DialogBody>
            <DialogFooter>
                <Box display='flex' gap='10px' justifyContent='flex-end' px={2}>
                    <CustomButton variant="contained" type="submit" color="primary" disabled={actionLoading}>
                        {edit ? actionLoading ? 'Updating....' : 'Update' : actionLoading ? 'Saving....' : 'Save'}
                    </CustomButton>
                    <CustomButton
                        variant="contained"
                        color="error"
                        type="reset"
                        onClick={handleClose}
                        disabled={actionLoading}
                    >
                        Cancel
                    </CustomButton>
                </Box>
            </DialogFooter>
        </form>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={actionLoading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    </CustomizedDialog>

}

export default AddEditTeacher