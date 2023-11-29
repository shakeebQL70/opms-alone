import React, { useEffect, useState } from "react";
import {
  DialogBody,
  DialogFooter,
  DialogHeader,
  CustomizedDialog,
} from "UI/modal";
import { BasicSelectSearch, RHFAutoComplete } from "UI/select";
import { FieldInput } from "UI/input";
import { CustomButton } from "UI/button";
import { Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { inputsType, RegisterOption } from "UI/utils";
import { useUserProfileStore, useProjectStore } from "SUPER/store";
import { allDesignation } from "../../utils/data";
import { getAllStates, getDistrictFromState } from "UI/indianStateAndDistrict";

interface ICreateUser {
  handleClose: (...params: any[]) => void;
  open: boolean;
  isEditingId: string;
  details: typeof defaultUserProfileValues;
  projectDDList: { label: string; id: string }[];
}

export const defaultUserProfileValues = {
  firstName: "",
  lastName: "",
  email: "",
  personalcontactNUMBER: "",
  project: null,
  designation: null,
  district: null,
  dateOfJoining: "",
  state: "",
};
const CreateUser = (props: ICreateUser) => {
  const stateOptions = getAllStates();

  const { handleClose, open, isEditingId, details, projectDDList } = props;
  const userProfileStore = useUserProfileStore((state: any) => state);

  const { isSubmitting, createData, updateData } = userProfileStore;

  const {
    watch,
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<typeof defaultUserProfileValues>({
    defaultValues: defaultUserProfileValues,
    mode: "onBlur",
  });

  const selectedState = watch("state");

  const districtOptions: any[] = React.useMemo(() => {
    if (selectedState) {
      // @ts-ignore
      return getDistrictFromState(selectedState?.label || "");
    }
    return [];
  }, [selectedState]);

  const handleCloseModal = () => {
    reset();
    handleClose();
  };

  useEffect(() => {
    if (isEditingId) {
      for (const key in details) {
        setValue(
          key as keyof typeof defaultUserProfileValues,
          details[key as keyof typeof defaultUserProfileValues]
        );
      }
    }
  }, [isEditingId]);

  const handleCreateUser = async (data: typeof defaultUserProfileValues) => {
    const {
      email,
      firstName,
      lastName,
      personalcontactNUMBER,
      designation,
      district,
      dateOfJoining,
      project,
      state,
    } = data;

    // @ts-nocheck
    const reqObj = {
      // @ts-ignore
      project_id: project?.id,
      email,
      first_name: firstName,
      last_name: lastName,
      contact_number: personalcontactNUMBER,
      // @ts-ignore
      designation: designation?.id,
      role_id: 1,
      // @ts-ignore
      state: state?.value,
      // @ts-ignore
      district: district?.value,
      date_of_joining: dateOfJoining,
    };

    try {
      if (isEditingId) {
        await updateData(reqObj, isEditingId);
      } else {
        await createData(reqObj);
      }
    } catch (error) {}
  };

  return (
    <CustomizedDialog
      open={open}
      handleClose={handleClose}
      fullWidth
      maxWidth="md"
    >
      <DialogHeader handleClose={handleClose}>Add Employee</DialogHeader>
      <form
        onSubmit={handleSubmit((data) => {
          handleCreateUser(data);
        })}
      >
        <DialogBody>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <RHFAutoComplete
                selectLabel="Project*"
                placeholder="Project"
                control={control}
                registerWith={RegisterOption.Project}
                options={projectDDList}
                error={!!errors.project?.message}
                errorMessage={errors.project?.message}
                isRequired={true}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FieldInput
                type={inputsType.TEXT}
                fullWidth
                label="First name*"
                placeholder="First name"
                isError={!!errors.firstName?.message}
                control={control}
                register={register}
                helperText={errors?.firstName?.message}
                registerWith={RegisterOption.FirstName}
                isRequired={true}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FieldInput
                type={inputsType.TEXT}
                fullWidth
                placeholder="Last name"
                label="Last name*"
                isError={!!errors.lastName?.message}
                control={control}
                register={register}
                helperText={errors?.lastName?.message}
                registerWith={RegisterOption.LastName}
                isRequired={true}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <FieldInput
                type={inputsType.EMAIL}
                fullWidth
                label="Email*"
                placeholder="Email"
                isError={!!errors.email?.message}
                control={control}
                register={register}
                helperText={errors?.email?.message}
                registerWith={RegisterOption.EMAIL}
                isRequired={true}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FieldInput
                type={inputsType.TEXT}
                fullWidth
                label="Contact Number*"
                placeholder="Contact Number"
                isError={!!errors.personalcontactNUMBER?.message}
                control={control}
                register={register}
                helperText={errors?.personalcontactNUMBER?.message}
                registerWith={"personalcontactNUMBER"}
                isRequired={true}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FieldInput
                type={inputsType.DATE}
                fullWidth
                label="Date of joining"
                isError={!!errors.dateOfJoining?.message}
                control={control}
                register={register}
                helperText={errors?.dateOfJoining?.message}
                registerWith={RegisterOption.DateOfJoining}
                isRequired={true}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <RHFAutoComplete
                selectLabel="Designation"
                placeholder="Designation"
                control={control}
                registerWith={RegisterOption.Designation}
                options={allDesignation}
                error={!!errors.designation?.message}
                errorMessage={errors.designation?.message}
                isRequired={false}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <RHFAutoComplete
                selectLabel="State*"
                placeholder="State"
                control={control}
                registerWith={"state"}
                options={stateOptions}
                error={!!errors.state?.message}
                errorMessage={errors.state?.message}
                isRequired={true}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <RHFAutoComplete
                selectLabel="District"
                placeholder="District"
                control={control}
                registerWith={RegisterOption.District}
                options={districtOptions}
                error={!!errors.district?.message}
                errorMessage={errors.district?.message}
                isRequired={true}
              />
            </Grid>
          </Grid>
        </DialogBody>
        <DialogFooter>
          <div className="flex gap-4 justify-end">
            <CustomButton variant="contained" type="submit" color="primary">
              Save
            </CustomButton>
            <CustomButton
              variant="outline"
              color="primary"
              onClick={handleClose}
              type="reset"
            >
              Cancel
            </CustomButton>
          </div>
        </DialogFooter>
      </form>
    </CustomizedDialog>
  );
};

export default CreateUser;
