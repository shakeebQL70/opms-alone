import React from "react";
import { Grid, IconButton, InputLabel, Box } from "@mui/material";
import { useState } from "react";
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
import { FieldInput } from "UI/input";
import { CustomButton } from "UI/button";
import { useFieldArray, useForm } from "react-hook-form";
import { inputsType } from "UI/utils";
import { RHFSelect } from "UI/select";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import BorderBottom from "../../../components/BorderButton";

const defaultValues = {
  qualification: "",
  completion: "",
  institutionName: "",
  universityName: "",
  institutionType: "",
  remarks: "",
};
type FormValues = {
  editTechnicalQualification: {
    qualification: string;
    completion: string;
    institutionName: string;
    universityName: string;
    institutionType: string;
    remarks: string;
  }[];
};

const data = [
  { title: "Qualification", value: "Not Available" },
  { title: "Completion", value: "Not Available" },
  { title: "Institution Name", value: "Not Available" },
  { title: "University Name", value: "Not Available" },
  { title: "Institution Type", value: "Not Available" },
  { title: "Remarks", value: "Not Available" },
];
interface IEditTechnicalQualification {
  handleClose: (...params: any[]) => void;
  open: boolean;
}
const TechnicalQualification = (details: { details: any[] }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => {
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };

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
            {data?.map((detail, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>{detail.title}</StyledTableCell>
                <StyledTableCell>{detail.value}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBodyWrapper>
        </TableWrapper>
      </Box>
      {openModal && (
        <EditTechnicalQualification
          open={openModal}
          handleClose={handleClose}
        />
      )}
    </div>
  );
};

export default TechnicalQualification;

const EditTechnicalQualification = (props: IEditTechnicalQualification) => {
  const { handleClose, open } = props;

  const {
    watch,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onBlur",
    defaultValues: {
      editTechnicalQualification: [defaultValues],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "editTechnicalQualification",
  });

  const handleSubmitTechnicalQualification = () => {
    const reqObj = {
      qualification_name: "Bachelor of Science",
      completion_date: "2022-05-30",
      institute_name: "XYZ College",
      board_university: "University of XYZ",
      percentage_marks: 75,
      user_id: 2,
    };
  };

  return (
    <CustomizedDialog
      open={open}
      handleClose={handleClose}
      maxWidth="lg"
      fullWidth
    >
      <DialogHeader handleClose={handleClose}>
        Technical/Professional Qualification (Start from most recent)
      </DialogHeader>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <DialogBody>
          <Grid container justifyContent={"end"} gap={"10px"}>
            <Grid>
              <IconButton color="success" onClick={() => append(defaultValues)}>
                <AddCircleRoundedIcon />
              </IconButton>
            </Grid>
          </Grid>
          {fields.map((item, index) => {
            return (
              <Box position={"relative"} key={index} mt={"2rem"} p={"1rem"}>
                <BorderBottom
                  handleClick={() => remove(index)}
                  disabled={fields.length === 1}
                />
                <Grid container spacing={2}>
                  <Grid item xs={6} md={2}>
                    <FieldInput
                      type={inputsType.TEXT}
                      fullWidth
                      label="Exam Passed*"
                      placeholder="Exam Passed"
                      isError={
                        !!errors?.editTechnicalQualification?.[index]
                          ?.qualification?.message
                      }
                      control={control}
                      register={register}
                      helperText={
                        errors?.editTechnicalQualification?.[index]
                          ?.qualification?.message
                      }
                      registerWith={`editTechnicalQualification.${index}.qualification`}
                      isRequired={true}
                    />
                  </Grid>
                  <Grid item xs={6} md={2}>
                    <FieldInput
                      type={inputsType.TEXT}
                      fullWidth
                      label="Passing Year*"
                      placeholder="Passing Year"
                      isError={
                        !!errors?.editTechnicalQualification?.[index]
                          ?.completion?.message
                      }
                      control={control}
                      register={register}
                      helperText={
                        errors?.editTechnicalQualification?.[index]?.completion
                          ?.message
                      }
                      registerWith={`editTechnicalQualification.${index}.completion`}
                      isRequired={true}
                    />
                  </Grid>
                  <Grid item xs={6} md={2}>
                    <FieldInput
                      type={inputsType.TEXT}
                      fullWidth
                      label="Board/University*"
                      placeholder="Board/University"
                      isError={
                        !!errors?.editTechnicalQualification?.[index]
                          ?.institutionName?.message
                      }
                      control={control}
                      register={register}
                      helperText={
                        errors?.editTechnicalQualification?.[index]
                          ?.institutionName?.message
                      }
                      registerWith={`editTechnicalQualification.${index}.institutionName`}
                      isRequired={true}
                    />
                  </Grid>
                  <Grid item xs={6} md={2}>
                    <FieldInput
                      type={inputsType.TEXT}
                      fullWidth
                      label="Division*"
                      placeholder="Division"
                      isError={
                        !!errors?.editTechnicalQualification?.[index]
                          ?.universityName?.message
                      }
                      control={control}
                      register={register}
                      helperText={
                        errors?.editTechnicalQualification?.[index]
                          ?.universityName?.message
                      }
                      registerWith={`editTechnicalQualification.${index}.universityName`}
                      isRequired={true}
                    />
                  </Grid>
                  <Grid item xs={6} md={2}>
                    <RHFSelect
                      selectLabel="Institution Type*"
                      placeholder="Institution Type"
                      control={control}
                      registerWith={`editTechnicalQualification.${index}.institutionType`}
                      options={[
                        { label: "Recognized University", id: "1" },
                        { label: "Central/State Govt. Institutions", id: "2" },
                        { label: "AICTE Approved Institution", id: "3" },
                      ]}
                      error={
                        !!errors?.editTechnicalQualification?.[index]
                          ?.institutionType?.message
                      }
                      errorMessage={
                        errors?.editTechnicalQualification?.[index]
                          ?.institutionType?.message
                      }
                      isRequired={false}
                    />
                  </Grid>
                  <Grid item xs={6} md={2}>
                    <FieldInput
                      type={inputsType.TEXT}
                      fullWidth
                      label="Remarks*"
                      placeholder="Remarks"
                      isError={
                        !!errors?.editTechnicalQualification?.[index]?.remarks
                          ?.message
                      }
                      control={control}
                      register={register}
                      helperText={
                        errors?.editTechnicalQualification?.[index]?.remarks
                          ?.message
                      }
                      registerWith={`editTechnicalQualification.${index}.remarks`}
                      isRequired={true}
                    />
                  </Grid>
                </Grid>
              </Box>
            );
          })}
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

export { EditTechnicalQualification };
