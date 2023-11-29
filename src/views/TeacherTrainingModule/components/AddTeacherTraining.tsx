import React, { useEffect } from 'react'
import { Box, Grid, Typography, Backdrop, CircularProgress } from '@mui/material';
import { useForm } from "react-hook-form";
import { RHFAutoComplete, RHFSelect } from "UI/select";
import { FieldInput, RadioInputGroup } from "UI/input";
import { inputsType } from "UI/utils";
import { useTeacherTrainingStore } from 'SUPER/store'
import { getAllStates, getDistrictFromState } from "UI/indianStateAndDistrict";
import {
    DialogBody,
    DialogHeader,
    CustomizedDialog, DialogFooter
} from "UI/modal";
import { CustomButton } from 'UI/button'
import { allResidential, allSessions, allSubject, allTeachers, allTrainingBatch, schoolCodes } from '../../../utils/data';

interface IAddEditSchool {
    handleClose: Function;
    edit: boolean;
    id?: number
}

// type TDfaultValue = {
//     project_id: string,
//     project_name: null,
//     district: null,
//     state: null,
//     type_of_residential: null,
//     training_branch: null,
//     school_id: '',
//     school_name: null,
//     teacher_name: null,
//     teacher_contact: '',
//     training_subject: null,
//     trainer_name: '',
//     trainer_contact: '',
//     number_of_trainers: '',
//     training_center: null,
//     training_start_date: '',
//     training_end_date: '',
//     session: null,
//     duration: ''
// }

const defaultValues = {
    project_id:'',
    project_name: null,
    district: null,
    type_of_residential: null,
    training_branch: null,
    school_id: '',
    school_name: null,
    teacher_name: null,
    teacher_contact: '',
    training_subject: null,
    trainer_name: '',
    trainer_contact: '',
    number_of_trainers: '',
    training_center: null,
    training_start_date: '',
    training_end_date: '',
    session: null,
    duration: '',
    state: null,
}

