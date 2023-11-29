import React, { useEffect } from "react";
import {
  DialogBody,
  DialogFooter,
  DialogHeader,
  CustomizedDialog,
} from "UI/modal";
import { FieldInput } from "UI/input";
import { CustomButton } from "UI/button";
import { Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { inputsType } from "UI/utils";
import { useAssetCallLogStore } from "SUPER/store";

interface ICreateUser {
  handleClose: (...params: any[]) => void;
  open: boolean;
  details: any;
  isEditingId: string;
  page: number;
  rowsPerPage: number;
}

const defaultValues = {
  question: "",
  answer: "",
};

const AddEditFAQ = (props: ICreateUser) => {
  const { createFAQ, updateFAQ, getAllFAQ } = useAssetCallLogStore(
    (state: any) => state
  );
  const { handleClose, open, details, isEditingId, page, rowsPerPage } = props;

  const {
    watch,
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<typeof defaultValues>({ defaultValues, mode: "onBlur" });

  const handleCloseModal = () => {
    reset();
    handleClose();
  };

  const handleSubmitFAQ = async (data: typeof defaultValues) => {
    const { answer, question } = data;
    const reqObj = {
      question,
      answer,
    };
    if (isEditingId) {
      await updateFAQ(reqObj, isEditingId);
    } else {
      await createFAQ(reqObj);
    }
    await getAllFAQ(rowsPerPage, page);
    handleCloseModal();
  };

  useEffect(() => {
    if (isEditingId) {
      for (const key in details) {
        setValue(
          key as keyof typeof defaultValues,
          details[key as keyof typeof defaultValues]
        );
      }
    }
  }, [isEditingId]);

  return (
    <CustomizedDialog open={open} handleClose={handleCloseModal}>
      <DialogHeader handleClose={handleCloseModal}>Add FAQ</DialogHeader>
      <form
        onSubmit={handleSubmit((data) => {
          handleSubmitFAQ(data);
        })}
      >
        <DialogBody>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <FieldInput
                type={inputsType.TEXTAREA}
                fullWidth
                label="Question"
                placeholder="Question"
                isError={!!errors.question?.message}
                control={control}
                register={register}
                helperText={errors?.question?.message}
                registerWith={"question"}
                isRequired={true}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <FieldInput
                type={inputsType.TEXTAREA}
                fullWidth
                label="Answer"
                placeholder="Answer"
                isError={!!errors.answer?.message}
                control={control}
                register={register}
                helperText={errors?.answer?.message}
                registerWith={"answer"}
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

export default AddEditFAQ;
