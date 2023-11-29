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
import { inputsType, acceptedImages } from "UI/utils";
import { selectedFile } from "../../../types";
import { FileUploadButton } from "UI/dragndrop";
import { ListImagePreview } from "UI/previewImg";
import { formatDateAndTime, formatDateYYYYMMDD } from "../../../utils";
import { useLabUsageStore, useSchoolStore } from "SUPER/store";

import {
  allCategory,
  allClasses,
  allSections,
  allSubject,
  allTeachers,
  noOfNode,
  schoolCodes,
} from "../../../utils/data";

interface ICreateUser {
  handleClose: (...params: any[]) => void;
  open: boolean;
  isEditingId: string;
  details: typeof defaultTheoryValues;
  page: number;
  rowsPerPage: number;
}

export const defaultTheoryValues = {
  schoolCode: null,
  classDate: "",
  startTime: "",
  endTime: "",
  category: "",
  selectedClass: null,
  section: "",
  totalStudent: 0,
  noOfStudentAttended: 0,
  reasonForExtraStudent: "",
  subject: "",
  noOfNodeUsed: "1",
  teacherName: null,
  topicCovered: "",
  feedbackOfClass: "",
  imageLink: "",
};

const AddEditLabUsage = (props: ICreateUser) => {
  const { handleClose, open, isEditingId, details, page, rowsPerPage } = props;
  const labUsageStore = useLabUsageStore((state: any) => state);
  const { dropdownList: allSchoolsList, getAll: getAllSchools } =
    useSchoolStore((state: any) => state);
  const { createLabUsage, updateLabUsage, getLabUsageList } = labUsageStore;

  const [selectedFile, setSelectedFile] = useState<selectedFile>();

  const {
    watch,
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<typeof defaultTheoryValues>({
    defaultValues: defaultTheoryValues,
    mode: "onBlur",
  });

  const handleCloseModal = () => {
    reset();
    handleClose();
  };

  const handleCreateContentFeedback = async (
    data: typeof defaultTheoryValues
  ) => {
    const {
      schoolCode,
      classDate,
      startTime,
      endTime,
      category,
      totalStudent,
      selectedClass,
      feedbackOfClass,
      imageLink,
      noOfNodeUsed,
      noOfStudentAttended,
      reasonForExtraStudent,
      section,
      subject,
      teacherName,
      topicCovered,
    } = data;

    const reqObj = {
      school_id: (schoolCode as any)?.id,
      class_date: formatDateYYYYMMDD(classDate),
      start_time: formatDateAndTime(classDate, startTime),
      end_time: formatDateAndTime(classDate, endTime),
      category: allCategory.find((item) => item.id === +category)?.value,
      class: (selectedClass as any)?.value,
      total_students: totalStudent,
      section: allSections.find((item) => item.id === +section)?.value,
      student_count_attend: +noOfStudentAttended,
      reason_for_extra_student: reasonForExtraStudent,
      node_count_used: noOfNodeUsed,
      teacher_id: (teacherName as any)?.id,
      topic_work_details: topicCovered,
      class_feedback: feedbackOfClass,
      image_url: imageLink,
      subject: allSubject.find((item) => item.id === +subject)?.value,
      status: "active",
    };

    try {
      if (isEditingId) {
        await updateLabUsage(reqObj, isEditingId);
      } else {
        await createLabUsage(reqObj);
      }
      await getLabUsageList(rowsPerPage, page + 1);
      handleClose();
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    if (isEditingId) {
      for (const key in details) {
        if (["startTime", "endTime"].includes(key)) {
          const updatedValue = details[key as keyof typeof defaultTheoryValues]
            ?.toString()
            .split(" ")[0];
          if (updatedValue) {
            setValue(key as keyof typeof defaultTheoryValues, updatedValue);
          }
        }
        if (key === "schoolCode") {
          const s = allSchoolsList.find(
            (item: any) =>
              item.id ===
              (details[key as keyof typeof defaultTheoryValues] as any)?.id
          );
          setValue(key as keyof typeof defaultTheoryValues, s || null);
        } else {
          setValue(
            key as keyof typeof defaultTheoryValues,
            details[key as keyof typeof defaultTheoryValues]
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
          </Grid>
          <Grid container spacing={2}>
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
              <RHFAutoComplete
                selectLabel="Class"
                placeholder="Class"
                control={control}
                registerWith={"selectedClass"}
                options={allClasses}
                error={!!errors.selectedClass?.message}
                errorMessage={errors.selectedClass?.message}
                isRequired={true}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <FieldInput
                type={inputsType.TEXT}
                fullWidth
                label="Total Students"
                placeholder="Total Students"
                isError={!!errors.totalStudent?.message}
                control={control}
                register={register}
                helperText={errors?.totalStudent?.message}
                registerWith={"totalStudents"}
                isRequired={false}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <RHFSelect
                selectLabel="Section*"
                placeholder="Section"
                control={control}
                registerWith={"section"}
                options={allSections}
                error={!!errors.section?.message}
                errorMessage={errors.section?.message}
                isRequired={true}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6} md={3}>
              <FieldInput
                type={inputsType.TEXT}
                fullWidth
                label="No of Students Attend*"
                placeholder="No of Students Attend"
                isError={!!errors.noOfStudentAttended?.message}
                control={control}
                register={register}
                helperText={errors?.noOfStudentAttended?.message}
                registerWith={"noOfStudentAttended"}
                isRequired={true}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <FieldInput
                type={inputsType.TEXT}
                fullWidth
                label="Reason for extra Student*"
                placeholder="Reason for extra Student"
                isError={!!errors.reasonForExtraStudent?.message}
                control={control}
                register={register}
                helperText={errors?.reasonForExtraStudent?.message}
                registerWith={"reasonForExtraStudent"}
                isRequired={false}
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
              <RHFSelect
                selectLabel="Subject*"
                placeholder="Subject"
                control={control}
                registerWith={"subject"}
                options={allSubject}
                error={!!errors.subject?.message}
                errorMessage={errors.subject?.message}
                isRequired={true}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <FieldInput
                type={inputsType.TEXT}
                fullWidth
                label="Topic Covered/ Work Details*"
                placeholder="Topic Covered/ Work Details"
                isError={!!errors.topicCovered?.message}
                control={control}
                register={register}
                helperText={errors?.topicCovered?.message}
                registerWith={"topicCovered"}
                isRequired={true}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <FieldInput
                type={inputsType.TEXT}
                fullWidth
                label="Feedback Of Class*"
                placeholder="Feedback Of Class"
                isError={!!errors.feedbackOfClass?.message}
                control={control}
                register={register}
                helperText={errors?.feedbackOfClass?.message}
                registerWith={"feedbackOfClass"}
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

export default AddEditLabUsage;
