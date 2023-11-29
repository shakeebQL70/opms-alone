import React, { useEffect, useState } from "react";
import { Paper, Grid, Typography, Box } from "@mui/material";
import { Add } from "UI/icons";
import { CustomButton } from "UI/button";
import DateRangePicker from "UI/daterange";
import { RHFAutoComplete, RHFSelect } from "UI/select";
import { FieldInput } from "UI/input";
import { inputsType } from "UI/utils";
import { useAssetCallLogStore, useSchoolStore } from "SUPER/store";

import {
  TableWrapper,
  TableHeadWrapper,
  TableBodyWrapper,
  PaginationWrapper,
  StyledTableRow,
  StyledTableCell,
  RowMultipleData,
} from "UI/table";
import { EditButton, ViewButton } from "UI/button";

import { useForm } from "react-hook-form";
import AddEditAssetComplaint, { defaultAssetComplaintValues } from "./AddEdit";
import ViewDetails from "../Details";
import { allComplaintStatus, allItemCategory } from "../../../utils/data";
import { formatDateYYYYMMDD } from "../../../utils";
import { NA } from "../../Users/Details";
const defaultValues = {
  tokenNo: "",
  school: null,
  selectedComponent: "",
  selectedStatus: "",
  dateRange: "",
};

const colHeaders = [
  {
    title: "Token No",
    id: 99,
  },
  {
    title: "School Name",
    id: 1,
  },
  {
    title: "Component",
    id: 2,
  },
  {
    title: "Problem",
    id: 5,
  },
  {
    title: "Status",
    id: 6,
  },
  {
    title: "Open Date",
    id: 10,
  },
  {
    title: "Close Date",
    id: 7,
  },
  {
    title: "Age",
    id: 8,
  },
];

const index = () => {
  const {
    getServiceDesk,
    serviceDesks = [],
    getServiceDeskDetailsById,
    complaintDetails = null,
  } = useAssetCallLogStore((state: any) => state);
  const { getAll: getAllSchools, allList: allSchoolsList } = useSchoolStore(
    (state: any) => state
  );
  const [selectedRange, setSelectedRange] = useState("");
  const options = [5, 10, 15];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(options[0]);
  const {
    watch,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<typeof defaultValues>({ defaultValues });
  const [openModal, setOpenModal] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [isEditingId, setIsEditingId] = useState("");

  const handleClose = () => {
    setOpenModal(false);
    setIsEditingId("");
  };

  const handleOpen = (id: string) => async () => {
    if (id) {
      await getServiceDeskDetailsById(id);
      setIsEditingId(id);
      setOpenModal(true);
      return;
    }
    setOpenModal(true);
  };

  const handleOpenDetails = (id: string) => async () => {
    if (!id) return;
    await getServiceDeskDetailsById(id);
    setOpenDetail(true);
  };

  const handleCloseDetail = () => {
    setOpenDetail(false);
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
    if (openModal && !allSchoolsList.length) {
      getAllSchools();
    }
  }, [openModal]);

  useEffect(() => {
    (async () => {
      await getServiceDesk(rowsPerPage, page);
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
              Call Log Summary List
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
                  Add Assets Complaint
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
            <Grid item xs={6} md={2}>
              <FieldInput
                type={inputsType.TEXT}
                fullWidth
                label=""
                placeholder="Token No"
                control={control}
                register={register}
                registerWith={"tokenNo"}
                isRequired={false}
              />
            </Grid>
            <Grid item xs={6} md={2}>
              <RHFAutoComplete
                placeholder="Search & Select School Code"
                control={control}
                registerWith={"school"}
                options={allSchoolsList}
                isRequired={false}
              />
            </Grid>
            <Grid item xs={6} md={2}>
              <RHFSelect
                selectLabel=""
                placeholder="Select Component"
                control={control}
                registerWith={`selectedComponent`}
                options={allItemCategory}
                isRequired={false}
              />
            </Grid>
            <Grid item xs={6} md={2}>
              <RHFSelect
                selectLabel=""
                placeholder="Select Status"
                control={control}
                registerWith={`selectedStatus`}
                options={allComplaintStatus}
                isRequired={false}
              />
            </Grid>
            <Grid item xs={6} md={2}>
              <DateRangePicker
                selectedRange={selectedRange}
                setSelectedRange={setSelectedRange}
              />
            </Grid>
            <Grid item xs={6} md={2} mb={"0.7rem"}>
              <Grid container alignItems={"center"} spacing={2}>
                <Grid item xs={6} md={6} lg={4}>
                  <CustomButton
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{ padding: "07px 12px", width: "100%" }}
                  >
                    Search
                  </CustomButton>
                </Grid>
                <Grid item xs={6} md={6} lg={4}>
                  <CustomButton
                    variant="contained"
                    color="primary"
                    type="reset"
                    sx={{ padding: "07px 12px", width: "100%" }}
                  >
                    Reset
                  </CustomButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <TableWrapper>
        <TableHeadWrapper>
          <StyledTableCell>{"S.No"}</StyledTableCell>
          {colHeaders.map((item) => {
            return (
              <StyledTableCell key={item.id}>{item.title}</StyledTableCell>
            );
          })}
          <StyledTableCell
            sx={{ width: "120px", textAlign: "center", fontWeight: "bold" }}
          >
            Action
          </StyledTableCell>
        </TableHeadWrapper>
        <TableBodyWrapper>
          {serviceDesks?.map((item: any, index: number) => {
            const data = [
              { key: "Name", value: item?.school?.school_name },
              { key: "School Code", value: item?.school?.school_code },
              { key: "UDISE Code", value: item?.school?.udise_code },
              { key: "District", value: item?.school?.district },
              { key: "Block", value: item?.school?.block },
            ];
            return (
              <StyledTableRow key={index}>
                <StyledTableCell className="">{index + 1}</StyledTableCell>
                <StyledTableCell>{item?.tokenNo || null}</StyledTableCell>
                <StyledTableCell>
                  <RowMultipleData data={data} highlightedKeys={["Name"]} />
                </StyledTableCell>
                <StyledTableCell>{item.item_category}</StyledTableCell>
                <StyledTableCell>{item.problem_description}</StyledTableCell>
                <StyledTableCell>{item.status}</StyledTableCell>
                <StyledTableCell>
                  {item?.open_date ? formatDateYYYYMMDD(item.open_date) : NA}
                </StyledTableCell>
                <StyledTableCell>
                  {item?.close_date ? formatDateYYYYMMDD(item.close_date) : NA}
                </StyledTableCell>
                <StyledTableCell>{item.age}</StyledTableCell>
                <StyledTableCell sx={{ textAlign: "center", padding: "08px" }}>
                  <Box display="flex">
                    <ViewButton
                      title="View"
                      onClick={handleOpenDetails(item?.id)}
                    />
                    <EditButton title="Edit" onClick={handleOpen(item?.id)} />
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBodyWrapper>
        <PaginationWrapper
          rows={options}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          page={page}
          rowsPerPage={rowsPerPage}
          count={serviceDesks.length}
        />
      </TableWrapper>
      <AddEditAssetComplaint
        open={openModal}
        handleClose={handleClose}
        isEditingId={isEditingId}
        details={complaintDetails}
        page={page}
        rowsPerPage={rowsPerPage}
      />
      <ViewDetails
        open={openDetail}
        handleClose={handleCloseDetail}
        details={complaintDetails}
      />
    </div>
  );
};

export default index;
