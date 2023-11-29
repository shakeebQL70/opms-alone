import React, {useEffect} from "react";
import {
  Box,
  Grid,
  Typography,Backdrop, CircularProgress
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { RHFAutoComplete } from "UI/select";
import { FieldInput, RadioInputGroup } from "UI/input";
import { inputsType } from "UI/utils";
import {
  DialogBody,
  DialogHeader,
  CustomizedDialog,
  DialogFooter,
} from "UI/modal";
import { CustomButton } from "UI/button";
import { getAllStates, getDistrictFromState } from "UI/indianStateAndDistrict";
import {useStudentStore} from 'SUPER/store'
import { allClasses, allGenders, allSections, allSessions, allSubject, schoolCodes } from "../../../utils/data";
import { formatDateYYYYMMDD } from "../../../utils";

interface IAddEdit {
  handleClose: Function;
  edit: boolean;
  id: number
}

type TDfaultValue = {
  school_id: string,
  school_name: null | {label:string, id:number},
  name: string,
  class:  null | {label:string, id:number, value:number},
  section: null | {label:string, id:number, value:string},
  state: null | {label:string, id:number, value:string},
  district: null | {label:string, id:number, value:string},
  village: string,
  session: null | {label:string, id:number, value:string},
  gender: string,
  d_o_b: string,
}

const defaultValues: TDfaultValue = {
  school_id: '',
  school_name: null,
  name: '',
  class: null,
  section: null,
  state: null,
  district: null,
  village: '',
  session: null,
  gender: '',
  d_o_b: '',
};

const AddEditStudent = ({ handleClose, edit, id }: IAddEdit) => {
  const store = useStudentStore((state: any) => state)
    const {createStudent, allLoading, isLoading, actionError, actionMessage, actionLoading, updateStudent, getDetails, details} = store
    const {
        watch,
        control,
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm<TDfaultValue>({ defaultValues });

    const stateOptions = getAllStates()
    const selectedState: any = watch('state');
    const gender:string = watch('gender')

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
          const cur_school = schoolCodes.filter((school) => school.id == details?.school?.id)?.[0]
          const cur_class = allClasses.filter((cur) => cur.value === details.class)?.[0]
          const cur_state = {label: details?.state, value: details?.state, id: details?.state}
          const cur_dist = {label: details?.district, value: details?.district, id: details?.district}
          const cur_section = allSections.filter((section) => section.value === details?.section)?.[0]

          setValue('school_id', details['school_id'])
          setValue('school_name', cur_school)
          setValue('name', details['name'])
          setValue('class', cur_class)
          setValue('section', cur_section)
          setValue('state', cur_state)
          setValue('district', cur_dist)
          setValue('village', details['village'])
          setValue('session', details['session'])
          setValue('gender', details?.gender)
          setValue('d_o_b', formatDateYYYYMMDD(details?.['d_o_b'] || ''))          
        }
    }, [details])

    const handleAdd = async(data: any) => {
        await createStudent(data)
    }
    const handleEdit = async(data: any) => {
        await updateStudent(data, id)
    }
  return (
    <CustomizedDialog
      open={open}
      handleClose={handleClose}
      fullWidth
      maxWidth={"md"}
    >
      <DialogHeader handleClose={handleClose}>
        {" "}
        <Typography variant="h5" component={"h2"}>
          {edit ? "Edit" : "Add"} Student Details
        </Typography>{" "}
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
            school_id: data.school_name.id,
            class: data?.class?.value,
            section: data?.section?.value,
            state: data?.state?.value,
            district: data?.district?.value,
            session: data?.session?.value,
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
                  selectLabel="School Code"
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
                <FieldInput
                  type={inputsType.TEXT}
                  fullWidth
                  label="Student Name*"
                  placeholder="Enter student name"
                  isError={!!errors.name?.message}
                  control={control}
                  register={register}
                  helperText={errors?.name?.message}
                  registerWith={"name"}
                  isRequired={true}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <RadioInputGroup
                  isRow
                  label="Gender*"
                  isError={!!errors.gender?.message}
                  control={control}
                  register={register}
                  helperText={errors?.gender?.message}
                  defaultValue={gender}
                  registerWith="gender"
                  isRequired={true}
                  options={allGenders}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FieldInput
                  type={inputsType.DATE}
                  fullWidth
                  label="Date Of Birth*"
                  isError={!!errors.d_o_b?.message}
                  control={control}
                  register={register}
                  helperText={errors?.d_o_b?.message}
                  registerWith={"d_o_b"}
                  isRequired={true}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <RHFAutoComplete
                  selectLabel="Class"
                  placeholder="Search & Select Class"
                  control={control}
                  registerWith={"class"}
                  options={allClasses}
                  error={!!errors.class?.message}
                  errorMessage={errors.class?.message}
                  isRequired={true}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <RHFAutoComplete
                  selectLabel="Section"
                  placeholder="Search & Select Section"
                  control={control}
                  registerWith={"section"}
                  options={allSections}
                  error={!!errors.section?.message}
                  errorMessage={errors.section?.message}
                  isRequired={true}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <RHFAutoComplete
                  selectLabel="State"
                  placeholder="Select State"
                  control={control}
                  registerWith={"state"}
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
                  registerWith={"district"}
                  options={districtOptions}
                  error={!!errors.district?.message}
                  errorMessage={errors.district?.message}
                  isRequired={true}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <FieldInput
                  type={inputsType.TEXT}
                  fullWidth
                  label="Village*"
                  placeholder="Enter village"
                  isError={!!errors.village?.message}
                  control={control}
                  register={register}
                  helperText={errors?.village?.message}
                  registerWith={"village"}
                  isRequired={true}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <RHFAutoComplete
                  selectLabel="Session"
                  placeholder="Select Session"
                  control={control}
                  registerWith={"session"}
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
    </CustomizedDialog>
  );
};

export default AddEditStudent;
