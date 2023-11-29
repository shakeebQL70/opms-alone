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

import { useForm } from "react-hook-form";
import AddEditLabUsage, { defaultTheoryValues } from "./AddEdit";
import { useLabUsageStore, useSchoolStore } from "SUPER/store";

import ViewDetails from "./ViewDetails";
import {
  allCategory,
  allClasses,
  allSections,
  allSubject,
  allTeachers,
  schoolCodes,
} from "../../../utils/data";
import {
  formatDateYYYYMMDD,
  getAutocompleteFilterData,
  getSelectFilterData,
  getTimeInAMPM,
} from "../../../utils";

const defaultValues = {
  school: null,
  category: allCategory[0],
  selectedClass: null,
  section: "",
  subject: "",
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
    title: "Class",
    id: 3,
  },
  {
    title: "Students",
    id: 4,
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
    title: "Category",
    id: 7,
  },
  {
    title: "Subject",
    id: 8,
  },
  {
    title: "Topic Covered",
    id: 9,
  },
];

const LabUsage = () => {
  const labUsageStore = useLabUsageStore((state: any) => state);
  const { usages = [], getLabUsageList } = labUsageStore;
  const { getAll: getAllSchools, dropdownList: allSchoolsList } =
    useSchoolStore((state: any) => state);
  const [selectedRange, setSelectedRange] = useState({
    value: "",
    from: "",
    to: "",
  });
  const options = [5, 10, 15];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(options[0]);
  const {
    watch,
    control,
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<typeof defaultValues>({ defaultValues });
  const [openModal, setOpenModal] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [isEditingId, setIsEditingId] = useState("");
  const [theoryOfficeDetails, setTheoryOfficeDetails] =
    useState<typeof defaultTheoryValues>(defaultTheoryValues);

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
      const { category, school, section, selectedClass, subject } = getValues();
      const reqObj: any = {
        // @ts-ignore
        category: category?.value || "",
        limit: rowsPerPage,
        page: page + 1,
        // @ts-ignore
        schoolId: school?.id || "",
        section: section,
        // @ts-ignore
        class: selectedClass?.id || "",
        subject: subject,
        fromDate: selectedRange.from,
        toDate: selectedRange.to,
      };
      await getLabUsageList(reqObj);
      await getAllSchools();
    })();
  }, []);
  const handleSetDetails = (id: string) => {
    const d = usages.find((item: any) => item.id === id);
    if (d) {
      setTheoryOfficeDetails({
        classDate: formatDateYYYYMMDD(d.class_date),
        category: getSelectFilterData(d.category, allCategory),
        endTime: getTimeInAMPM(d?.end_time),
        imageLink: "",
        noOfNodeUsed: d?.node_count_used,
        schoolCode: getAutocompleteFilterData(
          d.school?.school_id,
          allSchoolsList
        ),
        startTime: getTimeInAMPM(d?.start_time),
        teacherName: getAutocompleteFilterData(
          d.teacher.teacher_id,
          allTeachers
        ),
        feedbackOfClass: d?.class_feedback,
        noOfStudentAttended: d?.student_count_attend,
        reasonForExtraStudent: "",
        selectedClass: getAutocompleteFilterData(d?.class, allClasses),
        subject: getSelectFilterData(d?.subject, allSubject),
        section: getSelectFilterData(d?.section, allSections),
        topicCovered: d?.topic_work_details,
        totalStudent: 0,
      });
    }
  };

  const handleSearch = async (data: typeof defaultValues) => {
    const { category, school, section, selectedClass, subject } = data;
    const reqObj: any = {
      // @ts-ignore
      category: category?.value || "",
      limit: rowsPerPage,
      page: page + 1,
      // @ts-ignore
      schoolId: school?.id || "",
      section: section,
      // @ts-ignore
      class: selectedClass?.id || "",
      subject: subject,
      fromDate: selectedRange.from,
      toDate: selectedRange.to,
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
              Lab Usages(Theory/Practical/Multimedia) Details List
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
            <Grid item xs={6} md={3}>
              <RHFAutoComplete
                placeholder="Search & Select School Code"
                control={control}
                registerWith={"school"}
                options={allSchoolsList}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <RHFAutoComplete
                selectLabel=""
                placeholder="Select & Search Category"
                control={control}
                registerWith={"category"}
                options={allCategory}
                isRequired={false}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <RHFAutoComplete
                selectLabel=""
                placeholder="Select & Search Class"
                control={control}
                registerWith={"selectedClass"}
                options={allClasses}
                isRequired={false}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <RHFSelect
                selectLabel=""
                placeholder="Select Section"
                control={control}
                registerWith={`section`}
                options={allSections}
                isRequired={false}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems={"center"}>
            <Grid item xs={6} md={3}>
              <RHFSelect
                selectLabel=""
                placeholder={"Select Subject"}
                control={control}
                registerWith={`subject`}
                options={allSubject}
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
                <StyledTableCell>{item.date}</StyledTableCell>
                <StyledTableCell>{item.class}</StyledTableCell>
                <StyledTableCell>{item.student_count_attend}</StyledTableCell>
                <StyledTableCell>
                  {getTimeInAMPM(item.start_time)}
                </StyledTableCell>
                <StyledTableCell>
                  {getTimeInAMPM(item.end_time)}
                </StyledTableCell>
                <StyledTableCell>{item.category}</StyledTableCell>
                <StyledTableCell>{item.subject}</StyledTableCell>
                <StyledTableCell>{item.topic_work_details}</StyledTableCell>
                <StyledTableCell sx={{ textAlign: "center", padding: "08px" }}>
                  <Box display="flex">
                    <ViewButton title="View" onClick={handleOpenDetails} />
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
          count={usages!.length}
        />
      </TableWrapper>

      {openModal && (
        <AddEditLabUsage
          open={openModal}
          handleClose={handleClose}
          isEditingId={isEditingId}
          details={theoryOfficeDetails}
          page={page}
          rowsPerPage={rowsPerPage}
        />
      )}
      {openDetail && theoryOfficeDetails && isEditingId && (
        <ViewDetails open={openDetail} handleClose={handleCloseDetail} />
      )}
    </div>
  );
};

export default LabUsage;
