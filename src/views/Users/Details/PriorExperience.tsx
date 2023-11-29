import React, { useEffect } from "react";
import {
  Grid,
  IconButton,
  InputLabel,
  Box,
  Paper,
  Typography,
} from "@mui/material";
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
import { formatDateYYYYMMDD } from "../../../utils";
import { useParams } from "react-router-dom";
import { useUserProfileStore } from "SUPER/store";
import { NA } from ".";
import { Add } from "UI/icons";

const defaultValues = {
  orgName: "",
  employmentFrom: "",
  employmentTo: "",
  postHeld: "",
  experienceNUMBER: NaN,
  areaOfExperience: "",
  remarks: "",
};
export type FormValues = {
  editPriorExp: {
    orgName: string;
    employmentFrom: string;
    employmentTo: string;
    postHeld: string;
    experienceNUMBER: number;
    areaOfExperience: string;
    remarks: string;
  }[];
};

const data = [
  { title: "Organization Name", value: "Not Available" },
  { title: "Employment from ", value: "Not Available" },
  { title: "Employment to", value: "Not Available" },
  { title: "Post Held", value: "Not Available" },
  { title: "Experience", value: "Not Available" },
  { title: "Area of Experience", value: "Not Available" },
  { title: "Remarks", value: "Not Available" },
];

interface IPriorExperience {
  handleClose: (...params: any[]) => void;
  open: boolean;
  allData: any[];
  isEditingId: string;
}
const PriorExperience = ({ details }: { details: any[] }) => {
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

  const data = !details?.length
    ? []
    : details.map((item) => {
        return {
          id: item.id,
          orgName: item?.organisation_name || NA,
          employmentFrom: formatDateYYYYMMDD(item?.employment_from) || NA,
          employmentTo: formatDateYYYYMMDD(item?.employment_to) || NA,
          postHeld: NA,
          experienceNUMBER: item?.experience_months || 0,
          areaOfExperience: item?.area_of_experience || NA,
          remarks: item?.remarks || NA,
        };
      });

  console.log({ details });

  return (
    <div>
      <Grid container justifyContent={"flex-end"} mb={5}>
        <Grid item>
          {!!details.length && (
            <CustomButton
              variant="contained"
              color="primary"
              onClick={handleOpen("", undefined)}
              startIcon={<Add />}
            >
              Add Experience
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
            <Typography>No Experience added</Typography>
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
                        <StyledTableCell>Organization Name</StyledTableCell>
                        <StyledTableCell>{item.orgName}</StyledTableCell>
                      </StyledTableRow>
                      <StyledTableRow>
                        <StyledTableCell>Employment from</StyledTableCell>
                        <StyledTableCell>{item.employmentFrom}</StyledTableCell>
                      </StyledTableRow>
                      <StyledTableRow>
                        <StyledTableCell>Employment to</StyledTableCell>
                        <StyledTableCell>{item.employmentTo}</StyledTableCell>
                      </StyledTableRow>
                      <StyledTableRow>
                        <StyledTableCell>Post Held</StyledTableCell>
                        <StyledTableCell>{item.postHeld}</StyledTableCell>
                      </StyledTableRow>
                      <StyledTableRow>
                        <StyledTableCell>Experience</StyledTableCell>
                        <StyledTableCell>{item.experienceNUMBER}</StyledTableCell>
                      </StyledTableRow>
                      <StyledTableRow>
                        <StyledTableCell>Area of Experience</StyledTableCell>
                        <StyledTableCell>
                          {item.areaOfExperience}
                        </StyledTableCell>
                      </StyledTableRow>
                      <StyledTableRow>
                        <StyledTableCell>Remarks</StyledTableCell>
                        <StyledTableCell>{item.remarks}</StyledTableCell>
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
        <EditPriorExperience
          open={openModal}
          handleClose={handleClose}
          allData={data}
          isEditingId={isEditingId}
        />
      )}
    </div>
  );
};

export default PriorExperience;

