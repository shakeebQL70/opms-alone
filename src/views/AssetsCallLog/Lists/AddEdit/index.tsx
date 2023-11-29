import React, { useEffect, useMemo } from "react";
import {
  DialogBody,
  DialogFooter,
  DialogHeader,
  CustomizedDialog,
} from "UI/modal";
import { RHFAutoComplete, RHFSelect } from "UI/select";
import { FieldInput } from "UI/input";
import { CustomButton } from "UI/button";
import { Divider, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { inputsType } from "UI/utils";
import {
  useSchoolStore,
  useLabAssetStore,
  useUserStore,
  useAssetCallLogStore,
} from "SUPER/store";
import {
  allHWProblemTypes,
  allItemCategory,
  allPriorities,
  allRequestType,
  allSWProblemTypes,
} from "../../../../utils/data";
import { NA } from "../../../Users/Details";
import { differenceInDays, subDays } from "date-fns";
import { formatDateYYYYMMDD, getWarrantyStatus } from "../../../../utils";

interface ICreateUser {
  handleClose: (...params: any[]) => void;
  open: boolean;
  isEditingId: string;
  details: any;
  page: number;
  rowsPerPage: number;
}

export const defaultAssetComplaintValues = {
  schoolNameCode: null,
  itemCategoryCode: null,
  asset: null,
  schoolName: "",
  principalName: "",
  district: "",
  block: "",
  schoolAddress: "",
  coordinator: "",
  contactNUMBER: "",
  itemCategory: "",
  oemName: "",
  serviceProvider: "",
  modelName: "",
  installationDate: "",
  warrantyEndDate: "",
  warrantyStatus: "",
  requestType: "",
  problemType: "",
  problemDescription: "",
  ticketComplaint: "",
};

const AddEditAssetComplaint = (props: ICreateUser) => {
  const { handleClose, open, details, isEditingId, page, rowsPerPage } = props;
  const { dropdownList: allSchoolsList, getAll: getAllSchools } =
    useSchoolStore((state: any) => state);
  const { assetDetail, assetAllDetail, getAssetById } = useLabAssetStore(
    (state: any) => state
  );
  const { selectedProject } = useUserStore((state: any) => state);
  const { createAssetsCallLog, getServiceDesk, updateAssetsCallLog } =
    useAssetCallLogStore((state: any) => state);

  const { getDetails: getSchoolDetails, details: schoolDetails } =
    useSchoolStore((state: any) => state);

  const {
    watch,
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<typeof defaultAssetComplaintValues>({
    defaultValues: defaultAssetComplaintValues,
    mode: "onBlur",
  });

  const handleCloseModal = () => {
    reset();
    handleClose();
  };

  const selectedItem: any = watch("itemCategoryCode");
  const requestTypeSelected = watch("requestType");
  const selectedSchool: any = watch("schoolNameCode");

  const problemTypes = useMemo(() => {
    const t = allRequestType.find((item) => item.id === requestTypeSelected);
    if (!t) return [];
    if (t.value === "sw") {
      return allSWProblemTypes;
    }
    return allHWProblemTypes;
  }, [requestTypeSelected]);

  useEffect(() => {
    if (selectedItem?.id) {
      getAssetById(selectedItem?.id);
    }
  }, [selectedItem?.id]);

  useEffect(() => {
    if (selectedSchool?.id) {
      getSchoolDetails(selectedSchool?.id);
    }
  }, [selectedSchool?.id]);

  useEffect(() => {
    if (schoolDetails && Object.keys(schoolDetails).length) {
      setValue("schoolName", schoolDetails?.name || NA);
      setValue("principalName", schoolDetails?.principal_name || NA);
      setValue("district", schoolDetails?.district || NA);
      setValue("block", schoolDetails?.block || NA);
      setValue("schoolAddress", schoolDetails?.address || NA);
      setValue("coordinator", schoolDetails?.coordinator || NA);
      setValue("contactNUMBER", schoolDetails?.landline || NaN);
    }
  }, [schoolDetails]);

  useEffect(() => {
    if (assetAllDetail && Object.keys(assetAllDetail).length) {
      setValue("itemCategory", assetAllDetail?.item_category || NA);
      setValue("oemName", assetAllDetail?.oem_name || NA);
      setValue("serviceProvider", assetAllDetail?.item_make || NA);
      setValue("modelName", assetAllDetail?.item_model_name || NA);
      setValue("installationDate", "");
      setValue(
        "warrantyEndDate",
        formatDateYYYYMMDD(assetAllDetail?.warranty_end_date) || NA
      );
      setValue(
        "warrantyStatus",
        getWarrantyStatus(
          assetAllDetail?.warranty_end_date,
          assetAllDetail?.purchase_date
        ) || NaN
      );
    }
  }, [assetAllDetail]);

  useEffect(() => {
    if (isEditingId) {
      const {
        school,
        request_type,
        problem_type,
        problem_description,
        ticket_complaint,
        item_category,
      } = details;
      const sCode = allSchoolsList.find((item: any) => item.id === school.id);
      const iCategory = allItemCategory.find(
        (item) => item.value === item_category
      );
      setValue("schoolNameCode", sCode);
      if (iCategory) {
        // @ts-ignore
        setValue("itemCategoryCode", iCategory);
      }
      setValue("asset", assetDetail.length ? assetDetail[0] : null);
      const rType = allRequestType.find(
        (item) => item.value === request_type
      )?.id;
      const pType = problemTypes.find(
        (item) => item.value === problem_type
      )?.id;
      setValue("requestType", rType ? rType : "");
      setValue("problemType", pType ? pType : "");
      setValue("problemDescription", problem_description || "");
      const tComplaint = allPriorities.find(
        (item) => item.value === ticket_complaint
      )?.id;
      setValue("ticketComplaint", tComplaint || "");
    }
  }, [isEditingId, allSchoolsList, assetAllDetail]);

  const handleSubmitAssetComplaint = async (
    data: typeof defaultAssetComplaintValues
  ) => {
    const {
      asset,
      itemCategoryCode,
      schoolNameCode,
      problemType,
      requestType,
      problemDescription,
      ticketComplaint,
    } = data;

    const reqObj = {
      project_id: selectedProject?.id,
      // @ts-ignore
      school_id: schoolNameCode?.id,
      // @ts-ignore
      asset_id: asset?.id,
      // @ts-ignore
      item_category: itemCategoryCode?.value,
      request_type: allRequestType.find((item) => item.id === requestType)
        ?.value,
      problem_type: problemTypes.find((item) => item.id === problemType)?.value,
      problem_description: problemDescription,
      ticket_complaint: allPriorities.find(
        (item) => item.id === ticketComplaint
      )?.value,
      status: "open",
    };
    try {
      if (isEditingId) {
        await updateAssetsCallLog(reqObj, isEditingId);
      } else {
        await createAssetsCallLog(reqObj);
      }
      await getServiceDesk(rowsPerPage, page);
      handleCloseModal();
    } catch (error) {
      console.log(error);
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
        Add Asset Complaint
      </DialogHeader>
      <form
        onSubmit={handleSubmit((data) => {
          handleSubmitAssetComplaint(data);
        })}
      >
        <DialogBody>
          <Grid container spacing={2}>
            <Grid item xs={6} md={4}>
              <RHFAutoComplete
                selectLabel="Select and Search School Code*"
                placeholder="Select and Search School Code"
                control={control}
                registerWith={"schoolNameCode"}
                options={allSchoolsList}
                error={!!errors.schoolNameCode?.message}
                errorMessage={errors.schoolNameCode?.message}
                isRequired={true}
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <RHFAutoComplete
                selectLabel="Select and Search item category"
                placeholder="Select and Search item category"
                control={control}
                registerWith={"itemCategoryCode"}
                options={allItemCategory}
                error={!!errors.itemCategoryCode?.message}
                errorMessage={errors.itemCategoryCode?.message}
                isRequired={true}
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <RHFAutoComplete
                selectLabel="Select and Search Asset Serial Number*"
                placeholder="Select and Search Asset Serial Number"
                control={control}
                registerWith={"asset"}
                options={assetDetail}
                error={!!errors.asset?.message}
                errorMessage={errors.asset?.message}
                isRequired={true}
              />
            </Grid>
          </Grid>
          <Divider sx={{ my: 1 }} />
          <Grid container spacing={2}>
            <Grid item xs={6} md={3}>
              <FieldInput
                type={inputsType.TEXT}
                fullWidth
                label="School Name"
                placeholder="School Name"
                isError={!!errors.schoolName?.message}
                control={control}
                register={register}
                helperText={errors?.schoolName?.message}
                registerWith={"schoolName"}
                isRequired={false}
                readOnly={true}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <FieldInput
                type={inputsType.TEXT}
                fullWidth
                label="Principal Name"
                placeholder="Principal Name"
                isError={!!errors.principalName?.message}
                control={control}
                register={register}
                helperText={errors?.principalName?.message}
                registerWith={"principalName"}
                isRequired={false}
                readOnly={true}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <FieldInput
                type={inputsType.TEXT}
                fullWidth
                label="District"
                placeholder="District"
                isError={!!errors.district?.message}
                control={control}
                register={register}
                helperText={errors?.district?.message}
                registerWith={"district"}
                isRequired={false}
                readOnly={true}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <FieldInput
                type={inputsType.TEXT}
                fullWidth
                label="Block"
                placeholder="Block"
                isError={!!errors.block?.message}
                control={control}
                register={register}
                helperText={errors?.block?.message}
                registerWith={"block"}
                isRequired={false}
                readOnly={true}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6} md={6}>
              <FieldInput
                type={inputsType.TEXT}
                fullWidth
                label="School Address"
                placeholder="School Address"
                isError={!!errors.schoolAddress?.message}
                control={control}
                register={register}
                helperText={errors?.schoolAddress?.message}
                registerWith={"schoolAddress"}
                isRequired={false}
                readOnly={true}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <FieldInput
                type={inputsType.TEXT}
                fullWidth
                label="Co-ordinator"
                placeholder="Co-ordinator"
                isError={!!errors.coordinator?.message}
                control={control}
                register={register}
                helperText={errors?.coordinator?.message}
                registerWith={"coordinator"}
                isRequired={false}
                readOnly={true}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <FieldInput
                type={inputsType.TEXT}
                fullWidth
                label="Contact Number"
                placeholder="Contact Number"
                isError={!!errors.contactNUMBER?.message}
                control={control}
                register={register}
                helperText={errors?.contactNUMBER?.message}
                registerWith={"contactNUMBER"}
                isRequired={false}
                readOnly={true}
              />
            </Grid>
          </Grid>
          <Divider sx={{ my: 1 }} />
          <Grid container spacing={2}>
            <Grid item xs={6} md={4}>
              <FieldInput
                type={inputsType.TEXT}
                fullWidth
                label="Item Category"
                placeholder="Item Category"
                isError={!!errors.itemCategory?.message}
                control={control}
                register={register}
                helperText={errors?.itemCategory?.message}
                registerWith={"itemCategory"}
                isRequired={false}
                readOnly={true}
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <FieldInput
                type={inputsType.TEXT}
                fullWidth
                label="OEM Name"
                placeholder="OEM Name"
                isError={!!errors.oemName?.message}
                control={control}
                register={register}
                helperText={errors?.oemName?.message}
                registerWith={"oemName"}
                isRequired={false}
                readOnly={true}
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <FieldInput
                type={inputsType.TEXT}
                fullWidth
                label="Service Provider"
                placeholder="Service Provider"
                isError={!!errors.serviceProvider?.message}
                control={control}
                register={register}
                helperText={errors?.serviceProvider?.message}
                registerWith={"serviceProvider"}
                isRequired={false}
                readOnly={true}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6} md={3}>
              <FieldInput
                type={inputsType.TEXT}
                fullWidth
                label="Model Name"
                placeholder="Model Name"
                isError={!!errors.modelName?.message}
                control={control}
                register={register}
                helperText={errors?.modelName?.message}
                registerWith={"modelName"}
                isRequired={false}
                readOnly={true}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <FieldInput
                type={inputsType.DATE}
                fullWidth
                label="Installation Date"
                placeholder="Installation Date"
                isError={!!errors.installationDate?.message}
                control={control}
                register={register}
                helperText={errors?.installationDate?.message}
                registerWith={"installationDate"}
                isRequired={false}
                readOnly={true}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <FieldInput
                type={inputsType.DATE}
                fullWidth
                label="Warranty End Date"
                placeholder="Warranty End Date"
                isError={!!errors.warrantyEndDate?.message}
                control={control}
                register={register}
                helperText={errors?.warrantyEndDate?.message}
                registerWith={"warrantyEndDate"}
                isRequired={false}
                readOnly={true}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <FieldInput
                type={inputsType.TEXT}
                fullWidth
                label="Warranty Status"
                placeholder="Warranty Status"
                isError={!!errors.warrantyStatus?.message}
                control={control}
                register={register}
                helperText={errors?.warrantyStatus?.message}
                registerWith={"warrantyStatus"}
                isRequired={false}
                readOnly={true}
              />
            </Grid>
          </Grid>
          <Divider sx={{ my: 1 }} />
          <Grid container spacing={2}>
            <Grid item xs={6} md={3}>
              <RHFSelect
                selectLabel="Request Type"
                placeholder="Request Type"
                control={control}
                registerWith={"requestType"}
                register={register}
                options={allRequestType}
                error={!!errors.requestType?.message}
                errorMessage={errors?.requestType?.message}
                isRequired={true}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <RHFSelect
                selectLabel="Problem Type"
                placeholder="Problem Type"
                control={control}
                registerWith={"problemType"}
                register={register}
                options={problemTypes}
                isRequired={true}
                error={!!errors.problemType?.message}
                errorMessage={errors?.problemType?.message}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <FieldInput
                type={inputsType.TEXTAREA}
                fullWidth
                label="Problem Description"
                placeholder="Problem Description"
                control={control}
                register={register}
                isError={!!errors.problemDescription?.message}
                helperText={errors?.problemDescription?.message}
                registerWith={"problemDescription"}
                isRequired={true}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <RHFSelect
                selectLabel="Ticket Complaint*"
                placeholder="Ticket Complaint"
                control={control}
                registerWith={`ticketComplaint`}
                options={allPriorities}
                isRequired={true}
                register={register}
                error={!!errors.ticketComplaint?.message}
                errorMessage={errors?.ticketComplaint?.message}
              />
            </Grid>
          </Grid>
          <Divider sx={{ my: 1 }} />
        </DialogBody>
        <DialogFooter>
          <div className="flex gap-4 justify-end">
            <CustomButton variant="contained" type="submit" color="primary">
              Add Complaint
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

export default AddEditAssetComplaint;
