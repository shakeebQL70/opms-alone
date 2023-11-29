import React from "react";
import {
  Grid,
  IconButton,
  InputLabel,
  Box,
  Typography,
  Paper,
} from "@mui/material";
import { useState, useEffect } from "react";
import { EditButton } from "UI/button";
import { Add } from "UI/icons";
import { RHFSelect } from "UI/select";

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
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import BorderBottom from "../../../components/BorderButton";
import { useParams } from "react-router-dom";
import { formatDateYYYYMMDD } from "../../../utils";
import { useUserProfileStore } from "SUPER/store";
import { institutionTypes } from "../../../utils/data";
import { NA } from ".";

const defaultValues = {
  qualificationName: "",
  passYEARNUMBER: NaN,
  university: "",
  division: "",
  marksNUMBER: NaN,
  remarks: "",
  institutionType: "",
  institutionName: "",
};
type FormValues = {
  editEducationDetail: {
    qualificationName: string;
    passYEARNUMBER: number;
    university: string;
    division: string;
    marksNUMBER: number;
    remarks: string;
    institutionType: string;
    institutionName: string;
  }[];
};

// const data = [
//   { title: "Exam Passed", value: "Not Available" },
//   { title: "Passing Year", value: "Not Available" },
//   { title: "University", value: "Not Available" },
//   { title: "Division", value: "Not Available" },
//   { title: "Marks", value: "Not Available" },
// ];

