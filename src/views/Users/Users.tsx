import React, { useEffect, useState } from "react";
import { CustomButton } from "UI/button";
import CreateUser, { defaultUserProfileValues } from "./CreateUser";
import { Grid, Paper, Typography } from "@mui/material";
import { Add } from "UI/icons";
import { useForm } from "react-hook-form";
import { FieldInput } from "UI/input";
import { RHFAutoComplete, RHFSelect } from "UI/select";
import { useUserProfileStore, useProjectStore } from "SUPER/store";
import { getAllStates, getDistrictFromState } from "UI/indianStateAndDistrict";

import { inputsType, RegisterOption } from "UI/utils";
import List from "./List";
import { useNavigate } from "react-router-dom";
import { statuses } from "../../utils/data";
import { paths } from "../../utils/paths";

const defaultValues = {
  searchText: "",
  designation: null,
  district: null,
  status: "",
  state: null,
};

const Users = () => {
  const stateOptions = getAllStates();

  const navigate = useNavigate();

  const {
    watch,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<typeof defaultValues>({ defaultValues });
  const userProfileState = useUserProfileStore((state: any) => state);

  const { projectDDList, getProjectsDDList } = useProjectStore(
    (state: any) => state
  );
  const { users, getData: getUserProfileList } = userProfileState;

  const options = [5, 10, 15];
  const [page, setPage] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(options[0]);
  const [isEditingId, setIsEditingId] = useState("");
  const [userProfileDetails, setUserProfileDetails] = useState<
    typeof defaultUserProfileValues
  >(defaultUserProfileValues);

  const selectedState = watch("state");

  const districtOptions: any[] = React.useMemo(() => {
    if (selectedState) {
      // @ts-ignore
      return getDistrictFromState(selectedState?.label || "");
    }
    return [];
  }, [selectedState]);

  const handleClose = () => {
    setOpenModal(false);
    setIsEditingId("");
  };

  const handleOpen = (id: string) => () => {
    if (id === "") {
      setOpenModal(true);
      return;
    }
    const d = users.find((item: any) => item.id === id);
    if (!d) return;
    setUserProfileDetails({
      firstName: d.first_name,
      lastName: d.last_name,
      email: d.email,
      personalcontactNUMBER: d.contact_number,
      project: null,
      designation: d.designation,
      district: d.district,
      dateOfJoining: d.date_of_joining,
      state: d.state,
    });
    setOpenModal(true);
    setIsEditingId(id);
  };

  const handleOpenDetails = (id: string) => () => {
    if (!id) return;
    console.log({ id });

    navigate(`${paths.employeeDetail}${id}`);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    (async () => {
      await getUserProfileList(10, 1);
      await getProjectsDDList();
    })();
  }, []);


  return (
    <div>
      <Paper
        elevation={0}
        sx={{ padding: "1rem", mb: "1rem", borderRadius: "10px" }}
      >
        <Grid container justifyContent={"space-between"} alignItems={"center"}>
          <Grid item>
            <Typography component={"label"} fontWeight={"700"}>
              Employee details lists
            </Typography>
          </Grid>
          <Grid item>
            <Grid
              container
              justifyContent={"space-between"}
              alignItems={"center"}
              gap={2}
            >
              <Grid item>
                <CustomButton
                  variant="contained"
                  color="primary"
                  onClick={handleOpen("")}
                  startIcon={<Add />}
                >
                  Add User
                </CustomButton>
              </Grid>
              <Grid item>
                <CustomButton
                  variant="contained"
                  color="primary"
                  startIcon={<Add />}
                >
                  Upload
                </CustomButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Paper elevation={0} sx={{ padding: "1rem", mb: "1rem" }}>
        <form
          onSubmit={handleSubmit((data) => {
            console.log(data);
          })}
        >
          <Grid container spacing={2} alignItems={"center"}>
            <Grid item xs={12} md={6} lg={2}>
              <FieldInput
                type={inputsType.TEXT}
                fullWidth
                label=""
                placeholder="Name"
                isError={!!errors.searchText?.message}
                control={control}
                register={register}
                helperText={errors?.searchText?.message}
                registerWith={"searchText"}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <RHFAutoComplete
                selectLabel=""
                placeholder="Select State"
                control={control}
                registerWith={"state"}
                options={stateOptions}
                isRequired={false}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <RHFAutoComplete
                selectLabel=""
                placeholder="Select District"
                control={control}
                registerWith={"district"}
                options={districtOptions}
                isRequired={false}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <RHFAutoComplete
                selectLabel=""
                placeholder="Select & Search Designation"
                control={control}
                registerWith={RegisterOption.District}
                options={[
                  { label: "Admin", id: 1 },
                  { label: "Super Admin", id: 2 },
                  { label: "ICT Instructor", id: 3 },
                ]}
                isRequired={false}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <RHFSelect
                selectLabel=""
                placeholder="Select Status"
                control={control}
                registerWith={`status`}
                options={statuses}
                isRequired={false}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={2} mb={"0.7rem"}>
              <Grid container alignItems={"center"} spacing={2}>
                <Grid item xs={6} md={6} lg={4}>
                  <CustomButton
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{ padding: "08px 12px", width: "100%" }}
                  >
                    Search
                  </CustomButton>
                </Grid>
                <Grid item xs={6} md={6} lg={4}>
                  <CustomButton
                    variant="contained"
                    color="primary"
                    type="reset"
                    sx={{ padding: "08px 12px", width: "100%" }}
                  >
                    Reset
                  </CustomButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <List
        handleOpen={handleOpen}
        options={options}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleOpenDetails={handleOpenDetails}
        page={page}
        results={users}
        rowsPerPage={rowsPerPage}
      />
      {openModal && (
        <CreateUser
          open={openModal}
          handleClose={handleClose}
          isEditingId={isEditingId}
          details={userProfileDetails}
          projectDDList={projectDDList}
        />
      )}
    </div>
  );
};

export default Users;
