import React, { useEffect, useState } from "react";
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
import { useLabUsageStore, useSchoolStore } from "SUPER/store";
import { selectedFile } from "../../../types";
import {
  getAutocompleteFilterData,
  formatDateYYYYMMDD,
  formatDateAndTime,
} from "../../../utils";
import {
  allCategory,
  allTeachers,
  instructorEngagedArr,
  noOfNode,
  schoolCodes,
} from "../../../utils/data";

interface ICreateUser {
  handleClose: (...params: any[]) => void;
  open: boolean;
  isEditingId: string;
  details: typeof defaultMISOfficeValues | undefined;
  page: number;
  rowsPerPage: number;
}

export const defaultMISOfficeValues = {
  schoolCode: null,
  classDate: "",
  category: "",
  startTime: "",
  endTime: "",
  noOfNodeUsed: "1",
  instructorEngaged: "",
  teacherName: null,
  remarks: "",
  imageLink: "",
};

const AddEditLabUsageMIS = (props: ICreateUser) => {
  const { handleClose, open, isEditingId, details, rowsPerPage, page } = props;
  const { dropdownList: allSchoolsList, getAll: getAllSchools } =
    useSchoolStore((state: any) => state);
  const labUsageStore = useLabUsageStore((state: any) => state);
  const { createLabUsage, updateLabUsage, getLabUsageList } = labUsageStore;

  const [selectedFile, setSelectedFile] = useState<selectedFile>();

  const {
    watch,
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<typeof defaultMISOfficeValues>({
    defaultValues: defaultMISOfficeValues,
    mode: "onBlur",
  });

  const handleCloseModal = () => {
    reset();
    handleClose();
  };

  const handleCreateContentFeedback = async (
    data: typeof defaultMISOfficeValues
  ) => {
    const {
      category,
      classDate,
      endTime,
      imageLink,
      instructorEngaged,
      noOfNodeUsed,
      remarks,
      schoolCode,
      startTime,
      teacherName,
    } = data;

    const reqObj = {
      school_id: (schoolCode as any)?.id,
      class_date: formatDateYYYYMMDD(classDate),
      category: allCategory.find((item) => item.id === +category)?.value,
      start_time: formatDateAndTime(classDate, startTime),
      end_time: formatDateAndTime(classDate, endTime),
      node_count_used: noOfNodeUsed,
      is_instructor_engaged: instructorEngagedArr.find(
        (item) => item.id === +instructorEngaged
      )?.value,
      teacher_id: (teacherName as any)?.id,
      remarks,
      imageLink,
      status: "active",
    };
    try {
      if (isEditingId) {
        await updateLabUsage(reqObj, isEditingId);
      } else {
        await createLabUsage(reqObj);
      }
      await getLabUsageList(rowsPerPage, page + 1);

      handleCloseModal();
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    if (isEditingId) {
      // for (const key in details) {
      //   setValue(
      //     key as keyof typeof defaultMISOfficeValues,
      //     details[key as keyof typeof defaultMISOfficeValues]
      //   );
      // }
      for (const key in details) {
        if (["startTime", "endTime"].includes(key)) {
          const updatedValue = details[
            key as keyof typeof defaultMISOfficeValues
          ]
            ?.toString()
            .split(" ")[0];
          if (updatedValue) {
            setValue(key as keyof typeof defaultMISOfficeValues, updatedValue);
          }
        }
        if (key === "schoolCode") {
          const s = allSchoolsList.find(
            (item: any) =>
              item.id ===
              (details[key as keyof typeof defaultMISOfficeValues] as any)?.id
          );
          setValue(key as keyof typeof defaultMISOfficeValues, s || null);
        } else {
          setValue(
            key as keyof typeof defaultMISOfficeValues,
            details[key as keyof typeof defaultMISOfficeValues]
          );
        }
      }
    }
  }, [isEditingId]);


  return (
    <CustomizedDialog
      open={open}
      handleClose={handleCloseModal}
      maxWidth="lg"
      fullWidth
    >
      <DialogHeader handleClose={handleCloseModal}>Add Lab Usage</DialogHeader>
      <form
        onSubmit={handleSubmit((data) => {
          handleCreateContentFeedback(data);
        })}
      >
        <DialogBody>
          <Grid container spacing={2}>
            <Grid item xs={6} md={3}>
              <RHFAutoComplete
                selectLabel="School (BCCL Code*)"
                placeholder="School (BCCL Code*)"
                control={control}
                registerWith={"schoolCode"}
                options={allSchoolsList}
                error={!!errors.schoolCode?.message}
                errorMessage={errors.schoolCode?.message}
                isRequired={true}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <FieldInput
                type={inputsType.DATE}
                fullWidth
                label="Class Date*"
                placeholder="Class Date"
                isError={!!errors.classDate?.message}
                control={control}
                register={register}
                helperText={errors?.classDate?.message}
                registerWith={"classDate"}
                isRequired={true}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <RHFSelect
                selectLabel="Category"
                placeholder="Category"
                control={control}
                registerWith={"category"}
                options={allCategory}
                error={!!errors.category?.message}
                errorMessage={errors.category?.message}
                isRequired={true}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <FieldInput
                type={inputsType.TIME}
                fullWidth
                label="Start Time*"
                placeholder="Start Time"
                isError={!!errors.startTime?.message}
                control={control}
                register={register}
                helperText={errors?.startTime?.message}
                registerWith={"startTime"}
                isRequired={true}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6} md={3}>
              <FieldInput
                type={inputsType.TIME}
                fullWidth
                label="End Time*"
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
              <RHFSelect
                selectLabel="No of node used*"
                placeholder="No of node used"
                control={control}
                registerWith={"noOfNodeUsed"}
                options={noOfNode}
                error={!!errors.noOfNodeUsed?.message}
                errorMessage={errors.noOfNodeUsed?.message}
                isRequired={true}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <RHFSelect
                selectLabel="Instructor Engaged*"
                placeholder="Instructor Engaged"
                control={control}
                registerWith={"instructorEngaged"}
                options={instructorEngagedArr}
                error={!!errors.instructorEngaged?.message}
                errorMessage={errors.instructorEngaged?.message}
                isRequired={true}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <RHFAutoComplete
                selectLabel="Teacher Name"
                placeholder="Teacher Name"
                control={control}
                registerWith={"teacherName"}
                options={allTeachers}
                error={!!errors.teacherName?.message}
                errorMessage={errors.teacherName?.message}
                isRequired={true}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6} md={3}>
              <FieldInput
                type={inputsType.TEXTAREA}
                fullWidth
                label="Remarks*"
                placeholder="Remarks"
                isError={!!errors.remarks?.message}
                control={control}
                register={register}
                helperText={errors?.remarks?.message}
                registerWith={"remarks"}
                isRequired={true}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              {!selectedFile?.file?.name ? (
                <FileUploadButton
                  label="Image Link"
                  acceptedFilesExt={acceptedImages}
                  setFile={setSelectedFile}
                  sx={{ width: "100%" }}
                />
              ) : (
                <ListImagePreview
                  fileName={selectedFile.file.name}
                  handleRemoveFile={() =>
                    setSelectedFile({ file: null, msg: "" })
                  }
                  msg={selectedFile.msg}
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

export default AddEditLabUsageMIS;
