import React, { useState } from "react";
import {
  DialogBody,
  DialogFooter,
  DialogHeader,
  CustomizedDialog,
} from "UI/modal";
import { RHFAutoComplete, RHFSelect } from "UI/select";
import { FieldInput } from "UI/input";
import { CustomButton } from "UI/button";
import { Divider, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { inputsType } from "UI/utils";
import { allDevices, schoolCodes } from "../../utils/data";

interface ICreateUser {
  handleClose: (...params: any[]) => void;
  open: boolean;
}

const defaultValues = {
  schoolNameCode: null,
  device: "",
  date: "",
  status: "",
  startTime: "",
  endTime: "",
  description: "",
};

const AddEditUptimeDowntime = (props: ICreateUser) => {
  const { handleClose, open } = props;

  const {
    watch,
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<typeof defaultValues>({ defaultValues, mode: "onBlur" });

  const handleCloseModal = () => {
    reset();
    handleClose();
  };

  console.log({ errors });

  return (
    <CustomizedDialog
      open={open}
      handleClose={handleCloseModal}
      maxWidth="lg"
      fullWidth
    >
      <DialogHeader handleClose={handleCloseModal}>
        Add Asset Complaint
      </DialogHeader>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <DialogBody>
          <Grid container spacing={2}>
            <Grid item xs={6} md={3}>
              <RHFAutoComplete
                selectLabel="Select and Search School Code*"
                placeholder="Select and Search School Code"
                control={control}
                registerWith={"schoolNameCode"}
                options={schoolCodes}
                error={!!errors.schoolNameCode?.message}
                errorMessage={errors.schoolNameCode?.message}
                isRequired={true}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <RHFSelect
                selectLabel="Select Device"
                placeholder="Select Device"
                control={control}
                registerWith={"device"}
                options={allDevices}
                error={!!errors.device?.message}
                errorMessage={errors.device?.message}
                isRequired={true}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <RHFSelect
                selectLabel="Select Status"
                placeholder="Select Status"
                control={control}
                registerWith={"status"}
                options={allDevices}
                error={!!errors.status?.message}
                errorMessage={errors.status?.message}
                isRequired={true}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <FieldInput
                type={inputsType.DATE}
                fullWidth
                label="Date"
                placeholder="Date"
                isError={!!errors.date?.message}
                control={control}
                register={register}
                helperText={errors?.date?.message}
                registerWith={"date"}
                isRequired={true}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6} md={3}>
              <FieldInput
                type={inputsType.TIME}
                fullWidth
                label="Start Time"
                placeholder="Start Time"
                isError={!!errors.startTime?.message}
                control={control}
                register={register}
                helperText={errors?.startTime?.message}
                registerWith={"startTime"}
                isRequired={true}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <FieldInput
                type={inputsType.TIME}
                fullWidth
                label="End Time"
                placeholder="End Time"
                isError={!!errors.endTime?.message}
                control={control}
                register={register}
                helperText={errors?.endTime?.message}
                registerWith={"endTime"}
                isRequired={true}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <FieldInput
                type={inputsType.TEXTAREA}
                fullWidth
                label="Description"
                placeholder="Description"
                isError={!!errors.description?.message}
                control={control}
                register={register}
                helperText={errors?.description?.message}
                registerWith={"description"}
                isRequired={true}
                
              />
            </Grid>
          </Grid>
        </DialogBody>
        <DialogFooter>
          <div className="flex gap-4 justify-end">
            <CustomButton variant="contained" type="submit" color="primary">
              Add Uptime and Downtime
            </CustomButton>
            <CustomButton
              variant="outline"
              color="primary"
              onClick={handleCloseModal}
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

export default AddEditUptimeDowntime;
