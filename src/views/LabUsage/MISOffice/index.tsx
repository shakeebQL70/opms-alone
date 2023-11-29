import React, { useEffect, useState } from "react";
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
import { useLabUsageStore, useSchoolStore } from "SUPER/store";

import { useForm } from "react-hook-form";
import AddEditLabUsageMIS, { defaultMISOfficeValues } from "./AddEdit";
import ViewDetails from "./ViewDetails";
import {
  formatDateYYYYMMDD,
  getAutocompleteFilterData,
  getSelectFilterData,
  getTimeInAMPM,
} from "../../../utils";
import {
  allCategory,
  allTeachers,
  instructorEngagedArr,
  schoolCodes,
} from "../../../utils/data";

const defaultValues = {
  school: null,
  category: "",
  instructor: "",
};

const colHeaders = [
  {
    title: "School Name",
    id: 1,
  },
  {
    title: "Date",
    id: 2,
  },
  {
    title: "Start Time",
    id: 5,
  },
  {
    title: "End Time",
    id: 6,
  },
  {
    title: "Node Used",
    id: 10,
  },
  {
    title: "Category",
    id: 7,
  },
  {
    title: "Instructor Engaged",
    id: 8,
  },
  {
    title: "Remarks",
    id: 9,
  },
];

const MISWork = () => {
  const labUsageStore = useLabUsageStore((state: any) => state);
  const { getAll: getAllSchools, allList: allSchoolsList } = useSchoolStore(
    (state: any) => state
  );
  const { usages = [], getLabUsageList } = labUsageStore;
  const {
    watch,
    control,
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<typeof defaultValues>({ defaultValues });

  const [selectedRange, setSelectedRange] = useState({
    value: "",
    from: "",
    to: "",
  });
  const options = [5, 10, 15];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(options[0]);
  const [openModal, setOpenModal] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [isEditingId, setIsEditingId] = useState("");
  const [misOfficeDetail, setMISOfficeDetail] = useState<
    typeof defaultMISOfficeValues | undefined
  >(undefined);

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleOpen = (id: string) => () => {
    setOpenModal(true);
    setIsEditingId(id);
    handleSetDetails(id);
  };

  const handleOpenDetails = (id: string) => () => {
    setOpenDetail(true);
    setIsEditingId(id);
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
    (async () => {
      const { school, instructor } = getValues();
      const reqObj: any = {
        // @ts-ignore
        category: "mis_work",
        limit: rowsPerPage,
        page: page + 1,
        // @ts-ignore
        schoolId: school?.id || "",
        section: "",
        // @ts-ignore
        class: "",
        subject: "",
        fromDate: selectedRange.from,
        toDate: selectedRange.to,
        instructor: instructorEngagedArr.find((item) => item.id === instructor)
          ?.value,
      };
      setValue("category", "4");
      await getLabUsageList(reqObj);
      await getAllSchools();
    })();
  }, []);

  const handleSetDetails = (id: string) => {
    const d = usages.find((item: any) => item.id === id);
    if (d) {
      setMISOfficeDetail({
        classDate: formatDateYYYYMMDD(d.class_date),
        category: getSelectFilterData(d.category, allCategory),
        endTime: getTimeInAMPM(d?.end_time),
        imageLink: "",
        instructorEngaged: getSelectFilterData(
          d.is_instructor_engaged,
          instructorEngagedArr
        ),
        noOfNodeUsed: d?.node_count_used,
        remarks: d?.remarks,
        schoolCode: getAutocompleteFilterData(
          d.school?.school_id,
          allSchoolsList
        ),
        startTime: getTimeInAMPM(d?.start_time),
        teacherName: getAutocompleteFilterData(
          d.teacher.teacher_id,
          allTeachers
        ),
      });
    }
  };

  const handleSearch = async (data: typeof defaultValues) => {
    const { category, instructor, school } = data;
    const reqObj: any = {
      // @ts-ignore
      category: allCategory.find((item) => item.id === category)?.value,
      limit: rowsPerPage,
      page: page + 1,
      // @ts-ignore
      schoolId: school?.id || "",
      section: "",
      // @ts-ignore
      class: "",
      subject: "",
      fromDate: selectedRange.from,
      toDate: selectedRange.to,
      instructor: instructorEngagedArr.find((item) => item.id === instructor)
        ?.value,
    };
    await getLabUsageList(reqObj);
  };

  return (
    <div>
      <Paper
        elevation={0}
        sx={{ padding: "1rem", mb: "1rem", borderRadius: "10px" }}
      >
        <Grid container justifyContent={"space-between"} alignItems={"center"}>
          <Grid item>
            <Typography component={"label"} fontWeight={"700"}>
              Lab Usages(MIS/Office Work) Details List
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
            handleSearch(data);
          })}
        >
          <Grid container spacing={2} alignItems={"center"}>
            <Grid item xs={6} md={2}>
              <RHFAutoComplete
                placeholder="Search & Select School Code"
                control={control}
                registerWith={"school"}
                options={[]}
              />
            </Grid>
            <Grid item xs={6} md={2}>
              <RHFSelect
                selectLabel=""
                placeholder="Select Category Type"
                control={control}
                registerWith={`category`}
                options={allCategory}
                isRequired={false}
              />
            </Grid>
            <Grid item xs={6} md={2}>
              <RHFSelect
                selectLabel=""
                placeholder={"Instructor Engaged"}
                control={control}
                registerWith={`instructor`}
                options={instructorEngagedArr}
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
          {usages?.map((item: any, index: number) => {
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
                <StyledTableCell>
                  <RowMultipleData data={data} highlightedKeys={["Name"]} />
                </StyledTableCell>
                <StyledTableCell>
                  {formatDateYYYYMMDD(item.class_date)}
                </StyledTableCell>
                <StyledTableCell>
                  {getTimeInAMPM(item.start_time)}
                </StyledTableCell>
                <StyledTableCell>
                  {getTimeInAMPM(item.end_time)}
                </StyledTableCell>
                <StyledTableCell>{item.node_count_used}</StyledTableCell>
                <StyledTableCell>{item.category}</StyledTableCell>
                <StyledTableCell>{item?.is_instructor_engaged}</StyledTableCell>
                <StyledTableCell>{item.remarks}</StyledTableCell>
                <StyledTableCell sx={{ textAlign: "center", padding: "08px" }}>
                  <Box display="flex">
                    <ViewButton
                      title="View"
                      onClick={handleOpenDetails(item.id)}
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
          count={usages.length}
        />
      </TableWrapper>

      {openModal && (
        <AddEditLabUsageMIS
          open={openModal}
          handleClose={handleClose}
          isEditingId={isEditingId}
          details={misOfficeDetail}
          page={page}
          rowsPerPage={rowsPerPage}
        />
      )}
      {isEditingId && misOfficeDetail && openDetail && (
        <ViewDetails
          open={openDetail}
          handleClose={handleCloseDetail}
          details={misOfficeDetail}
        />
      )}
    </div>
  );
};

export default MISWork;