const AddTeacherTraining = ({ handleClose, edit, id }: IAddEditSchool) => {
    const store = useTeacherTrainingStore((state: any) => state)
    const {createTeacher, actionLoading, updateTeacher, getDetails, details} = store
    const {
        watch,
        control,
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm({ defaultValues });

    const stateOptions = getAllStates()
    const selectedState: any = watch('state');

    const districtOptions: any[] = React.useMemo(() => {
        if (selectedState) {
            return getDistrictFromState(selectedState?.label || '') || [];
        }
        return [];
    }, [selectedState]);
    
    useEffect(() => {
        if(id && edit){
            getDetails(id.toString())
        }
    }, [id])

    useEffect(() => {
        if(details?.id && edit){
          
        }
    }, [details])

    const handleAdd = async(data: any) => {
        await createTeacher(data)
    }
    const handleEdit = async(data: any) => {
        await updateTeacher(data, id)
    }

    return <CustomizedDialog open={open} handleClose={handleClose} fullWidth maxWidth={'md'}>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={actionLoading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
        <DialogHeader handleClose={handleClose}>  <Typography variant='h5' component={'h2'}>{edit ? 'Edit' : 'Add'} Teacher Training</Typography> </DialogHeader>
        <form
            onSubmit={handleSubmit((data: any) => {
                const payload = {
                    ...data,
                    type_of_residential: data?.type_of_residential?.value,
                    district: data?.district?.value,
                    training_branch: data?.training_branch?.value,
                    school_id: data?.school_name?.id,
                    teacher_name: data?.teacher_name?.value,
                    teacher_contact: data?.teacher_contact?.value,
                    training_subject: data?.training_subject?.value,
                    training_center: data?.training_center?.value,
                    session: data?.session?.value
                }
                if (edit) {
                    handleEdit(payload);
                } else {
                    handleAdd(payload)
                }
            })}
        >
            <DialogBody>
                <Box>
                    <Grid container columnSpacing={2}>
                        <Grid item xs={12} md={6}>
                            <RHFAutoComplete
                                selectLabel="Project Name"
                                placeholder="Search & Select Project Name"
                                control={control}
                                registerWith={'project_name'}
                                options={schoolCodes}
                                error={!!errors.project_name?.message}
                                errorMessage={errors.project_name?.message}
                                isRequired={true}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <RHFAutoComplete
                                selectLabel="State"
                                placeholder="Search & Select State"
                                control={control}
                                registerWith={'state'}
                                options={districtOptions}
                                error={!!errors.state?.message}
                                errorMessage={errors.state?.message}
                                isRequired={true}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <RHFAutoComplete
                                selectLabel="District"
                                placeholder="Search & Select District"
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
                                selectLabel="Type of Residential"
                                placeholder="Select Residential"
                                control={control}
                                registerWith={'type_of_residential'}
                                options={allResidential}
                                error={!!errors.type_of_residential?.message}
                                errorMessage={errors.type_of_residential?.message}
                                isRequired={true}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <RHFAutoComplete
                                selectLabel="Training Batch"
                                placeholder="Search & Select Training Batch"
                                control={control}
                                registerWith={'training_branch'}
                                options={allTrainingBatch}
                                error={!!errors.training_branch?.message}
                                errorMessage={errors.training_branch?.message}
                                isRequired={true}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <RHFAutoComplete
                                selectLabel="School Name"
                                placeholder="Search & Select School Code"
                                control={control}
                                registerWith={'school_name'}
                                options={schoolCodes}
                                error={!!errors.school_name?.message}
                                errorMessage={errors.school_name?.message}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <RHFAutoComplete
                                selectLabel="Teacher Name"
                                placeholder="Search & Select Teacher Name"
                                control={control}
                                registerWith={'teacher_name'}
                                options={allTeachers}
                                error={!!errors.teacher_name?.message}
                                errorMessage={errors.teacher_name?.message}
                                isRequired={true}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FieldInput
                                type={inputsType.NUMBER}
                                fullWidth
                                label="Teacher Contact"
                                placeholder=""
                                isError={!!errors.teacher_contact?.message}
                                control={control}
                                register={register}
                                helperText={errors?.teacher_contact?.message}
                                registerWith={'teacher_contact'}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <RHFAutoComplete
                                selectLabel="Training Subject"
                                placeholder="Select District"
                                control={control}
                                registerWith={'training_subject'}
                                options={allSubject}
                                error={!!errors.training_subject?.message}
                                errorMessage={errors.training_subject?.message}
                                isRequired={true}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FieldInput
                                type={inputsType.TEXT}
                                fullWidth
                                label="Trainer Name*"
                                placeholder=""
                                isError={!!errors.trainer_name?.message}
                                control={control}
                                register={register}
                                helperText={errors?.trainer_name?.message}
                                registerWith={'trainer_name'}
                                isRequired={true}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FieldInput
                                type={inputsType.TEXT}
                                fullWidth
                                label="Trainer Contact*"
                                placeholder=""
                                isError={!!errors.trainer_contact?.message}
                                control={control}
                                register={register}
                                helperText={errors?.trainer_contact?.message}
                                registerWith={'trainer_contact'}
                                isRequired={true}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FieldInput
                                type={inputsType.NUMBER}
                                fullWidth
                                label="No of Trainer*"
                                placeholder=""
                                isError={!!errors.number_of_trainers?.message}
                                control={control}
                                register={register}
                                helperText={errors?.number_of_trainers?.message}
                                registerWith={'number_of_trainers'}
                                isRequired={true}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FieldInput
                                type={inputsType.TEXT}
                                fullWidth
                                label="Training Center*"
                                placeholder=""
                                isError={!!errors.training_center?.message}
                                control={control}
                                register={register}
                                helperText={errors?.training_center?.message}
                                registerWith={'training_center'}
                                isRequired={true}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FieldInput
                                type={inputsType.DATE}
                                fullWidth
                                label="Training Start Date*"
                                placeholder="Select Training Start Date"
                                isError={!!errors.training_start_date?.message}
                                control={control}
                                register={register}
                                helperText={errors?.training_start_date?.message}
                                registerWith={"training_start_date"}
                                isRequired={true}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FieldInput
                                type={inputsType.DATE}
                                fullWidth
                                label="Training End Date*"
                                placeholder="Select Training End Date"
                                isError={!!errors.training_end_date?.message}
                                control={control}
                                register={register}
                                helperText={errors?.training_end_date?.message}
                                registerWith={"training_end_date"}
                                isRequired={true}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <RHFSelect
                                selectLabel="Session*"
                                placeholder="Select Session"
                                control={control}
                                registerWith={'session'}
                                options={allSessions}
                                isRequired={false}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FieldInput
                                type={inputsType.TEXT}
                                fullWidth
                                label="Duration*"
                                placeholder=""
                                isError={!!errors.duration?.message}
                                control={control}
                                register={register}
                                helperText={errors?.duration?.message}
                                registerWith={'duration'}
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
    </CustomizedDialog>

}

export default AddTeacherTraining