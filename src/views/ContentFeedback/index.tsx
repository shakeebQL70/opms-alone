import React, { useEffect, useState } from "react";
import { Paper, Grid, Typography, Box } from "@mui/material";
import { Add } from "UI/icons";
import { CustomButton } from "UI/button";
import DateRangePicker from "UI/daterange";
import { RHFAutoComplete, RHFSelect } from "UI/select";
import { useContentFeedbackStore, useSchoolStore } from "SUPER/store";
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
import AddEditContentFeedback, {
  defaultContentFeedbackValues,
} from "./AddEdit";
import ViewDetails from "./ViewDetails";
import {
  allClasses,
  allSections,
  allSubject,
  allTeachers,
  schoolCodes,
} from "../../utils/data";
import {
  formatDateYYYYMMDD,
  getAutocompleteFilterData,
  getSelectFilterData,
} from "../../utils";
const defaultValues = {
  school: null,
  selectedClass: "",
  selectedSection: "",
  selectedSubject: "",
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
    id: 5,
  },
  {
    title: "Subject",
    id: 6,
  },
  {
    title: "Chapter/Topic",
    id: 10,
  },
  {
    title: "Issue in Details and Suggestion",
    id: 7,
  },
  {
    title: "Teacher",
    id: 8,
  },
  {
    title: "Resolved",
    id: 9,
  },
];

const index = () => {
  const contentFeedback = useContentFeedbackStore((state: any) => state);
  const { getAll: getAllSchools, allList: allSchoolsList } = useSchoolStore(
    (state: any) => state
  );
  const { feedbacks = [], getData: getContentFeedback } = contentFeedback || {};
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
    getFieldState,
    formState: { errors },
  } = useForm<typeof defaultValues>({ defaultValues });
  const [openModal, setOpenModal] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [isEditingId, setIsEditingId] = useState("");
  const [contentFeedbackDetail, setContentFeedbackDetail] = useState<
    typeof defaultContentFeedbackValues
  >(defaultContentFeedbackValues);

  const handleClose = () => {
    setOpenModal(false);
    setIsEditingId("");
  };

  const handleOpen = (id: string) => () => {
    if (id === "") {
      setOpenModal(true);
      return;
    }
    const d = feedbacks.find((item: any) => item.id === id);
    if (!d) return;
    setContentFeedbackDetail({
      schoolName: getAutocompleteFilterData(
        d.school?.school_id,
        allSchoolsList
      ),
      date: formatDateYYYYMMDD(d.date),
      selectedClass: getSelectFilterData(d.class, allClasses),
      section: getSelectFilterData(d.section, allSections),
      subject: getSelectFilterData(d.subject, allSubject),
      chapterTopic: d.chapter_topic,
      issueDetail: d.issue_details,
      subjectTeacher: getAutocompleteFilterData(
        d.teacher.teacher_id,
        allTeachers
      ),
    });
    setOpenModal(true);
    setIsEditingId(id);
  };

  const handleOpenDetails = (id: string) => {
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
    (async () => {
      const { school, selectedSection, selectedClass, selectedSubject } =
        getValues();
      const reqObj = {
        limit: rowsPerPage,
        page: page + 1,
        //@ts-ignore
        school: school?.id || "",
        subject: selectedSubject,
        section: selectedSection,
        selectedClass: selectedClass,
        toDate: selectedRange.to,
        fromDate: selectedRange.from,
      };
      await getContentFeedback(reqObj);
      if (!allSchoolsList.length) {
        getAllSchools();
      }
    })();
  }, []);

  useEffect(() => {
    if (openModal && !allSchoolsList.length) {
      getAllSchools();
    }
  }, [openModal]);

  const handleSearch = async (data: typeof defaultValues) => {
    const { school, selectedSection, selectedClass, selectedSubject } = data;
    const reqObj = {
      limit: rowsPerPage,
      page: page + 1,
      //@ts-ignore
      school: school?.id || "",
      subject: selectedSubject,
      section: selectedSection,
      selectedClass: selectedClass,
      toDate: selectedRange.to,
      fromDate: selectedRange.from,
    };
    await getContentFeedback(reqObj);
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
              Content Feedbacks Details List
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
                  Add Content Feedbacks
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
                options={schoolCodes}
              />
            </Grid>
            <Grid item xs={6} md={2}>
              <RHFSelect
                selectLabel=""
                placeholder="Select Class"
                control={control}
                registerWith={`selectedClass`}
                options={allClasses}
                isRequired={false}
              />
            </Grid>
            <Grid item xs={6} md={2}>
              <RHFSelect
                selectLabel=""
                placeholder="Select Section"
                control={control}
                registerWith={`selectedSection`}
                options={allSections}
                isRequired={false}
              />
            </Grid>
            <Grid item xs={6} md={2}>
              <RHFSelect
                selectLabel=""
                placeholder="Select Subject"
                control={control}
                registerWith={`selectedSubject`}
                options={allSubject}
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
          {feedbacks?.map((item: any, index: number) => {
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
                  {formatDateYYYYMMDD(item.date)}
                </StyledTableCell>
                <StyledTableCell>{item.class}</StyledTableCell>
                <StyledTableCell>{item.subject}</StyledTableCell>
                <StyledTableCell>{item.chapter_topic}</StyledTableCell>
                <StyledTableCell>{item.issue_details}</StyledTableCell>
                <StyledTableCell>{item.teacher.teacher_name}</StyledTableCell>
                <StyledTableCell>{item.status}</StyledTableCell>
                <StyledTableCell sx={{ textAlign: "center", padding: "08px" }}>
                  <Box display="flex">
                    <ViewButton
                      title="View"
                      onClick={() => handleOpenDetails(item.id)}
                    />
                    <EditButton title="Edit" onClick={handleOpen(item.id)} />
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
          count={feedbacks.length}
        />
      </TableWrapper>
      {openModal && (
        <AddEditContentFeedback
          open={openModal}
          handleClose={handleClose}
          isEditingId={isEditingId}
          details={contentFeedbackDetail}
          page={page}
          rowsPerPage={rowsPerPage}
        />
      )}
      {openDetail && (
        <ViewDetails open={openDetail} handleClose={handleCloseDetail} />
      )}
    </div>
  );
};

export default index;
