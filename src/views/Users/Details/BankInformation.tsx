import React, { Fragment, useEffect } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { EditButton, CustomButton } from "UI/button";
import { getURLForFile, FILE_BASE_URL } from "SUPER/service";
import { useUserProfileStore } from "SUPER/store";
import { Add } from "UI/icons";
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
import { FieldInput } from "UI/input";
import { useForm } from "react-hook-form";
import { FileUploadButton } from "UI/dragndrop";
import { ListImagePreview } from "UI/previewImg";
import { inputsType, acceptedImages } from "UI/utils";
import { useParams } from "react-router-dom";
import { selectedFile } from "../../../types";
import { NA } from ".";

const defaultValues = {
  panNo: "",
  panImg: "",
  AADHAARNUMBER: NaN,
  aadharImg: "",
  accountNUMBER: NaN,
  ifsCode: "",
  esiCodeNUMBER: NaN,
  pfAccountNUMBER: NaN,
  dateOfJoining: "",
};

interface IEditBankInformation {
  handleClose: (...params: any[]) => void;
  open: boolean;
  setAdhaarFile: (props: selectedFile) => void;
  setPANFile: (props: selectedFile) => void;
  adhaarFile: selectedFile;
  panFile: selectedFile;
  isEditingId: string;
  details: any[];
}
const BankInformation = ({ details }: { details: any }) => {
  const [openModal, setOpenModal] = useState(false);
  const [isEditingId, setIsEditingId] = useState("");
  const [adhaarFile, setAdhaarFile] = useState<selectedFile>({
    file: null,
    msg: "",
  });
  const [panFile, setPANFile] = useState<selectedFile>({
    file: null,
    msg: "",
  });

  const handleOpen = (id: string) => () => {
    if (id) {
      setIsEditingId(id);
    }
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
    setIsEditingId("");
  };

  const data = !details
    ? []
    : [
        {
          id: details.id,
          panNo: details?.pan_number || NA,
          panImg: details?.pan_image || NA,
          AADHAARNUMBER: details?.adhaar_number || NA,
          aadharImg: details?.adhaar_image_front || NA,
          accountNUMBER: details?.bank_account_number || NA,
          ifsCode: details?.ifsc_code || NA,
          esiCodeNUMBER: details?.esi_code || NA,
          pfAccountNUMBER: details?.pf_account_number,
          dateOfJoining: NA,
        },
      ];

  return (
    <div>
      <Grid container justifyContent={"flex-end"} mb={2}>
        <Grid item>
          {!details ? (
            <CustomButton
              variant="contained"
              color="primary"
              onClick={handleOpen("")}
              startIcon={<Add />}
            >
              Add Bank Information
            </CustomButton>
          ) : (
            <EditButton onClick={handleOpen(data[0].id)} />
          )}
        </Grid>
      </Grid>
      <Box>
        {!details ? (
          <Paper
            elevation={0}
            sx={{
              height: "200px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography>No Bank details added</Typography>
          </Paper>
        ) : (
          <TableWrapper>
            <TableBodyWrapper>
              {data.map((item, index) => (
                <Fragment key={index}>
                  <StyledTableRow>
                    <StyledTableCell>PAN No</StyledTableCell>
                    <StyledTableCell>{item.panNo}</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell>PAN Image</StyledTableCell>
                    <StyledTableCell>{item.panImg}</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell>Adhaar Number</StyledTableCell>
                    <StyledTableCell>{item.accountNUMBER}</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell>Adhaar Image</StyledTableCell>
                    <StyledTableCell>{item.aadharImg}</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell>Account No</StyledTableCell>
                    <StyledTableCell>{item.accountNUMBER}</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell>IFS Code</StyledTableCell>
                    <StyledTableCell>{item.ifsCode}</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell>ESI Code</StyledTableCell>
                    <StyledTableCell>{item.esiCodeNUMBER}</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell>PF Account</StyledTableCell>
                    <StyledTableCell>{item.pfAccountNUMBER}</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell>Date Of Joining</StyledTableCell>
                    <StyledTableCell>{item.dateOfJoining}</StyledTableCell>
                  </StyledTableRow>
                </Fragment>
              ))}
            </TableBodyWrapper>
          </TableWrapper>
        )}
      </Box>
      {openModal && (
        <EditBankInformation
          open={openModal}
          handleClose={handleClose}
          setAdhaarFile={setAdhaarFile}
          setPANFile={setPANFile}
          adhaarFile={adhaarFile}
          panFile={panFile}
          isEditingId={isEditingId}
          details={data}
        />
      )}
    </div>
  );
};

export default BankInformation;

type AADHAR_IMG = "aadharImg";
type PAN_IMG = "panImg";
type imageFiles = AADHAR_IMG | PAN_IMG;
const EditBankInformation = (props: IEditBankInformation) => {
  const params = useParams();
  const {
    handleClose,
    open,
    adhaarFile,
    panFile,
    setAdhaarFile,
    setPANFile,
    isEditingId,
    details,
  } = props;

  const {
    watch,
    control,
    register,
    setValue,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<typeof defaultValues>({ defaultValues, mode: "onBlur" });

  const { addBankDetails, updateBankDetails } = useUserProfileStore(
    (state: any) => state
  );

  const uploadSelectedFile = async (
    filename: string,
    key: imageFiles,
    file: File
  ) => {
    const { msg, isError }: any = await getURLForFile(filename, file);
    if (!isError) {
      setValue(key, `${FILE_BASE_URL}${filename}`);
    } else {
      setError(key, msg);
    }
  };

  const handleCloseModal = () => {
    handleClose();
    reset();
    setAdhaarFile({ file: null, msg: "" });
    setPANFile({ file: null, msg: "" });
  };

  useEffect(() => {
    if (panFile?.file?.name) {
      uploadSelectedFile(panFile.file.name, "panImg", panFile.file);
    }
  }, [panFile.file?.name]);

  useEffect(() => {
    if (adhaarFile?.file?.name) {
      uploadSelectedFile(adhaarFile.file.name, "aadharImg", adhaarFile.file);
    }
  }, [adhaarFile.file?.name]);

  useEffect(() => {
    if (isEditingId) {
      for (const key in details[0]) {
        if (key === "panImg") {
          setPANFile({
            file: details[0][key as keyof typeof defaultValues],
            msg: "",
          });
        }
        if (key === "aadharImg") {
          setAdhaarFile({
            file: details[0][key as keyof typeof defaultValues],
            msg: "",
          });
        }

        setValue(
          key as keyof typeof defaultValues,
          details[0][key as keyof typeof defaultValues]
        );
      }
    }
  }, [isEditingId]);

  const handleSubmitBankDetails = async (data: typeof defaultValues) => {
    const {
      aadharImg,
      accountNUMBER,
      AADHAARNUMBER,
      dateOfJoining,
      esiCodeNUMBER,
      ifsCode,
      panImg,
      panNo,
      pfAccountNUMBER,
    } = data;
    const reqObj = {
      pan_number: panNo,
      pan_image: panImg,
      adhaar_number: +AADHAARNUMBER,
      adhaar_image_front: aadharImg,
      adhaar_image_back: aadharImg,
      bank_account_number: +accountNUMBER,
      ifsc_code: ifsCode,
      esi_code: +esiCodeNUMBER,
      pf_account_number: +pfAccountNUMBER,
      user_id: params.id,
    };

    try {
      if (isEditingId) {
        await updateBankDetails(reqObj, isEditingId);
        handleCloseModal();
      } else {
        await addBankDetails(reqObj);
        handleCloseModal();
      }
    } catch (error) {}
  };

  return (
    <CustomizedDialog open={open} handleClose={handleClose}>
      <DialogHeader handleClose={handleClose}>Edit Bank Details</DialogHeader>
      <form
        onSubmit={handleSubmit((data) => {
          handleSubmitBankDetails(data);
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
                    label="Pan Number*"
                    placeholder="PAN Number"
                    isError={!!errors.panNo?.message}
                    control={control}
                    register={register}
                    helperText={errors?.panNo?.message}
                    registerWith={"panNo"}
                    isRequired={true}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  {!panFile.file?.name ? (
                    <FileUploadButton
                      label="PAN Image"
                      acceptedFilesExt={acceptedImages}
                      setFile={setPANFile}
                    />
                  ) : (
                    <ListImagePreview
                      fileName={panFile.file.name}
                      handleRemoveFile={() =>
                        setPANFile({ file: null, msg: "" })
                      }
                      msg={panFile.msg || errors.panImg?.message}
                      label="PAN Image"
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <FieldInput
                    type={inputsType.TEXT}
                    fullWidth
                    label="Adhaar Number*"
                    placeholder="Adhaar Number"
                    isError={!!errors.AADHAARNUMBER?.message}
                    control={control}
                    register={register}
                    helperText={errors?.AADHAARNUMBER?.message}
                    registerWith={"AADHAARNUMBER"}
                    isRequired={true}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  {!adhaarFile.file?.name ? (
                    <FileUploadButton
                      label="Adhaar Image"
                      acceptedFilesExt={acceptedImages}
                      setFile={setAdhaarFile}
                    />
                  ) : (
                    <ListImagePreview
                      fileName={adhaarFile.file.name}
                      handleRemoveFile={() =>
                        setAdhaarFile({ file: null, msg: "" })
                      }
                      msg={adhaarFile.msg || errors.aadharImg?.message}
                      label="Aadhar Image"
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <FieldInput
                    type={inputsType.TEXT}
                    fullWidth
                    label="Account Number*"
                    placeholder="Account Number"
                    isError={!!errors.accountNUMBER?.message}
                    control={control}
                    register={register}
                    helperText={errors?.accountNUMBER?.message}
                    registerWith={"accountNUMBER"}
                    isRequired={true}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FieldInput
                    type={inputsType.TEXT}
                    fullWidth
                    label="IFS Code*"
                    placeholder="IFS Code"
                    isError={!!errors.ifsCode?.message}
                    control={control}
                    register={register}
                    helperText={errors?.ifsCode?.message}
                    registerWith={"ifsCode"}
                    isRequired={true}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <FieldInput
                    type={inputsType.TEXT}
                    fullWidth
                    label="ESI Code"
                    placeholder="Enter ESI Code"
                    isError={!!errors.esiCodeNUMBER?.message}
                    control={control}
                    register={register}
                    helperText={errors?.esiCodeNUMBER?.message}
                    registerWith={"esiCodeNUMBER"}
                    isRequired={false}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FieldInput
                    type={inputsType.TEXT}
                    fullWidth
                    label="PF Account"
                    placeholder="PF Account"
                    isError={!!errors.pfAccountNUMBER?.message}
                    control={control}
                    register={register}
                    helperText={errors?.pfAccountNUMBER?.message}
                    registerWith={"pfAccountNUMBER"}
                    isRequired={false}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <FieldInput
                type={inputsType.DATE}
                fullWidth
                label="Date of Joining"
                isError={!!errors.dateOfJoining?.message}
                control={control}
                register={register}
                helperText={errors?.dateOfJoining?.message}
                registerWith={"dateOfJoining"}
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

export { EditBankInformation };
