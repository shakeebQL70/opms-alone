import React, {useEffect} from "react";
import {
  Box,
  Grid,
  Typography,Backdrop, CircularProgress
} from "@mui/material";
import { useForm } from "react-hook-form";
import { RHFAutoComplete } from "UI/select";
import { FieldInput } from "UI/input";
import { inputsType } from "UI/utils";
import {
  DialogBody,
  DialogHeader,
  CustomizedDialog,
  DialogFooter,
} from "UI/modal";
import { CustomButton } from "UI/button";
import {useLabAssetStore} from 'SUPER/store'
import { allAssetStatus, allCategory, allClasses, allItemCategory, allItemMake, allSections, schoolCodes } from "../../../utils/data";
import { formatDateYYYYMMDD } from "../../../utils";

interface IAddEdit {
  handleClose: Function;
  edit: boolean;
  id: number
}

type TDfaultValue = {
  school_id: string;
  school_name: null | {label:string, id:number} ;
  item_category: {label:string, id:string, value:string} | null;
  item_make: {label:string, id:string, value:string} | null;
  service_provider: {label:string, id:string, value:string} | null;
  category: {label:string, id:number, value:string} | null;
  item_serial_no: string;
  item_model_name: string;
  service_sla_amount: string;
  service_sla_days: string;
  purchase_date: string;
  warranty_end_date: string;
  omt_serial_key: string;
  oem_name: string;
  description: string;
  status: {label:string, id:string, value:string} | null;
};

const defaultValues: TDfaultValue = {
  school_id: '',
  school_name: null,
  item_category: null,
  item_make: null,
  service_provider: null,
  category: null,
  item_serial_no: '',
  item_model_name:'',
  service_sla_amount:'',
  service_sla_days:'',
  purchase_date:'',
  warranty_end_date:'',
  omt_serial_key:'',
  oem_name:'',
  description:'',
  status: null
};

