import React, { useState, useEffect } from 'react'
import { Backdrop, Box, CircularProgress, Grid, Typography } from '@mui/material';
import { useForm } from "react-hook-form";
import { RHFAutoComplete } from "UI/select";
import { FieldInput } from "UI/input";
import { inputsType, acceptedImages } from "UI/utils";
import {
    DialogBody,
    DialogHeader,
    CustomizedDialog,DialogFooter
} from "UI/modal";
import {CustomButton} from 'UI/button'
import { FileUploadButton } from "UI/dragndrop";
import { ListImagePreview } from "UI/previewImg";
import { selectedFile } from '../../../../types';
import {useDCVisitorStore} from 'SUPER/store'
import { allVisitorType, schoolCodes } from '../../../../utils/data';
import { formatDateYYYYMMDD } from '../../../../utils';

interface IAddEdit {
    handleClose: Function;
    edit: boolean;
    id: number
}

type TDefaultType = {
    name: string;
    date_of_visit: string;
    type: {label:string, id: number, value: string} | null;
    visit_type: string;
    in_time: string;
    out_time: string;
    school_coordinator_attendance: string;
    ict_lab_utilization: string;
    computer_edu_consumable: string;
    electricity_bill_consumption_ict_lab: string;
    any_other_register: string;
    ict_lab_hardware_functional: string;
    ict_lab_student_teacher_attendance: string;
    performance_review_sc: string;
    feedback_from_students: string;
    feedback_from_principal: string;
    comments_on_feedback_complaints_from_school: string;
    multimedia_econtent_issue: string;
    multimedia_econtent_feedback: string;
    comments_suggestions_by_visitor: string;
    school_id: string;
    school_name: null | {label:string, id: number};
    any_issue: string;
    feedback: string;
    image_url: string;
    visit_number: string;
}

const defaultValues: TDefaultType = {
    "name": "",
    "date_of_visit": "",
    "type": null,
    "visit_type": '',
    "in_time": "",
    "out_time": "",
    "school_coordinator_attendance": "",
    "ict_lab_utilization": "",
    "computer_edu_consumable": "",
    "electricity_bill_consumption_ict_lab": "",
    "any_other_register": "",
    "ict_lab_hardware_functional": "",
    "ict_lab_student_teacher_attendance": "",
    "performance_review_sc": "",
    "feedback_from_students": "",
    "feedback_from_principal": "",
    "comments_on_feedback_complaints_from_school": "",
    "multimedia_econtent_issue": "",
    "multimedia_econtent_feedback": "",
    "comments_suggestions_by_visitor": "",
    "school_id": "",
    "school_name": null,
    "any_issue": "",
    "feedback": "",
    "image_url": "",
    "visit_number": ''
  }

