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
import { Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { inputsType, RegisterOption, acceptedImages } from "UI/utils";
import { FileUploadButton } from "UI/dragndrop";
import { ListImagePreview } from "UI/previewImg";
import { selectedFile } from "../../types";

interface ICreateUser {
  handleClose: (...params: any[]) => void;
  open: boolean;
}

const defaultValues = {
  schoolName: null,
  policyType: "",
  insuranceClaimStatus: "",
  assetSerialNumber: null,
  otherLeftItem: "",
  firDate: "",
  firCopy: "",
  letterFromSchool: null,
  installationCertificate: "",
};

const AddEditTheftDetails = (props: ICreateUser) => {
  const { handleClose, open } = props;
  const [firCopy, setFIRCopy] = useState<selectedFile>();
  const [letterFromSchool, setLetterFromSchool] = useState<selectedFile>();
  const [installationCertificate, setInstallationCertification] =
    useState<selectedFile>();

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

  return (
    <CustomizedDialog
      open={open}
      handleClose={handleCloseModal}
      fullWidth
      maxWidth="md"
    >
      <DialogHeader handleClose={handleCloseModal}>
        {" "}
        Add Asset Theft Detail
      </DialogHeader>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <DialogBody>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <RHFAutoComplete
                selectLabel="School (BCCL Code*)"
                placeholder="School (BCCL Code*)"
                control={control}
                registerWith={"schoolName"}
                options={[
                  { label: "BCCL-JH-ICT-SIM-907", id: 1 },
                  { label: "BCCL-JH-ICT-SIM-908", id: 2 },
                  { label: "BCCL-JH-ICT-SIM-909", id: 3 },
                ]}
                error={!!errors.schoolName?.message}
                errorMessage={errors.schoolName?.message}
                isRequired={true}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <RHFSelect
                selectLabel="Policy Type"
                placeholder="Policy Type"
                control={control}
                registerWith={"policyType"}
                options={[
                  { label: "Flood", id: 1 },
                  { label: "Fire", id: 2 },
                  { label: "Stolen", id: 3 },
                ]}
                error={!!errors.policyType?.message}
                errorMessage={errors.policyType?.message}
                isRequired={true}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <RHFSelect
                selectLabel="Insurance Claim Status*"
                placeholder="Insurance Claim Status"
                control={control}
                registerWith={"insuranceClaimStatus"}
                options={[
                  { label: "Yes", id: 1 },
                  { label: "No", id: 2 },
                ]}
                error={!!errors.insuranceClaimStatus?.message}
                errorMessage={errors.insuranceClaimStatus?.message}
                isRequired={true}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <RHFAutoComplete
                selectLabel="Asset Serial Number (Category + Make Model + Serial Number)*"
                placeholder="Asset Serial Number (Category + Make Model + Serial Number)"
                control={control}
                registerWith={"assetSerialNumber"}
                options={[]}
                error={!!errors.assetSerialNumber?.message}
                errorMessage={errors.assetSerialNumber?.message}
                isRequired={true}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FieldInput
                type={inputsType.TEXTAREA}
                fullWidth
                label="Other Left Item*"
                placeholder="Other Left Item"
                isError={!!errors.otherLeftItem?.message}
                control={control}
                register={register}
                helperText={errors?.otherLeftItem?.message}
                registerWith={"otherLeftItem"}
                isRequired={true}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FieldInput
                type={inputsType.DATE}
                fullWidth
                label="FIR Date*"
                placeholder="FIR Date"
                isError={!!errors.firDate?.message}
                control={control}
                register={register}
                helperText={errors?.firDate?.message}
                registerWith={"firDate"}
                isRequired={true}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              {!firCopy?.file?.name ? (
                <FileUploadButton
                  label="FIR Copy"
                  acceptedFilesExt={acceptedImages}
                  setFile={setFIRCopy}
                  sx={{ width: "100%" }}
                />
              ) : (
                <ListImagePreview
                  fileName={firCopy.file.name}
                  handleRemoveFile={() => setFIRCopy({ file: null, msg: "" })}
                  msg={firCopy.msg}
                />
              )}
            </Grid>
            <Grid item xs={12} md={4}>
              {!letterFromSchool?.file?.name ? (
                <FileUploadButton
                  label="Letter From School"
                  acceptedFilesExt={acceptedImages}
                  setFile={setLetterFromSchool}
                  sx={{ width: "100%" }}
                />
              ) : (
                <ListImagePreview
                  fileName={letterFromSchool.file.name}
                  handleRemoveFile={() =>
                    setLetterFromSchool({ file: null, msg: "" })
                  }
                  msg={letterFromSchool.msg}
                />
              )}
            </Grid>
            <Grid item xs={12} md={4}>
              {!installationCertificate?.file?.name ? (
                <FileUploadButton
                  label="Installation Certificate"
                  acceptedFilesExt={acceptedImages}
                  setFile={setInstallationCertification}
                  sx={{ width: "100%" }}
                />
              ) : (
                <ListImagePreview
                  fileName={installationCertificate.file.name}
                  handleRemoveFile={() =>
                    setInstallationCertification({ file: null, msg: "" })
                  }
                  msg={installationCertificate.msg}
                />
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

export default AddEditTheftDetails;
