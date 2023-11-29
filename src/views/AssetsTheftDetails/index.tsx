import React, { useState } from "react";
import { Paper, Grid, Typography, Box } from "@mui/material";
import { Add } from "UI/icons";
import { CustomButton } from "UI/button";
import DateRangePicker from "UI/daterange";
import { RHFAutoComplete, RHFSelect } from "UI/select";
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
import AddEditTheftDetails from "./AddEdit";

const defaultValues = {
  school: null,
  contentType: "",
  instructor: "",
  dateRange: "",
};

const colHeaders = [
  {
    title: "School Name",
    id: 1,
  },
  {
    title: "Policy Type",
    id: 2,
  },
  {
    title: "FIR Date",
    id: 5,
  },
  {
    title: "Claim Status",
    id: 6,
  },
  {
    title: "Status",
    id: 9,
  },
];

const baseData = {
  schoolName: {
    Name: "GOVT MS BARWAIYAKALA",
    SchoolCode: "BCCL-JH-ICT3-LAT-301",
    UDISEfCode: 20220300301,
    District: "LATEHAR",
    Block: "MANIKA",
  },
  policyType: "N.A",
  firDate: "N.A",
  claimStatus: "N.A",
  status: "N.A",
};

const dataList: (typeof baseData)[] = [];

for (let i = 0; i < 100; i++) {
  const newData = JSON.parse(JSON.stringify(baseData));
  newData.schoolName.Name += `_${i + 1}`;
  dataList.push({ ...newData, trained: i % 2 === 0, active: i % 3 === 0 });
}

const data = [
  { key: "Name", value: "GOVT MS BARWAIYAKALA" },
  { key: "School Code", value: "BCCL-JH-ICT3-GRW-001" },
  { key: "UDISE Code", value: 20010304501 },
  { key: "District", value: "GARHWA" },
  { key: "Block", value: "BHANDARIA" },
];
const AssetsTheftDetails = () => {
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

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleOpenDetails = () => {
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

  const rowToMap =
    rowsPerPage > 0
      ? dataList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : dataList;
  return (
    <div>
      <Paper
        elevation={0}
        sx={{ padding: "1rem", mb: "1rem", borderRadius: "10px" }}
      >
        <Grid container justifyContent={"space-between"} alignItems={"center"}>
          <Grid item>
            <Typography component={"label"} fontWeight={"700"}>
              Asset Theft Detail List
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
                  onClick={handleOpen}
                  startIcon={<Add />}
                >
                  Add Lab Usage Details
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
            <Grid item xs={6} md={3}>
              <RHFAutoComplete
                placeholder="Search & Select School Code"
                control={control}
                registerWith={"school"}
                options={[
                  { label: "BCCL-JH-ICT3-GRW-001", id: 1 },
                  { label: "BCCL-JH-ICT3-GRW-002", id: 2 },
                  { label: "BCCL-JH-ICT3-GRW-003", id: 3 },
                ]}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <RHFSelect
                selectLabel=""
                placeholder="Select Status"
                control={control}
                registerWith={`contentType`}
                options={[
                  { label: "Recovered", id: 1 },
                  { label: "Replaced", id: 2 },
                  { label: "Rejected", id: 3 },
                  { label: "Stand-By", id: 4 },
                  { label: "In-Process", id: 5 },
                ]}
                isRequired={false}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <DateRangePicker
                selectedRange={selectedRange}
                setSelectedRange={setSelectedRange}
              />
            </Grid>
            <Grid item xs={6} md={3} mb={"0.7rem"}>
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
          {rowToMap?.map((item: any, index: number) => {
            return (
              <StyledTableRow key={index}>
                <StyledTableCell className="">{index + 1}</StyledTableCell>
                <StyledTableCell>
                  <RowMultipleData data={data} highlightedKeys={["Name"]} />
                </StyledTableCell>
                <StyledTableCell>{item.policyType}</StyledTableCell>
                <StyledTableCell>{item.firDate}</StyledTableCell>
                <StyledTableCell>{item.claimStatus}</StyledTableCell>
                <StyledTableCell>{item.status}</StyledTableCell>
                <StyledTableCell sx={{ textAlign: "center", padding: "08px" }}>
                  <Box display="flex">
                    <ViewButton title="View" onClick={handleOpenDetails} />
                    <EditButton title="Edit" onClick={handleOpen} />
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
          count={dataList.length}
        />
      </TableWrapper>

      <AddEditTheftDetails open={openModal} handleClose={handleClose} />
      {/* <ViewDetails open={openDetail} handleClose={handleCloseDetail} /> */}
    </div>
  );
};

export default AssetsTheftDetails;
