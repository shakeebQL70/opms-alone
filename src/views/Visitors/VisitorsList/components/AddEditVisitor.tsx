import React, { useState, useEffect } from 'react'
import { Box, Grid, Typography, Backdrop, CircularProgress } from '@mui/material';
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
import {useVisitorStore} from 'SUPER/store'
import { allVisitorType, schoolCodes } from '../../../../utils/data';
import {
  formatDateYYYYMMDD,
} from "../../../../utils";
interface IAddEdit {
    handleClose: Function;
    edit: boolean;
    id: number
}

type TDefaultType = {
    school_id: string;
    school_name: null | {label:string, id: number};
    name: string;
    date: string;
    type: {label:string, id: number, value: string} | null;
    designation: string;
    purpose: string;
    any_issue: string;
    feedback: string;
    image_url: string;
} 

const defaultValues: TDefaultType = {
    "school_id":'',
    'school_name': null ,
    "name":"",
    "date":"",
    "type": null,
    "designation":"",
    "purpose":"",
    "any_issue":"",
    "feedback":"",
    "image_url": ""
}
const AddEditVisitor = ({ handleClose, edit, id} : IAddEdit) => {
    
    const [selectedFile, setSelectedFile] = useState<selectedFile>();
    const visitorStore = useVisitorStore((state: any) => state)
    const {createVisitor, actionLoading, updateVisitor, getDetails, details} = visitorStore
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
            setValue('school_name', curr_school?.[0])
            setValue('name', details?.['name'])
            setValue('date', formatDateYYYYMMDD(details?.['date'] || ''))
            setValue('type', curr_type?.[0])
            setValue('designation', details?.['designation'])
            setValue('purpose', details?.['purpose'])
            setValue('any_issue', details?.['any_issue'])
            setValue('feedback', details?.['feedback'])
            setValue('image_url', details?.['image_url'])
        }
    }, [details])

    const handleAdd = async(data: any) => {
        await createVisitor(data)
    }
    const handleEdit = async(data: any) => {
        await updateVisitor(data, id)
    }

    return <CustomizedDialog open={open} handleClose={handleClose} fullWidth maxWidth={'md'}>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={actionLoading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
        <DialogHeader handleClose={handleClose}>  <Typography variant='h5' component={'h2'}>{edit ? 'Edit' : 'Add'} Visitor Details</Typography> </DialogHeader>
        <form
            onSubmit={handleSubmit((data: any) => {
                const payload = {
                    ...data, 
                    school_id: data.school_name.id,
                    type: data.type.value,
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
                                selectLabel="School Name"
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
                                isError={!!errors.date?.message}
                                control={control}
                                register={register}
                                helperText={errors?.date?.message}
                                registerWith={'date'}
                                isRequired={true}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <RHFAutoComplete
                                selectLabel="Visitor Type"
                                placeholder="Select Visitor Type"
                                control={control}
                                registerWith={'type'}
                                options={allVisitorType}
                                error={!!errors.type?.message}
                                errorMessage={errors.type?.message}
                                isRequired={true}
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <FieldInput
                                type={inputsType.TEXT}
                                fullWidth
                                label="Designation*"
                                placeholder="Enter designation of visitor"
                                isError={!!errors.designation?.message}
                                control={control}
                                register={register}
                                helperText={errors?.designation?.message}
                                registerWith={'designation'}
                                isRequired={true}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FieldInput
                                type={inputsType.TEXTAREA}
                                fullWidth
                                label="Purpose*"
                                placeholder="Enter purpose of visit"
                                isError={!!errors.purpose?.message}
                                control={control}
                                register={register}
                                helperText={errors?.purpose?.message}
                                registerWith={'purpose'}
                                isRequired={true}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FieldInput
                                type={inputsType.TEXTAREA}
                                fullWidth
                                label="Any Feedback?*"
                                placeholder="Enter feedback of visitor"
                                isError={!!errors.feedback?.message}
                                control={control}
                                register={register}
                                helperText={errors?.feedback?.message}
                                registerWith={'feedback'}
                                isRequired={true}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FieldInput
                                type={inputsType.TEXTAREA}
                                fullWidth
                                label="Any Issues?"
                                placeholder="Enter issues mentioned"
                                isError={!!errors.any_issue?.message}
                                control={control}
                                register={register}
                                helperText={errors?.any_issue?.message}
                                registerWith={'any_issue'}
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

export default AddEditVisitor