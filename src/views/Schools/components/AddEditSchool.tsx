import React, {useEffect, useMemo} from 'react'
import { Box, Grid, Typography, Backdrop, CircularProgress } from '@mui/material';
import { useForm } from "react-hook-form";
import { RHFAutoComplete } from "UI/select";
import { FieldInput, RadioInputGroup } from "UI/input";
import { inputsType } from "UI/utils";
import {useSchoolStore} from 'SUPER/store'
import { getAllStates, getDistrictFromState} from "UI/indianStateAndDistrict";
import {
  DialogBody,
  DialogHeader,
  CustomizedDialog,DialogFooter
} from "UI/modal";
import {CustomButton, ExportTableButton} from 'UI/button'
import { allSchoolTypes } from '../../../utils/data';

interface IAddEditSchool {
    handleClose: Function;
    edit: boolean;
    id?: number
}

const defaultValues = {
    project_id: '',
    udise_code: '',
    bccl_code: '',
    name: '',
    type: null,
    pincode: '',
    country: null,
    state: null,
    city: '',
    district: null,
    block: '',
    village: '',
    address: '',
    landline: '',
    principal_name: '',
    principal_mobile: '',
    policestation_name: '',
    policestation_address: '',
    policestation_landline: '',
    policestation_contact_person: '',
    policestation_contact_person_no: '',
    is_esic_available: '',
    isActive: '',
    latitude: '',
    longitude: '',
    sw_code: '',
    sw_activation_key: '',
    device_token: '',
    zone: ''
}