const AddEditAsset = ({ handleClose, edit, id }: IAddEdit) => {
  const store = useLabAssetStore((state: any) => state)
    const {createAsset, actionLoading, updateAsset, getDetails, details} = store
    const {
        watch,
        control,
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm<TDfaultValue>({ defaultValues });
    
    useEffect(() => {
        if(id && edit){
            getDetails(id.toString())
        }
    }, [id])

    useEffect(() => {
        if(details?.id && edit){
          const cur_school = schoolCodes.filter((school) => school.id === details?.school?.school_id)?.[0]
          const cur_item_categroy = allItemCategory.filter((cat) => cat.value?.toLowerCase() === details?.item_category?.toLowerCase())?.[0]
          const cur_item_make = allItemMake.filter((cat) => cat.value?.toLowerCase() === details?.item_make?.toLowerCase())?.[0]
          const cur_service_provider = allItemMake.filter((cat) => cat.value?.toLowerCase() === details?.service_provider?.toLowerCase())?.[0]
          const cur_category = allCategory.filter((cat) => cat.value?.toLowerCase() === details?.category?.toLowerCase())?.[0]
          const cur_status = allAssetStatus.filter((status) => status.value?.toLowerCase() === details?.status?.toLowerCase())?.[0]

          setValue('school_id', details['school_id'])
          setValue('school_name', cur_school)
          setValue('item_category', cur_item_categroy)
          setValue('item_make', cur_item_make)
          setValue('service_provider', cur_service_provider)
          setValue('category', cur_category)
          setValue('item_serial_no', details['item_serial_no'])
          setValue('item_model_name', details['item_model_name'])
          setValue('service_sla_amount', details['service_sla_amount'])
          setValue('service_sla_days', details['service_sla_days'])
          setValue('purchase_date',formatDateYYYYMMDD(details?.['purchase_date'] || ''))
          setValue('warranty_end_date', formatDateYYYYMMDD(details?.['warranty_end_date'] || ''))
          setValue('omt_serial_key', details['omt_serial_key'])
          setValue('oem_name', details['oem_name'])
          setValue('description', details['description'])
          setValue('status',cur_status)
        }
    }, [details])

    const handleAdd = async(data: any) => {
        await createAsset(data)
    }
    const handleEdit = async(data: any) => {
        await updateAsset(data, id)
    }

  return (
    <CustomizedDialog
      open={open}
      handleClose={handleClose}
      fullWidth
      maxWidth={"md"}
    >
      <DialogHeader handleClose={handleClose}>
        <Typography variant="h5" component={"h2"}>
          {edit ? "Edit" : "Add"} Asset
        </Typography>
      </DialogHeader>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={actionLoading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
      <form
        onSubmit={handleSubmit((data: any) => {
          const payload = {
            ...data,
            category: data?.category?.value,
            item_category: data?.item_category?.value,
            item_make: data?.item_make?.value,
            school_id: data?.school_name?.id,
            service_provider: data?.service_provider?.value,
            status: data?.status?.value
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
                <RHFAutoComplete
                  selectLabel="School Code*"
                  placeholder="Search & Select School Code"
                  control={control}
                  registerWith={"school_name"}
                  options={schoolCodes}
                  error={!!errors.school_name?.message}
                  errorMessage={errors.school_name?.message}
                  isRequired={true}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <RHFAutoComplete
                  selectLabel="Item Category"
                  placeholder="Search & Select Item Category"
                  control={control}
                  registerWith={"item_category"}
                  options={allItemCategory}
                  error={!!errors.item_category?.message}
                  errorMessage={errors.item_category?.message}
                  isRequired={true}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <RHFAutoComplete
                  selectLabel="Item Make"
                  placeholder="Search & Select Item Make"
                  control={control}
                  registerWith={"item_make"}
                  options={allItemMake}
                  error={!!errors.item_make?.message}
                  errorMessage={errors.item_make?.message}
                  isRequired={true}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <RHFAutoComplete
                  selectLabel="Service Provider*"
                  placeholder="Search & Select Service Provider"
                  control={control}
                  registerWith={"service_provider"}
                  options={allItemMake}
                  error={!!errors.service_provider?.message}
                  errorMessage={errors.service_provider?.message}
                  isRequired={true}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <RHFAutoComplete
                  selectLabel="Category*"
                  placeholder="Search & Select Service Category"
                  control={control}
                  registerWith={"category"}
                  options={allCategory}
                  error={!!errors.category?.message}
                  errorMessage={errors.category?.message}
                  isRequired={true}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FieldInput
                  type={inputsType.TEXT}
                  fullWidth
                  label="Serail No*"
                  placeholder="Enter serial number"
                  isError={!!errors.item_serial_no?.message}
                  control={control}
                  register={register}
                  helperText={errors?.item_serial_no?.message}
                  registerWith={"item_serial_no"}
                  isRequired={true}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FieldInput
                  type={inputsType.TEXT}
                  fullWidth
                  label="Model Name*"
                  placeholder="Enter model name"
                  isError={!!errors.item_model_name?.message}
                  control={control}
                  register={register}
                  helperText={errors?.item_model_name?.message}
                  registerWith={"item_model_name"}
                  isRequired={true}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FieldInput
                  type={inputsType.TEXT}
                  fullWidth
                  label="Service SLA Amount*"
                  placeholder="Enter Service SLA Amount"
                  isError={!!errors.service_sla_amount?.message}
                  control={control}
                  register={register}
                  helperText={errors?.service_sla_amount?.message}
                  registerWith={"service_sla_amount"}
                  isRequired={true}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FieldInput
                  type={inputsType.TEXT}
                  fullWidth
                  label="Service SLA Days*"
                  placeholder="Enter Service SLA Days"
                  isError={!!errors.service_sla_days?.message}
                  control={control}
                  register={register}
                  helperText={errors?.service_sla_days?.message}
                  registerWith={"service_sla_days"}
                  isRequired={true}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FieldInput
                  type={inputsType.DATE}
                  fullWidth
                  label="Purchase Date*"
                  placeholder="Enter Purchase Date"
                  isError={!!errors.purchase_date?.message}
                  control={control}
                  register={register}
                  helperText={errors?.purchase_date?.message}
                  registerWith={"purchase_date"}
                  isRequired={true}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FieldInput
                  type={inputsType.DATE}
                  fullWidth
                  label="Warranty End Date*"
                  placeholder="Enter Warranty End Date"
                  isError={!!errors.warranty_end_date?.message}
                  control={control}
                  register={register}
                  helperText={errors?.warranty_end_date?.message}
                  registerWith={"warranty_end_date"}
                  isRequired={true}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FieldInput
                  type={inputsType.TEXT}
                  fullWidth
                  label="OMT Serial Key*"
                  placeholder="Enter Serail Key"
                  isError={!!errors.omt_serial_key?.message}
                  control={control}
                  register={register}
                  helperText={errors?.omt_serial_key?.message}
                  registerWith={"omt_serial_key"}
                  isRequired={true}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FieldInput
                  type={inputsType.TEXT}
                  fullWidth
                  label="Description*"
                  placeholder="Enter description"
                  isError={!!errors.description?.message}
                  control={control}
                  register={register}
                  helperText={errors?.description?.message}
                  registerWith={"description"}
                  isRequired={true}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FieldInput
                  type={inputsType.TEXT}
                  fullWidth
                  label="OEM Name*"
                  placeholder="Enter OEM Name"
                  isError={!!errors.oem_name?.message}
                  control={control}
                  register={register}
                  helperText={errors?.oem_name?.message}
                  registerWith={"oem_name"}
                  isRequired={true}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <RHFAutoComplete
                  selectLabel="Asset Status*"
                  placeholder="Search & Select Asset Status"
                  control={control}
                  registerWith={"status"}
                  options={allAssetStatus}
                  error={!!errors.status?.message}
                  errorMessage={errors.status?.message}
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
  );
};

export default AddEditAsset;
