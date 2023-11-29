import { Grid, Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import { EditButton } from "UI/button";
import {
  DialogBody,
  DialogFooter,
  DialogHeader,
  CustomizedDialog,
} from "UI/modal";

import {
  TableWrapper,
  TableBodyWrapper,
  StyledTableCell,
  StyledTableRow,
} from "UI/table";
import { BasicSelectSearch, RHFAutoComplete } from "UI/select";
import { FieldInput } from "UI/input";
import { CustomButton } from "UI/button";
import { useForm } from "react-hook-form";
import { inputsType, RegisterOption } from "UI/utils";
import { allDesignation, allExperience, allGenders } from "../../../utils/data";
import { formatDateYYYYMMDD } from "../../../utils";
import { NA } from ".";
import { useUserProfileStore } from "SUPER/store";
import { useParams } from "react-router-dom";

const defaultProfileValues = {
  email: "",
  personalcontactNUMBER: NaN,
  designation: null,
  dateOfJoining: "",
  dateOfResignation: "",
};

interface IEditProfile {
  handleClose: (...params: any[]) => void;
  open: boolean;
  refetchDetail: () => void;
  details: any;
}
const Profile = ({ details }: { details: any }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => {
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };

  const {
    email,
    personalcontactNUMBER,
    gender,
    designation,
    dateOfJoining,
    dateOfResignation,
  } = details;

  console.log({ openModal });

  const data = [
    {
      email,
      personalcontactNUMBER,
      designation,
      dateOfJoining: formatDateYYYYMMDD(dateOfJoining) || NA,
      dateOfResignation: formatDateYYYYMMDD(dateOfResignation) || NA,
    },
  ];
  return (
    <div>
      <Grid container justifyContent={"flex-end"} mb={1}>
        <Grid item>
          <EditButton onClick={handleOpen} />
        </Grid>
      </Grid>

      <Box>
        <TableWrapper>
          <TableBodyWrapper>
            {data.map((item, index) => (
              <React.Fragment key={index}>
                <StyledTableRow>
                  <StyledTableCell>Email</StyledTableCell>
                  <StyledTableCell>{item.email}</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>Contact No</StyledTableCell>
                  <StyledTableCell>
                    {item.personalcontactNUMBER}
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>Designation</StyledTableCell>
                  <StyledTableCell>{item.designation}</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>Date of Joining</StyledTableCell>
                  <StyledTableCell>{item.dateOfJoining}</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>Date of Resignation</StyledTableCell>
                  <StyledTableCell>{item.dateOfResignation}</StyledTableCell>
                </StyledTableRow>
              </React.Fragment>
            ))}
          </TableBodyWrapper>
        </TableWrapper>
      </Box>

      {openModal && (
        <EditProfile
          open={openModal}
          handleClose={handleClose}
          details={details}
          refetchDetail={() => {}}
        />
      )}
    </div>
  );
};

export default Profile;

const EditProfile = (props: IEditProfile) => {
  const params = useParams();
  const { handleClose, open, refetchDetail, details } = props;
  const { updateProfile } = useUserProfileStore((state: any) => state);

  const {
    watch,
    control,
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<typeof defaultProfileValues>({
    defaultValues: defaultProfileValues,
    mode: "onBlur",
  });

  const handleSubmitDetails = async (data: typeof defaultProfileValues) => {
    const {
      dateOfJoining,
      dateOfResignation,
      designation,
      email,
      personalcontactNUMBER,
    } = data;
    const reqObj = {
      // projectId: 1,
      email,
      contact_number: personalcontactNUMBER,
      // @ts-ignore
      designation: designation?.label || designation,
      district: "",
      // roleId: 1,
      date_of_joining: dateOfJoining,
      date_of_resignation: dateOfResignation,
    };

    try {
      await updateProfile(reqObj, params?.id);
      reset();
      handleClose();
    } catch (error) {}
  };

  useEffect(() => {
    if (open) {
      const { gender, ...rest } = details;
      for (const key in rest) {
        setValue(
          key as keyof typeof defaultProfileValues,
          details[key as keyof typeof defaultProfileValues]
        );
      }
    }
  }, [open]);

  return (
    <CustomizedDialog open={open} handleClose={handleClose}>
      <DialogHeader handleClose={handleClose}>Edit Profile</DialogHeader>
      <form
        onSubmit={handleSubmit((data) => {
          handleSubmitDetails(data);
        })}
      >
        <DialogBody>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FieldInput
                type={inputsType.EMAIL}
                fullWidth
                label="Email"
                placeholder="Email"
                isError={!!errors.email?.message}
                control={control}
                register={register}
                helperText={errors?.email?.message}
                registerWith={RegisterOption.EMAIL}
                isRequired={false}
                readOnly={true}
              />
            </Grid>
            <Grid item xs={12}>
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
            <Grid item xs={12}>
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
            <Grid item xs={12}>
              <FieldInput
                type={inputsType.DATE}
                fullWidth
                label="Date of joining*"
                isError={!!errors.dateOfJoining?.message}
                control={control}
                register={register}
                helperText={errors?.dateOfJoining?.message}
                registerWith={"dateOfJoining"}
                isRequired={true}
              />
            </Grid>
            <Grid item xs={12}>
              <FieldInput
                type={inputsType.DATE}
                fullWidth
                label="Date of resignation"
                isError={!!errors.dateOfResignation?.message}
                control={control}
                register={register}
                helperText={errors?.dateOfResignation?.message}
                registerWith={"dateOfResignation"}
                isRequired={false}
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
              variant="contained"
              color="error"
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

export { EditProfile };