const AddEditSchhol = ({handleClose, edit, id} : IAddEditSchool) => {
    const schoolStore = useSchoolStore((state: any) => state)
    const {createSchool, allLoading, isLoading, actionError, actionMessage, actionLoading, updateSchool, getDetails, details} = schoolStore
    const {
        watch,
        control,
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm<typeof defaultValues>({ defaultValues });

    const stateOptions = getAllStates()
    const selectedState: any = watch('state');

    const districtOptions: any[] = React.useMemo(() => {
        if (selectedState) {
            return getDistrictFromState(selectedState?.label || '') || [];
        }
        return [];
    }, [selectedState]);

    const isActive = watch('isActive')
    const isEsic = watch('is_esic_available')
    
    useEffect(() => {
        if(id && edit){
            getDetails(id.toString())
        }
    }, [id])

    useEffect(() => {
        if(details?.id && edit){
            const cur_state: any = {label: details?.state, value: details?.state, id: details?.state}
            const cur_dist: any = {label: details?.district, value: details?.district, id: details?.district}
            const cur_country: any = {label: 'India', id: 1}
            const cur_type: any = allSchoolTypes.filter((type) => type.value === details.type)
            const cur_is_esic: any = details.is_esic_available ? { label: 'YES', value:'yes' } : { label: 'NO', value:'no' }
            const cur_isActive: any = details.isActive ? { label: 'YES', value:'yes' } : { label: 'NO', value:'no' }

            setValue('project_id', details['project_id'])
            setValue('udise_code', details['udise_code'])
            setValue('bccl_code', details['bccl_code'])
            setValue('name', details['name'])
            setValue('type', cur_type[0])
            setValue('pincode', details['pincode'])
            setValue('country', cur_country)
            setValue('state', cur_state)
            setValue('city', details['city'])
            setValue('district', cur_dist)
            setValue('block', details['block'])
            setValue('village', details['village'])
            setValue('address', details['address'])
            setValue('landline', details['landline'])
            setValue('principal_name', details['principal_name'])
            setValue('principal_mobile', details['principal_mobile'])
            setValue('policestation_name', details['policestation_name'])
            setValue('policestation_address', details['policestation_address'])
            setValue('policestation_landline', details['policestation_landline'])
            setValue('policestation_contact_person', details['policestation_contact_person'])
            setValue('policestation_contact_person_no', details['policestation_contact_person_no'])
            setValue('is_esic_available', cur_is_esic)
            setValue('isActive', cur_isActive)
            setValue('latitude', details['latitude'])
            setValue('longitude', details['longitude'])
            setValue('sw_code', details['sw_code'])
            setValue('sw_activation_key', details['sw_activation_key'])
            setValue('device_token', details['device_token'])
            setValue('zone', details['zone'])
        }
    }, [details])

    const handleAdd = async(data: any) => {
        await createSchool(data)
    }
    const handleEdit = async(data: any) => {
        await updateSchool(data, id)
    }

    return <CustomizedDialog open={open} handleClose={handleClose} fullWidth maxWidth={'md'}>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={actionLoading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
        
        <DialogHeader handleClose={handleClose}>  <Typography variant='h5' component={'h2'}>{edit ? 'Edit' : 'Add'} School Details</Typography> </DialogHeader>
        <form
            onSubmit={handleSubmit((data: any) => {
                const payload = {
                    ...data,
                    is_esic_available: data.is_esic_available === 'yes',
                    isActive: data.isActive === 'yes',
                    state: data?.state?.value,
                    district: data?.district?.value,
                    country: data?.country?.label,
                    type: data?.type?.value
                }
                if(edit){
                    handleEdit(payload);
                }else {
                    handleAdd(payload)
                }
            })}
        >
            <DialogBody> 
                <Box>
                        <Grid container columnSpacing={2}>
                            <Grid item xs={12} md={6}>
                                <FieldInput
                                    type={inputsType.TEXT}
                                    fullWidth
                                    label="UDISE Code*"
                                    placeholder="UDISE Code"
                                    isError={!!errors.udise_code?.message}
                                    control={control}
                                    register={register}
                                    helperText={errors?.udise_code?.message}
                                    registerWith={'udise_code'}
                                    isRequired={true}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FieldInput
                                    type={inputsType.TEXT}
                                    fullWidth
                                    label="BCCL Code*"
                                    placeholder="BCCL Code"
                                    isError={!!errors.bccl_code?.message}
                                    control={control}
                                    register={register}
                                    helperText={errors?.bccl_code?.message}
                                    registerWith={'bccl_code'}
                                    isRequired={true}
                                />
                            </Grid>
                            
                            <Grid item xs={12} md={6}>
                                <FieldInput
                                    type={inputsType.TEXT}
                                    fullWidth
                                    label="School Name*"
                                    placeholder="School Name"
                                    isError={!!errors.name?.message}
                                    control={control}
                                    register={register}
                                    helperText={errors?.name?.message}
                                    registerWith={'name'}
                                    isRequired={true}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <RHFAutoComplete
                                    selectLabel="Select School Type"
                                    placeholder="Select School Type"
                                    control={control}
                                    registerWith={'type'}
                                    options={allSchoolTypes}
                                    error={!!errors.type?.message}
                                    errorMessage={errors.type?.message}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FieldInput
                                    type={inputsType.TEXT}
                                    fullWidth
                                    label="Pin*"
                                    placeholder="Pin"
                                    isError={!!errors.pincode?.message}
                                    control={control}
                                    register={register}
                                    helperText={errors?.pincode?.message}
                                    registerWith={'pincode'}
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
                                <FieldInput
                                    type={inputsType.TEXT}
                                    fullWidth
                                    label="Block"
                                    placeholder="Block"
                                    isError={!!errors.block?.message}
                                    control={control}
                                    register={register}
                                    helperText={errors?.block?.message}
                                    registerWith={'block'}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FieldInput
                                    type={inputsType.TEXT}
                                    fullWidth
                                    label="Village*"
                                    placeholder="Village"
                                    isError={!!errors.village?.message}
                                    control={control}
                                    register={register}
                                    helperText={errors?.village?.message}
                                    registerWith={'village'}
                                    isRequired={true}
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <FieldInput
                                    type={inputsType.TEXT}
                                    fullWidth
                                    label="Address*"
                                    placeholder="Address"
                                    isError={!!errors.address?.message}
                                    control={control}
                                    register={register}
                                    helperText={errors?.address?.message}
                                    registerWith={'address'}
                                    isRequired={true}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <RadioInputGroup
                                    isRow
                                    label="IS ESIC AVAIL*"
                                    control={control}
                                    registerWith={'is_esic_available'}
                                    options={[
                                        { label: 'YES', value:'yes' },
                                        { label: 'NO', value:'no' },
                                    ]}
                                    defaultValue={isEsic}
                                    isError={!!errors.is_esic_available?.message}
                                    helperText={errors?.is_esic_available?.message}
                                    isRequired={true}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <RadioInputGroup
                                    isRow
                                    label="IS ACTIVE*"
                                    control={control}
                                    registerWith={'isActive'}
                                    options={[
                                        { label: 'YES', value:'yes' },
                                        { label: 'NO', value:'no' },
                                    ]}
                                    defaultValue={isActive}
                                    isError={!!errors.isActive?.message}
                                    helperText={errors?.isActive?.message}
                                    isRequired={true}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FieldInput
                                    type={inputsType.NUMBER}
                                    fullWidth
                                    label="School Land Line No*"
                                    placeholder="School Land Line No"
                                    isError={!!errors.landline?.message}
                                    control={control}
                                    register={register}
                                    helperText={errors?.landline?.message}
                                    registerWith={'landline'}
                                    isRequired={true}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FieldInput
                                    type={inputsType.TEXT}
                                    fullWidth
                                    label="School Principal Name*"
                                    placeholder="School Principal Name"
                                    isError={!!errors.principal_name?.message}
                                    control={control}
                                    register={register}
                                    helperText={errors?.principal_name?.message}
                                    registerWith={'principal_name'}
                                    isRequired={true}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FieldInput
                                    type={inputsType.NUMBER}
                                    fullWidth
                                    label="SCHOOL PRINCIPAL MOBILE NO*"
                                    placeholder="Enter Principal Mobile No"
                                    isError={!!errors.principal_mobile?.message}
                                    control={control}
                                    register={register}
                                    helperText={errors?.principal_mobile?.message}
                                    registerWith={'principal_mobile'}
                                    isRequired={true}
                                />
                            </Grid>
                            
                            <Grid item xs={12} md={6}>
                                <FieldInput
                                    type={inputsType.TEXT}
                                    fullWidth
                                    label="POLICE STATION NEAREST NAME*"
                                    placeholder="Enter nearest police station name"
                                    isError={!!errors.policestation_name?.message}
                                    control={control}
                                    register={register}
                                    helperText={errors?.policestation_name?.message}
                                    registerWith={'policestation_name'}
                                    isRequired={true}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FieldInput
                                    type={inputsType.TEXT}
                                    fullWidth
                                    label="POLICE STATION NEAREST ADDRESS*"
                                    placeholder="Enter nearest police station address"
                                    isError={!!errors.policestation_address?.message}
                                    control={control}
                                    register={register}
                                    helperText={errors?.policestation_address?.message}
                                    registerWith={'policestation_address'}
                                    isRequired={true}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FieldInput
                                    type={inputsType.NUMBER}
                                    fullWidth
                                    label="POLICE STATION NEAREST LAND LINE NO*"
                                    placeholder="Enter nearest police station landline no"
                                    isError={!!errors.policestation_landline?.message}
                                    control={control}
                                    register={register}
                                    helperText={errors?.policestation_landline?.message}
                                    registerWith={'policestation_landline'}
                                    isRequired={true}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FieldInput
                                    type={inputsType.TEXT}
                                    fullWidth
                                    label="POLICE STATION NEAREST CONTACT PERSON*"
                                    placeholder="Enter nearest police station contact person"
                                    isError={!!errors.policestation_contact_person?.message}
                                    control={control}
                                    register={register}
                                    helperText={errors?.policestation_contact_person?.message}
                                    registerWith={'policestation_contact_person'}
                                    isRequired={true}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FieldInput
                                    type={inputsType.NUMBER}
                                    fullWidth
                                    label="POLICE STATION NEAREST CONTACT PERSON NO*"
                                    placeholder="Enter nearest police station contact person number"
                                    isError={!!errors.policestation_contact_person_no?.message}
                                    control={control}
                                    register={register}
                                    helperText={errors?.policestation_contact_person_no?.message}
                                    registerWith={'policestation_contact_person_no'}
                                    isRequired={true}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FieldInput
                                    type={inputsType.TEXT}
                                    fullWidth
                                    label="SCHOOL LATITUDE*"
                                    placeholder="Enter school latitude"
                                    isError={!!errors.latitude?.message}
                                    control={control}
                                    register={register}
                                    helperText={errors?.latitude?.message}
                                    registerWith={'latitude'}
                                    isRequired={true}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FieldInput
                                    type={inputsType.TEXT}
                                    fullWidth
                                    label="SCHOOL LONGITUDE*"
                                    placeholder="Enter school longitude"
                                    isError={!!errors.longitude?.message}
                                    control={control}
                                    register={register}
                                    helperText={errors?.longitude?.message}
                                    registerWith={'longitude'}
                                    isRequired={true}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FieldInput
                                    type={inputsType.TEXT}
                                    fullWidth
                                    label="SW CODE*"
                                    placeholder="Enter SW Code"
                                    isError={!!errors.sw_code?.message}
                                    control={control}
                                    register={register}
                                    helperText={errors?.sw_code?.message}
                                    registerWith={'sw_code'}
                                    isRequired={true}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FieldInput
                                    type={inputsType.TEXT}
                                    fullWidth
                                    label="SW ACTIVATION KEY*"
                                    placeholder="Enter SW Key"
                                    isError={!!errors.sw_activation_key?.message}
                                    control={control}
                                    register={register}
                                    helperText={errors?.sw_activation_key?.message}
                                    registerWith={'sw_activation_key'}
                                    isRequired={true}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FieldInput
                                    type={inputsType.TEXT}
                                    fullWidth
                                    label="DEVICE TOKEN*"
                                    placeholder="Enter Device Token"
                                    isError={!!errors.device_token?.message}
                                    control={control}
                                    register={register}
                                    helperText={errors?.device_token?.message}
                                    registerWith={'device_token'}
                                    isRequired={true}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FieldInput
                                    type={inputsType.TEXT}
                                    fullWidth
                                    label="ZONE*"
                                    placeholder="Enter Zone"
                                    isError={!!errors.zone?.message}
                                    control={control}
                                    register={register}
                                    helperText={errors?.zone?.message}
                                    registerWith={'zone'}
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

export default AddEditSchhol