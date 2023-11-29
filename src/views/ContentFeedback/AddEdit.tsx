import React, { useEffect } from "react";
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
import { inputsType } from "UI/utils";
import { useContentFeedbackStore, useSchoolStore } from "SUPER/store";
import {
  allClasses,
  allSections,
  allSubject,
  allTeachers,
} from "../../utils/data";

interface ICreateUser {
  handleClose: (...params: any[]) => void;
  open: boolean;
  isEditingId: string;
  details: typeof defaultContentFeedbackValues;
  page: number;
  rowsPerPage: number;
}

export const defaultContentFeedbackValues = {
  schoolName: null,
  date: "",
  selectedClass: "",
  section: "",
  subject: "",
  chapterTopic: "1",
  issueDetail: "",
  subjectTeacher: null,
};

const AddEditContentFeedback = (props: ICreateUser) => {
  const { handleClose, open, isEditingId, details, page, rowsPerPage } = props;
  const contentFeedback = useContentFeedbackStore((state: any) => state);
  const { dropdownList: allSchoolsList, getAll: getAllSchools } =
    useSchoolStore((state: any) => state);
  const {
    isSubmitting,
    createData,
    updateData,
    getData: getContentFeedback,
  } = contentFeedback;

  const {
    watch,
    control,
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<typeof defaultContentFeedbackValues>({
    defaultValues: defaultContentFeedbackValues,
    mode: "onBlur",
  });

  const handleCloseModal = () => {
    reset();
    handleClose();
  };

  useEffect(() => {
    if (isEditingId) {
      for (const key in details) {
        if (key === "schoolName") {
          const s = allSchoolsList.find(
            (item: any) =>
              item.id ===
              (details[key as keyof typeof defaultContentFeedbackValues] as any)
                ?.id
          );
          setValue(key as keyof typeof defaultContentFeedbackValues, s || null);
        } else {
          setValue(
            key as keyof typeof defaultContentFeedbackValues,
            details[key as keyof typeof defaultContentFeedbackValues]
          );
        }
      }
    }
  }, [isEditingId]);
  console.log(watch("schoolName"));

  const handleCreateContentFeedback = async (
    data: typeof defaultContentFeedbackValues
  ) => {
    const {
      selectedClass,
      section,
      date,
      chapterTopic,
      issueDetail,
      subjectTeacher,
      subject,
      schoolName,
    } = data;

    const reqObj = {
      class: selectedClass,
      section,
      date,
      chapter_topic: chapterTopic,
      issue_details: issueDetail,
      subject_teacher: (subjectTeacher as any)?.id,
      status: "active",
      school_id: (schoolName as any)?.id,
      subject,
    };

    try {
      if (isEditingId) {
        await updateData(reqObj, isEditingId);
      } else {
        await createData(reqObj);
      }
      await getContentFeedback(rowsPerPage, page + 1);
      handleClose();
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <CustomizedDialog
      open={open}
      handleClose={handleCloseModal}
      maxWidth="lg"
      fullWidth
    >
      <DialogHeader handleClose={handleCloseModal}>
        {`${isEditingId ? "Edit " : "Add"} Content Feedback`}
      </DialogHeader>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
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
                registerWith={"schoolName"}
                options={allSchoolsList}
                error={!!errors.schoolName?.message}
                errorMessage={errors.schoolName?.message}
                isRequired={true}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <FieldInput
                type={inputsType.DATE}
                fullWidth
                label="Date*"
                placeholder="Date"
                isError={!!errors.date?.message}
                control={control}
                register={register}
                helperText={errors?.date?.message}
                registerWith={"date"}
                isRequired={true}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <RHFSelect
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
              <RHFSelect
                selectLabel="Select Section"
                placeholder="Select Section"
                control={control}
                registerWith={`section`}
                options={allSections}
                error={!!errors.section?.message}
                errorMessage={errors.section?.message}
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
                type={inputsType.TEXTAREA}
                fullWidth
                label="Chapter/ Topic*"
                placeholder="Chapter/ Topic"
                isError={!!errors.chapterTopic?.message}
                control={control}
                register={register}
                helperText={errors?.chapterTopic?.message}
                registerWith={"chapterTopic"}
                isRequired={true}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <FieldInput
                type={inputsType.TEXTAREA}
                fullWidth
                label="Issue in Details and Suggestion*"
                placeholder="Issue in Details and Suggestion"
                isError={!!errors.issueDetail?.message}
                control={control}
                register={register}
                helperText={errors?.issueDetail?.message}
                registerWith={"issueDetail"}
                isRequired={true}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <RHFAutoComplete
                selectLabel="Subject Teacher"
                placeholder="Subject Teacher"
                control={control}
                registerWith={"subjectTeacher"}
                options={allTeachers}
                error={!!errors.subjectTeacher?.message}
                errorMessage={errors.subjectTeacher?.message}
                isRequired={true}
              />
            </Grid>
          </Grid>
        </DialogBody>
        <DialogFooter>
          <div className="flex gap-4 justify-end">
            <CustomButton
              variant="contained"
              type="submit"
              color="primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save"}
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

export default AddEditContentFeedback;
