import React, { useEffect, useState } from "react";
import { Paper, Grid, Typography, Box } from "@mui/material";

import {
  TableWrapper,
  TableHeadWrapper,
  TableBodyWrapper,
  PaginationWrapper,
  StyledTableRow,
  StyledTableCell,
} from "UI/table";
import { EditButton } from "UI/button";
import { Add } from "UI/icons";
import { CustomButton } from "UI/button";
import AddEditFAQ from "./AddEdit";
import { useAssetCallLogStore } from "SUPER/store";
import { NA } from "../../Users/Details";

const colHeaders = [
  {
    title: "Question",
    id: 99,
  },
  {
    title: "Answer",
    id: 1,
  },
];

const index = () => {
  const { getAllFAQ, allFAQs = [] } = useAssetCallLogStore(
    (state: any) => state
  );

  const options = [5, 10, 15];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(options[0]);
  const [openModal, setOpenModal] = useState(false);
  const [isEditingId, setIsEditingId] = useState("");
  const [faqDetail, setFAQDetail] = useState(null);

  const handleClose = () => {
    setOpenModal(false);
    setIsEditingId("");
  };

  const handleOpen = (id: string) => () => {
    if (id) {
      setIsEditingId(id);
      const d = allFAQs.find((item: any) => item.id === id);
      if (d) {
        setFAQDetail(d);
      }
    }
    setOpenModal(true);
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
      await getAllFAQ(rowsPerPage, page);
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
              FAQ List
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
                  Add FAQ
                </CustomButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
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
          {allFAQs?.map((item: any) => {
            return (
              <StyledTableRow key={item.id}>
                <StyledTableCell className="">{1}</StyledTableCell>
                <StyledTableCell>{item?.question || NA}</StyledTableCell>
                <StyledTableCell>{item?.answer || NA}</StyledTableCell>
                <StyledTableCell sx={{ textAlign: "center", padding: "08px" }}>
                  <Box display="flex" justifyContent={"center"}>
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
          count={1}
        />
      </TableWrapper>
      <AddEditFAQ
        open={openModal}
        handleClose={handleClose}
        isEditingId={isEditingId}
        details={faqDetail}
        page={page}
        rowsPerPage={rowsPerPage}
      />
    </div>
  );
};

export default index;