const AddEditDC = ({ handleClose, edit, id} : IAddEdit) => {
    const [selectedFile, setSelectedFile] = useState<selectedFile>();
    const dcVisitorStore = useDCVisitorStore((state: any) => state)
    const {createDCVisitor, actionLoading, updateDCVisitor, getDetails, details} = dcVisitorStore
    const {
        watch,
        control,
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm<TDefaultType>({ defaultValues });
    
    useEffect(() => {
        if(id && edit){
            getDetails(id.toString())
        }
    }, [id])

    useEffect(() => {
        if(details?.id && edit){
            const curr_school = schoolCodes.filter((school) => school.id == details?.school?.id)
            const curr_type = allVisitorType.filter((visitor) => visitor.value === details?.['type'])
            const curr_in_time = details?.['in_time']?.split(' ')?.[0]
            const curr_out_time = details?.['out_time']?.split(' ')?.[0]

            setValue('name', details['visit_name'])
            setValue('date_of_visit', formatDateYYYYMMDD(details?.['date_of_visit'] || ''))
            setValue('type', curr_type?.[0])
            setValue('in_time',curr_in_time )
            setValue('out_time',curr_out_time)
            setValue('school_coordinator_attendance', details['school_coordinator_attendance'])
            setValue('ict_lab_utilization', details['ict_lab_utilization'])
            setValue('computer_edu_consumable', details['computer_edu_consumable'])
            setValue('electricity_bill_consumption_ict_lab', details['electricity_bill_consumption_ict_lab'])
            setValue('any_other_register', details['any_other_register'])
            setValue('ict_lab_hardware_functional', details['ict_lab_hardware_functional'])
            setValue('ict_lab_student_teacher_attendance', details['ict_lab_student_teacher_attendance'])
            setValue('performance_review_sc', details['performance_review_sc'])
            setValue('feedback_from_students', details['feedback_from_students'])
            setValue('feedback_from_principal', details['feedback_from_principal'])
            setValue('comments_on_feedback_complaints_from_school', details['comments_on_feedback_complaints_from_school'])
            setValue('multimedia_econtent_issue', details['multimedia_econtent_issue'])
            setValue('multimedia_econtent_feedback', details['multimedia_econtent_feedback'])
            setValue('comments_suggestions_by_visitor', details['comments_suggestions_by_visitor'])
            setValue('school_name', curr_school?.[0])
            setValue('any_issue', details['any_issue'])
            setValue('feedback', details['feedback'])
            setValue('image_url', details['image_url'])
            setValue('visit_number', details['visit_number'])
        }
    }, [details])

    const handleAdd = async(data: TDefaultType) => {
        await createDCVisitor(data)
    }
    const handleEdit = async(data: TDefaultType) => {
        await updateDCVisitor(data, id)
    }


    return <CustomizedDialog open={open} handleClose={handleClose} fullWidth maxWidth={'md'}>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={actionLoading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
        <DialogHeader handleClose={handleClose}>  <Typography variant='h5' component={'h2'}>{edit ? 'Edit' : 'Add'} DC Visitor Details</Typography> </DialogHeader>
        <form
            onSubmit={handleSubmit((data:TDefaultType ) => {
                const payload = {
                    ...data, 
                    school_id: data?.school_name?.id+'' || '0',
                    visit_type: data?.type?.value || '',
                    image_url: 'a.b.com'
                }
                if(edit){
                    handleEdit(payload)
                }else handleAdd(payload)
            })}
        >
            <DialogBody> 
                <Box>
                    <Grid container columnSpacing={2}>
                        <Grid item xs={12} md={6}>
                            <RHFAutoComplete
                                selectLabel="School Name*"
                                placeholder="Search & Select School Code"
                                control={control}
                                registerWith={'school_name'}
                                options={schoolCodes}
                                error={!!errors.school_name?.message}
                                errorMessage={errors.school_name?.message}
                                isRequired={true}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FieldInput
                                type={inputsType.TEXT}
                                fullWidth
                                label="Visitor Name*"
                                placeholder="Enter visitor name"
                                isError={!!errors.name?.message}
                                control={control}
                                register={register}
                                helperText={errors?.name?.message}
                                registerWith={'name'}
                                isRequired={true}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FieldInput
                                type={inputsType.DATE}
                                fullWidth
                                label="Date*"
                                placeholder="Select Date Of Visit"
                                isError={!!errors.date_of_visit?.message}
                                control={control}
                                register={register}
                                helperText={errors?.date_of_visit?.message}
                                registerWith={'date_of_visit'}
                                isRequired={true}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <RHFAutoComplete
                                selectLabel="Visitor Type*"
                                placeholder="Select Visitor Type"
                                control={control}
                                registerWith={'type'}
                                options={allVisitorType}
                                error={!!errors.type?.message}
                                errorMessage={errors.type?.message}
                                isRequired={true}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FieldInput
                                type={inputsType.NUMBER}
                                fullWidth
                                label="Visit No*"
                                placeholder="Enter Visit No."
                                isError={!!errors.visit_number?.message}
                                control={control}
                                register={register}
                                helperText={errors?.visit_number?.message}
                                registerWith={'visit_number'}
                                isRequired={true}
                            />
                        </Grid>
                        <Grid item xs={6} md={6}>
                            {!selectedFile?.file?.name ? (
                                <FileUploadButton
                                    label="Image"
                                    acceptedFilesExt={acceptedImages}
                                    setFile={setSelectedFile}
                                    sx={{ width: "100%" }}
                                />
                            ) : (
                                <ListImagePreview
                                    label="Image"
                                    fileName={selectedFile.file.name}
                                    handleRemoveFile={() =>
                                        setSelectedFile({ file: null, msg: "" })
                                    }
                                    msg={selectedFile.msg}
                                />
                            )}
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FieldInput
                                type={inputsType.TIME}
                                fullWidth
                                label="DC In Time*"
                                isError={!!errors.in_time?.message}
                                control={control}
                                register={register}
                                helperText={errors?.in_time?.message}
                                registerWith={'in_time'}
                                isRequired={true}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FieldInput
                                type={inputsType.TIME}
                                fullWidth
                                label="DC Out Time*"
                                isError={!!errors.out_time?.message}
                                control={control}
                                register={register}
                                helperText={errors?.out_time?.message}
                                registerWith={'out_time'}
                                isRequired={true}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FieldInput
                                type={inputsType.TEXTAREA}
                                fullWidth
                                label="School Coordinator Daily attendance Register*"
                                placeholder=""
                                isError={!!errors.school_coordinator_attendance?.message}
                                control={control}
                                register={register}
                                helperText={errors?.school_coordinator_attendance?.message}
                                registerWith={'school_coordinator_attendance'}
                                isRequired={true}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FieldInput
                                type={inputsType.TEXTAREA}
                                fullWidth
                                label="Daily ICT Lab utilization Register*"
                                placeholder=""
                                isError={!!errors.ict_lab_utilization?.message}
                                control={control}
                                register={register}
                                helperText={errors?.ict_lab_utilization?.message}
                                registerWith={'ict_lab_utilization'}
                                isRequired={true}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FieldInput
                                type={inputsType.TEXTAREA}
                                fullWidth
                                label="Any Issues?*"
                                placeholder="Enter issues mentioned"
                                isError={!!errors.any_issue?.message}
                                control={control}
                                register={register}
                                helperText={errors?.any_issue?.message}
                                registerWith={'any_issue'}
                                isRequired={true}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FieldInput
                                type={inputsType.TEXTAREA}
                                fullWidth
                                label="Electricity Consumption in ICT Lab and Bill Payment received register*"
                                isError={!!errors.electricity_bill_consumption_ict_lab?.message}
                                control={control}
                                register={register}
                                helperText={errors?.electricity_bill_consumption_ict_lab?.message}
                                registerWith={'electricity_bill_consumption_ict_lab'}
                                isRequired={true}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FieldInput
                                type={inputsType.TEXTAREA}
                                fullWidth
                                label="Computer Education Consumable Registers*"
                                isError={!!errors.computer_edu_consumable?.message}
                                control={control}
                                register={register}
                                helperText={errors?.computer_edu_consumable?.message}
                                registerWith={'computer_edu_consumable'}
                                isRequired={true}
                            />
                        </Grid> 
                        <Grid item xs={12} md={6}>
                            <FieldInput
                                type={inputsType.TEXTAREA}
                                fullWidth
                                label="Any other register (please specify)*"
                                isError={!!errors.any_other_register?.message}
                                control={control}
                                register={register}
                                helperText={errors?.any_other_register?.message}
                                registerWith={'any_other_register'}
                                isRequired={true}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FieldInput
                                type={inputsType.TEXTAREA}
                                fullWidth
                                label="Checks of ICT lab hardware items functionality (please specify if any system is found down and from how many days and reason)*"
                                isError={!!errors.ict_lab_hardware_functional?.message}
                                control={control}
                                register={register}
                                helperText={errors?.ict_lab_hardware_functional?.message}
                                registerWith={'ict_lab_hardware_functional'}
                                isRequired={true}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FieldInput
                                type={inputsType.TEXTAREA}
                                fullWidth
                                label="Attendance of Student, Teachers in ICT lab on date of visit*"
                                isError={!!errors.ict_lab_student_teacher_attendance?.message}
                                control={control}
                                register={register}
                                helperText={errors?.ict_lab_student_teacher_attendance?.message}
                                registerWith={'ict_lab_student_teacher_attendance'}
                                isRequired={true}
                            />
                        </Grid>
                        
                        <Grid item xs={12} md={6}>
                            <FieldInput
                                type={inputsType.TEXTAREA}
                                fullWidth
                                label="Review performance of SCs and his feedback*"
                                isError={!!errors.performance_review_sc?.message}
                                control={control}
                                register={register}
                                helperText={errors?.performance_review_sc?.message}
                                registerWith={'performance_review_sc'}
                                isRequired={true}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FieldInput
                                type={inputsType.TEXTAREA}
                                fullWidth
                                label="Feedback from Student about ICT classes use of ICT lab*"
                                isError={!!errors.feedback_from_students?.message}
                                control={control}
                                register={register}
                                helperText={errors?.feedback_from_students?.message}
                                registerWith={'feedback_from_students'}
                                isRequired={true}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FieldInput
                                type={inputsType.TEXTAREA}
                                fullWidth
                                label="Feedback from Principal/ Teaches about ICT lab use and performance of SC*"
                                isError={!!errors.feedback_from_principal?.message}
                                control={control}
                                register={register}
                                helperText={errors?.feedback_from_principal?.message}
                                registerWith={'feedback_from_principal'}
                                isRequired={true}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FieldInput
                                type={inputsType.TEXTAREA}
                                fullWidth
                                label="Comments on compliance of Last Visit suggestions and feedback/complaints received from School/Districts*"
                                isError={!!errors.comments_on_feedback_complaints_from_school?.message}
                                control={control}
                                register={register}
                                helperText={errors?.comments_on_feedback_complaints_from_school?.message}
                                registerWith={'comments_on_feedback_complaints_from_school'}
                                isRequired={true}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FieldInput
                                type={inputsType.TEXTAREA}
                                fullWidth
                                label="About Multimedia E-Content (Issues)*"
                                isError={!!errors.multimedia_econtent_issue?.message}
                                control={control}
                                register={register}
                                helperText={errors?.multimedia_econtent_issue?.message}
                                registerWith={'multimedia_econtent_issue'}
                                isRequired={true}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FieldInput
                                type={inputsType.TEXTAREA}
                                fullWidth
                                label="About Multimedia E-Content (Feedback)*"
                                isError={!!errors.multimedia_econtent_feedback?.message}
                                control={control}
                                register={register}
                                helperText={errors?.multimedia_econtent_feedback?.message}
                                registerWith={'multimedia_econtent_feedback'}
                                isRequired={true}
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <FieldInput
                                type={inputsType.TEXTAREA}
                                fullWidth
                                label="Comments and suggestions by Visitor*"
                                isError={!!errors.comments_suggestions_by_visitor?.message}
                                control={control}
                                register={register}
                                helperText={errors?.comments_suggestions_by_visitor?.message}
                                registerWith={'comments_suggestions_by_visitor'}
                                isRequired={true}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </DialogBody>
            <DialogFooter>
                <Box display='flex' gap='10px' justifyContent='flex-end' px={2}>
                    <CustomButton variant="contained" type="submit" color="primary">
                        {edit ? 'Update' : 'Save'}
                    </CustomButton>
                    <CustomButton
                        variant="contained"
                        color="error"
                        type="reset"
                        onClick={handleClose}
                        >
                        Cancel
                    </CustomButton>
                </Box>
            </DialogFooter>
        </form>
    </CustomizedDialog>

}

export default AddEditDC