const EditPriorExperience = (props: IPriorExperience) => {
  const params = useParams();
  const { addExperience, updateExperience } = useUserProfileStore(
    (state: any) => state
  );

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
      editPriorExp: [defaultValues],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "editPriorExp",
  });

  const handleSubmitExperience = async (data: FormValues) => {
    const {
      areaOfExperience,
      employmentFrom,
      employmentTo,
      experienceNUMBER,
      orgName,
      postHeld,
      remarks,
    } = data.editPriorExp[0];

    const reqObj = {
      organisation_name: orgName,
      employment_from: formatDateYYYYMMDD(employmentFrom),
      employment_to: formatDateYYYYMMDD(employmentTo),
      experience_months: experienceNUMBER,
      area_of_experience: areaOfExperience,
      remarks,
      post_held: postHeld,
      user_id: Number(params?.id) || null,
    };
    if (isEditingId) {
      updateExperience(reqObj, id);
    } else {
      await addExperience(reqObj);
    }
    handleModalClose();
  };

  const handleModalClose = () => {
    handleClose();
    reset();
  };

  useEffect(() => {
    if (isEditingId) {
      const d = allData.find((item) => item.id === +id);
      console.log({ d });
      if (d) {
        for (const key in d) {
          setValue(
            // @ts-ignore
            `editPriorExp.${0}.${key}`,
            d[key] === NA ? "" : d[key]
          );
        }
      }
    }
  }, [isEditingId]);

  return (
    <CustomizedDialog
      open={open}
      handleClose={handleModalClose}
      maxWidth="lg"
      fullWidth
    >
      <DialogHeader handleClose={handleModalClose}>
        {isEditingId
          ? "Edit Experience"
          : "Prior Experience (Start from most recent)"}
      </DialogHeader>
      <form
        onSubmit={handleSubmit((data) => {
          handleSubmitExperience(data);
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
                      label="Organization Name*"
                      placeholder="Organization Name"
                      isError={
                        !!errors?.editPriorExp?.[index]?.orgName?.message
                      }
                      control={control}
                      register={register}
                      helperText={
                        errors?.editPriorExp?.[index]?.orgName?.message
                      }
                      registerWith={`editPriorExp.${index}.orgName`}
                      isRequired={true}
                    />
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <FieldInput
                      type={inputsType.DATE}
                      fullWidth
                      label="Employment From*"
                      placeholder="Employment From"
                      isError={
                        !!errors?.editPriorExp?.[index]?.employmentFrom?.message
                      }
                      control={control}
                      register={register}
                      helperText={
                        errors?.editPriorExp?.[index]?.employmentFrom?.message
                      }
                      registerWith={`editPriorExp.${index}.employmentFrom`}
                      isRequired={true}
                    />
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <FieldInput
                      type={inputsType.DATE}
                      fullWidth
                      label="Employment To*"
                      placeholder="Employment To"
                      isError={
                        !!errors?.editPriorExp?.[index]?.employmentTo?.message
                      }
                      control={control}
                      register={register}
                      helperText={
                        errors?.editPriorExp?.[index]?.employmentTo?.message
                      }
                      registerWith={`editPriorExp.${index}.employmentTo`}
                      isRequired={true}
                    />
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <FieldInput
                      type={inputsType.TEXT}
                      fullWidth
                      label="Post Held*"
                      placeholder="Post Held"
                      isError={
                        !!errors?.editPriorExp?.[index]?.postHeld?.message
                      }
                      control={control}
                      register={register}
                      helperText={
                        errors?.editPriorExp?.[index]?.postHeld?.message
                      }
                      registerWith={`editPriorExp.${index}.postHeld`}
                      isRequired={true}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={6} md={3}>
                    <FieldInput
                      type={inputsType.TEXT}
                      fullWidth
                      label="Experience (in Months)*"
                      placeholder="Experience "
                      isError={
                        !!errors?.editPriorExp?.[index]?.experienceNUMBER
                          ?.message
                      }
                      control={control}
                      register={register}
                      helperText={
                        errors?.editPriorExp?.[index]?.experienceNUMBER?.message
                      }
                      registerWith={`editPriorExp.${index}.experienceNUMBER`}
                      isRequired={true}
                    />
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <RHFSelect
                      selectLabel="Area of Experience*"
                      placeholder="Area of Experience"
                      control={control}
                      registerWith={`editPriorExp.${index}.areaOfExperience`}
                      options={[
                        { label: "Teaching/Software Development", id: "1" },
                        { label: "Technical Consultancy", id: "2" },
                      ]}
                      error={
                        !!errors?.editPriorExp?.[index]?.areaOfExperience
                          ?.message
                      }
                      errorMessage={
                        errors?.editPriorExp?.[index]?.areaOfExperience?.message
                      }
                      isRequired={true}
                    />
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <FieldInput
                      type={inputsType.TEXT}
                      fullWidth
                      label="Remarks*"
                      placeholder="Remarks"
                      isError={
                        !!errors?.editPriorExp?.[index]?.remarks?.message
                      }
                      control={control}
                      register={register}
                      helperText={
                        errors?.editPriorExp?.[index]?.remarks?.message
                      }
                      registerWith={`editPriorExp.${index}.remarks`}
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

export { EditPriorExperience };
