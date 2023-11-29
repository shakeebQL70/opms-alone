import { Box, FormLabel, Grid, IconButton, Typography } from "@mui/material";
import React, { Key, useState, useEffect } from "react";
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
import { RHFSelect } from "UI/select";
import { FieldInput } from "UI/input";
import { CustomButton } from "UI/button";
import { useForm } from "react-hook-form";
import { inputsType, RegisterOption, acceptedImages } from "UI/utils";
import { getURLForFile, FILE_BASE_URL } from "SUPER/service";
import { useUserProfileStore } from "SUPER/store";

import DragNDrop from "UI/dragndrop";
import { ISelectedFiles } from "../../../types";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import PreviewImg from "UI/previewImg";
import { useParams } from "react-router-dom";
import { allGenders } from "../../../utils/data";
import { formatDateYYYYMMDD } from "../../../utils";
import { NA } from ".";

const defaultValues = {
  fatherName: "",
  dob: "",
  gender: "",
  emergencycontactNUMBER: "",
  residentialAddress: "",
  residentialPINCODENUMBER: "",
  permanentAddress: "",
  permanentPINCODENUMBER: "",
  imgSignedURL: "",
};

const data = [
  { title: "Father's Name", value: "Not Available" },
  { title: "Date of Birth", value: "Not Available" },
  { title: "Gender", value: "Not Available" },
  { title: "Emergency Contact Number", value: "Not Available" },
  { title: "Residential Address", value: "Not Available" },
  { title: "Residential PIN Code", value: "Not Available" },
  { title: "Permanent Address", value: "Not Available" },
  { title: "Permanent PIN Code", value: "Not Available" },
  { title: "Profile Image", value: "Not Available" },
];
interface IEditPersonalDetail {
  handleClose: (...params: any[]) => void;
  open: boolean;
  setFile: (props: ISelectedFiles[]) => void;
  handleRemoveFile: () => void;
  file: ISelectedFiles[];
  details: any;
}
const PersonalDetails = ({ details }: { details: any }) => {
  const [openModal, setOpenModal] = useState(false);
  const [profileImage, setProfileImage] = useState<ISelectedFiles[]>([]);

  const handleOpen = () => {
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };

  const {
    fatherName,
    dob,
    gender,
    emergencycontactNUMBER,
    residentialAddress,
    residentialPINCODENUMBER,
    permanentAddress,
    permanentPINCODENUMBER,
    imgSignedURL,
  } = details;

  const data = [
    {
      fatherName,
      dob: formatDateYYYYMMDD(dob) || NA,
      gender,
      emergencycontactNUMBER,
      residentialAddress,
      residentialPINCODENUMBER,
      permanentAddress,
      permanentPINCODENUMBER,
      imgSignedURL,
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
            {data?.map((item, index) => (
              <React.Fragment key={index}>
                <StyledTableRow>
                  <StyledTableCell>Father's Name</StyledTableCell>
                  <StyledTableCell>{item.fatherName}</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>Date of Birth</StyledTableCell>
                  <StyledTableCell>{item.dob}</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>Gender</StyledTableCell>
                  <StyledTableCell>{item.gender}</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>Emergency Contact Number</StyledTableCell>
                  <StyledTableCell>{item.emergencycontactNUMBER}</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>Residential Address</StyledTableCell>
                  <StyledTableCell>{item.residentialAddress}</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>Residential PIN Code</StyledTableCell>
                  <StyledTableCell>{item.residentialPINCODENUMBER}</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>Permanent Addres</StyledTableCell>
                  <StyledTableCell>{item.permanentAddress}</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>Permanent PIN Code</StyledTableCell>
                  <StyledTableCell>{item.permanentPINCODENUMBER}</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>Profile Image</StyledTableCell>
                  <StyledTableCell>{item.imgSignedURL}</StyledTableCell>
                </StyledTableRow>
              </React.Fragment>
            ))}
          </TableBodyWrapper>
        </TableWrapper>
      </Box>
      {openModal && (
        <EditPersonalDetail
          open={openModal}
          handleClose={handleClose}
          setFile={setProfileImage}
          file={profileImage}
          handleRemoveFile={() => setProfileImage([])}
          details={details}
        />
      )}
    </div>
  );
};

export default PersonalDetails;

const EditPersonalDetail = (props: IEditPersonalDetail) => {
  const { updateData } = useUserProfileStore((state: any) => state);
  const params = useParams();

  const { handleClose, open, setFile, file, handleRemoveFile, details } = props;

  const {
    watch,
    control,
    register,
    setValue,
    setError,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<typeof defaultValues>({ defaultValues, mode: "onBlur" });

  const uploadSelectedFile = async (
    filename: string,
    key: "imgSignedURL",
    file: File
  ) => {
    const { msg, isError }: any = await getURLForFile(filename, file);
    if (!isError) {
      setValue(key, `${FILE_BASE_URL}${filename}`);
    } else {
      setError(key, msg);
    }
  };

  useEffect(() => {
    if (file.length && file[0]?.name) {
      uploadSelectedFile(file[0].name, "imgSignedURL", file[0]);
    }
  }, [file[0]?.name]);

  const handleSubmitPersonalDetails = async (data: typeof defaultValues) => {
    const {
      dob,
      emergencycontactNUMBER,
      fatherName,
      gender,
      imgSignedURL,
      permanentAddress,
      permanentPINCODENUMBER,
      residentialAddress,
      residentialPINCODENUMBER,
    } = data;

    const reqObj = {
      d_o_b: dob,
      father_name: fatherName,
      gender: allGenders.find((item) => item.id === +gender)?.value,
      emergency_contact_no: +emergencycontactNUMBER,
      residential_address: residentialAddress,
      residential_pincode: +residentialPINCODENUMBER,
      permanent_address: permanentAddress,
      permanent_pincode: +permanentPINCODENUMBER,
      user_profile_image: imgSignedURL,
    };
    await updateData(reqObj, params.id);
    handleClose();
    reset();
  };

  console.log("imgSInged", watch("imgSignedURL"));

  useEffect(() => {
    const { gender, ...rest } = details;
    if (open) {
      for (const key in rest) {
        setValue(
          key as keyof typeof defaultValues,
          details[key as keyof typeof defaultValues]
        );
      }
    }
  }, [open]);

  return (
    <CustomizedDialog open={open} handleClose={handleClose}>
      <DialogHeader handleClose={handleClose}>
        Edit Personal Details
      </DialogHeader>
      <form
        onSubmit={handleSubmit((data) => {
          handleSubmitPersonalDetails(data);
        })}
      >
        <DialogBody>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <FieldInput
                    type={inputsType.TEXT}
                    fullWidth
                    label="Father's Name*"
                    placeholder="Father's Name"
                    isError={!!errors.fatherName?.message}
                    control={control}
                    register={register}
                    helperText={errors?.fatherName?.message}
                    registerWith={"fatherName"}
                    isRequired={true}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FieldInput
                    type={inputsType.DATE}
                    fullWidth
                    label="Date of birth"
                    isError={!!errors.dob?.message}
                    control={control}
                    register={register}
                    helperText={errors?.dob?.message}
                    registerWith={"dob"}
                    isRequired={true}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <RHFSelect
                    selectLabel="Gender*"
                    placeholder="Gender"
                    control={control}
                    registerWith={"gender"}
                    options={allGenders}
                    error={!!errors.gender?.message}
                    errorMessage={errors.gender?.message}
                    isRequired={true}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FieldInput
                    type={inputsType.TEXT}
                    fullWidth
                    label="Emergency Contact No"
                    placeholder="Emergency Contact No"
                    isError={!!errors.emergencycontactNUMBER?.message}
                    control={control}
                    register={register}
                    helperText={errors?.emergencycontactNUMBER?.message}
                    registerWith={"emergencycontactNUMBER"}
                    isRequired={false}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <FieldInput
                type={inputsType.TEXTAREA}
                fullWidth
                label="Residential Address*"
                placeholder="Residential Address"
                isError={!!errors.residentialAddress?.message}
                control={control}
                register={register}
                helperText={errors?.residentialAddress?.message}
                registerWith={"residentialAddress"}
                isRequired={true}
              />
            </Grid>
            <Grid item xs={12}>
              <FieldInput
                type={inputsType.TEXT}
                fullWidth
                label="Residential PIN*"
                placeholder="Residential PIN"
                isError={!!errors.residentialPINCODENUMBER?.message}
                control={control}
                register={register}
                helperText={errors?.residentialPINCODENUMBER?.message}
                registerWith={"residentialPINCODENUMBER"}
                isRequired={true}
              />
            </Grid>
            <Grid item xs={12}>
              <FieldInput
                type={inputsType.TEXTAREA}
                fullWidth
                label="Permanent Address*"
                placeholder="Permanent Address"
                isError={!!errors.permanentAddress?.message}
                control={control}
                register={register}
                helperText={errors?.permanentAddress?.message}
                registerWith={"permanentAddress"}
                isRequired={true}
              />
            </Grid>
            <Grid item xs={12}>
              <FieldInput
                type={inputsType.TEXT}
                fullWidth
                label="Permanent PIN*"
                placeholder="Permanent PIN"
                isError={!!errors.permanentPINCODENUMBER?.message}
                control={control}
                register={register}
                helperText={errors?.permanentPINCODENUMBER?.message}
                registerWith={"permanentPINCODENUMBER"}
                isRequired={true}
              />
            </Grid>

            <Grid item xs={6}>
              <FormLabel>Upload Profile Image</FormLabel>
              <Box height={"220px"}>
                <DragNDrop
                  setFiles={setFile}
                  acceptedFilesExt={acceptedImages}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              {!!file.length && (
                <>
                  <FormLabel>Selected Image</FormLabel>
                  <Box
                    height={"220px"}
                    sx={{
                      backgroundColor: "rgba(0,0,0,0.05)",
                      position: "relative",
                    }}
                  >
                    <IconButton
                      sx={{ position: "absolute", top: "0rem", right: "0rem" }}
                      onClick={handleRemoveFile}
                    >
                      <CancelOutlinedIcon />
                    </IconButton>
                    <PreviewImg
                      src={defaultValues.imgSignedURL}
                      alt={defaultValues.imgSignedURL}
                    />
                  </Box>
                </>
              )}
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

export { EditPersonalDetail };