interface IEditEducationDetail {
  handleClose: (...params: any[]) => void;
  open: boolean;
  allData: any[];
  isEditingId: string;
}
const EducationDetail = ({ details }: { details: any[] }) => {
  const [openModal, setOpenModal] = useState(false);
  const [isEditingId, setIsEditingId] = useState("");

  const handleOpen = (id: string, index: number | undefined) => () => {
    if (id && index !== undefined) {
      setIsEditingId(`${id}-${index}`);
    }
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
    setIsEditingId("");
  };

  //   [
  //     {
  //         "id": 1,
  //         "qualification_name": "BTech",
  //         "completion_date": "2022-01-01T00:00:00.000Z",
  //         "institute_name": "Delhi Univeristy",
  //         "board_university": "Delhi University",
  //         "percentage_marks": 87,
  //         "user_id": 1,
  //         "created_at": "2023-11-16T10:58:57.940Z",
  //         "updated_at": "2023-11-16T10:58:57.940Z"
  //     }
  // ]
  const data = !details?.length
    ? []
    : details.map((item) => {
        return {
          id: item.id,
          qualificationName: item?.qualification_name || NA,
          passYEARNUMBER: item?.completion_date || new Date().getFullYear(),
          university: item?.board_university || NA,
          division: item?.division || NA,
          marksNUMBER: item?.percentage_marks || NaN,
          remarks: item?.remarks || NA,
          institutionType: "",
          institutionName: item?.institute_name || NA,
        };
      });

  return (
    <div>
      <Grid container justifyContent={"flex-end"} mb={1}>
        <Grid item>
          {!!details.length && (
            <CustomButton
              variant="contained"
              color="primary"
              onClick={handleOpen("", undefined)}
              startIcon={<Add />}
            >
              Add Qualification
            </CustomButton>
          )}
        </Grid>
      </Grid>
      <Box>
        {!details.length ? (
          <Paper
            elevation={0}
            sx={{
              height: "200px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography>No Qualification added</Typography>
          </Paper>
        ) : (
          <>
            {data.map((item, index) => {
              return (
                <Box mb={1} key={item.id}>
                  <Grid container justifyContent={"flex-end"} mb={1}>
                    <EditButton onClick={handleOpen(item.id, index)} />
                  </Grid>
                  <TableWrapper>
                    <TableBodyWrapper>
                      <StyledTableRow>
                        <StyledTableCell>Exam Passed</StyledTableCell>
                        <StyledTableCell>
                          {item.qualificationName}
                        </StyledTableCell>
                      </StyledTableRow>
                      <StyledTableRow>
                        <StyledTableCell>Passing Year</StyledTableCell>
                        <StyledTableCell>{item.passYEARNUMBER}</StyledTableCell>
                      </StyledTableRow>
                      <StyledTableRow>
                        <StyledTableCell>University</StyledTableCell>
                        <StyledTableCell>{item.university}</StyledTableCell>
                      </StyledTableRow>
                      <StyledTableRow>
                        <StyledTableCell>Division</StyledTableCell>
                        <StyledTableCell>{item.division}</StyledTableCell>
                      </StyledTableRow>
                      <StyledTableRow>
                        <StyledTableCell>Marks</StyledTableCell>
                        <StyledTableCell>{item.marksNUMBER}</StyledTableCell>
                      </StyledTableRow>
                    </TableBodyWrapper>
                  </TableWrapper>
                </Box>
              );
            })}
          </>
        )}
      </Box>
      {openModal && (
        <EditEducationDetail
          open={openModal}
          handleClose={handleClose}
          isEditingId={isEditingId}
          allData={data}
        />
      )}
    </div>
  );
};

export default EducationDetail;

const EditEducationDetail = (props: IEditEducationDetail) => {
  const { addQualification, updateQualification } = useUserProfileStore(
    (state: any) => state
  );

  const params = useParams();
  const { handleClose, open, allData, isEditingId } = props;

  const [id, index] = isEditingId.split("-");

  const {
    watch,
    control,
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onBlur",
    defaultValues: {
      editEducationDetail: [defaultValues],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "editEducationDetail",
  });

  // {
  //   "qualification_name": "Bachelor of Science",
  //   "completion_date": "2022-05-30",
  //   "institute_name": "XYZ College",
  //   "board_university": "University of XYZ",
  //   "percentage_marks": 75,
  //   "user_id": 2
  // }

  const handleModalClose = () => {
    handleClose();
    reset();
  };

  const handleSaveQualification = async (data: FormValues) => {
    const {
      division,
      qualificationName,
      marksNUMBER,
      passYEARNUMBER,
      university,
      institutionName,
      institutionType,
      remarks,
    } = data.editEducationDetail[0];
    const reqObj = {
      division,
      qualification_name: qualificationName,
      completion_date: passYEARNUMBER,
      board_university: university,
      institute_name: institutionName,
      institutionType: institutionTypes.find(
        (item) => item.id === +institutionType
      )?.value,
      remarks,
      percentage_marks: +marksNUMBER,
      user_id: Number(params.id) || null,
    };
    if (isEditingId) {
      updateQualification(reqObj, id);
    } else {
      await addQualification(reqObj);
    }
    handleModalClose();
  };

  useEffect(() => {
    if (isEditingId) {
      const d = allData.find((item) => item.id === +id);
      if (d) {
        for (const key in d) {
          setValue(
            // @ts-ignore
            `editEducationDetail.${0}.${key}`,
            d[key] === NA ? "" : d[key]
          );
        }
      }
    }
  }, [isEditingId]);
  return (
    <CustomizedDialog
      open={open}
      handleClose={handleClose}
      maxWidth="lg"
      fullWidth
    >
      <DialogHeader handleClose={handleClose}>
        Educational/Technical Qualification(start from most recent)
      </DialogHeader>
      <form
        onSubmit={handleSubmit((data) => {
          handleSaveQualification(data);
        })}
      >
        <DialogBody>
          {isEditingId ? null : (
            <Grid container justifyContent={"end"} gap={"10px"}>
              <Grid>
                <IconButton
                  color="success"
                  onClick={() => append(defaultValues)}
                >
                  <AddCircleRoundedIcon />
                </IconButton>
              </Grid>
            </Grid>
          )}
          {fields.map((item, index) => {
            return (
              <Box
                position={"relative"}
                key={index}
                mt={isEditingId ? "0rem" : "2rem"}
                p={"1rem"}
              >
                {isEditingId ? null : (
                  <BorderBottom
                    handleClick={() => remove(index)}
                    disabled={fields.length === 1}
                  />
                )}
                <Grid container spacing={2}>
                  <Grid item xs={6} md={3}>
                    <FieldInput
                      type={inputsType.TEXT}
                      fullWidth
                      label="Qualification*"
                      placeholder="Qualification"
                      isError={
                        !!errors?.editEducationDetail?.[index]
                          ?.qualificationName?.message
                      }
                      control={control}
                      register={register}
                      helperText={
                        errors?.editEducationDetail?.[index]?.qualificationName
                          ?.message
                      }
                      registerWith={`editEducationDetail.${index}.qualificationName`}
                      isRequired={true}
                    />
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <FieldInput
                      type={inputsType.TEXT}
                      fullWidth
                      label="Passing Year*"
                      placeholder="Passing Year"
                      isError={
                        !!errors?.editEducationDetail?.[index]?.passYEARNUMBER
                          ?.message
                      }
                      control={control}
                      register={register}
                      helperText={
                        errors?.editEducationDetail?.[index]?.passYEARNUMBER
                          ?.message
                      }
                      registerWith={`editEducationDetail.${index}.passYEARNUMBER`}
                      isRequired={true}
                    />
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <FieldInput
                      type={inputsType.TEXT}
                      fullWidth
                      label="Institution Name"
                      placeholder="Institution Name"
                      isError={
                        !!errors?.editEducationDetail?.[index]?.institutionName
                          ?.message
                      }
                      control={control}
                      register={register}
                      helperText={
                        errors?.editEducationDetail?.[index]?.institutionName
                          ?.message
                      }
                      registerWith={`editEducationDetail.${index}.institutionName`}
                      isRequired={true}
                    />
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <FieldInput
                      type={inputsType.TEXT}
                      fullWidth
                      label="Board/University*"
                      placeholder="Board/University"
                      isError={
                        !!errors?.editEducationDetail?.[index]?.university
                          ?.message
                      }
                      control={control}
                      register={register}
                      helperText={
                        errors?.editEducationDetail?.[index]?.university
                          ?.message
                      }
                      registerWith={`editEducationDetail.${index}.university`}
                      isRequired={true}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={6} md={3}>
                    <FieldInput
                      type={inputsType.TEXT}
                      fullWidth
                      label="Division*"
                      placeholder="Division"
                      isError={
                        !!errors?.editEducationDetail?.[index]?.division
                          ?.message
                      }
                      control={control}
                      register={register}
                      helperText={
                        errors?.editEducationDetail?.[index]?.division?.message
                      }
                      registerWith={`editEducationDetail.${index}.division`}
                      isRequired={true}
                    />
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <FieldInput
                      type={inputsType.TEXT}
                      fullWidth
                      label="%Marks*"
                      placeholder="%Marks"
                      isError={
                        !!errors?.editEducationDetail?.[index]?.marksNUMBER
                          ?.message
                      }
                      control={control}
                      register={register}
                      helperText={
                        errors?.editEducationDetail?.[index]?.marksNUMBER
                          ?.message
                      }
                      registerWith={`editEducationDetail.${index}.marksNUMBER`}
                      isRequired={true}
                    />
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <RHFSelect
                      selectLabel="Institution Type*"
                      placeholder="Institution Type"
                      control={control}
                      registerWith={`editEducationDetail.${index}.institutionType`}
                      options={institutionTypes}
                      error={
                        !!errors?.editEducationDetail?.[index]?.institutionType
                          ?.message
                      }
                      errorMessage={
                        errors?.editEducationDetail?.[index]?.institutionType
                          ?.message
                      }
                      isRequired={false}
                    />
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <FieldInput
                      type={inputsType.TEXT}
                      fullWidth
                      label="Remarks*"
                      placeholder="Remarks"
                      isError={
                        !!errors?.editEducationDetail?.[index]?.remarks?.message
                      }
                      control={control}
                      register={register}
                      helperText={
                        errors?.editEducationDetail?.[index]?.remarks?.message
                      }
                      registerWith={`editEducationDetail.${index}.remarks`}
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

export { EditEducationDetail };
