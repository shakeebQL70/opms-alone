import { Box } from "@mui/material";
import React from "react";
import { DialogBody, DialogHeader, CustomizedDialog } from "UI/modal";
import {
  TableWrapper,
  TableBodyWrapper,
  StyledTableCell,
  StyledTableRow,
} from "UI/table";

interface IViewDetails {
  open: boolean;
  handleClose: (...params: any) => void;
}

const data = [
  {
    title: "School Name(BCCL Code)",
    value: "GOVT MS SIMDEGA ( BCCL-JH-ICT3-SIM-909 )",
  },
  { title: "Class Date", value: "17-10-2023" },
  { title: "Start Time", value: "10:15 AM" },
  { title: "End Time", value: "11:00 AM" },
  { title: "Total Running", value: "00:45:00 Hrs" },
  { title: "Class", value: "8" },
  { title: "Section", value: "A" },
  { title: "No.Of Students Attend", value: "17" },
  { title: "No. Of Node Used", value: "11" },
  { title: "Subject", value: "Computer" },
  { title: "Category", value: "Practical" },
  { title: "Topic Covered/ Work Details	", value: "page style" },
  { title: "Feedback Of Class", value: "Not Available" },
  { title: "Videolink", value: "(not set)" },
  { title: "Image", value: "Not Available" },
  { title: "Teacher Name", value: "SONI KUMARI" },
];
const ViewDetails = (props: IViewDetails) => {
  const { open, handleClose } = props;
  return (
    <div>
      <CustomizedDialog
        open={open}
        handleClose={handleClose}
        fullWidth
        maxWidth="md"
      >
        <DialogHeader handleClose={handleClose}>Lab Usage Details</DialogHeader>
        <DialogBody>
          <Box>
            <TableWrapper>
              <TableBodyWrapper>
                {data?.map((detail, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>{detail.title}</StyledTableCell>
                    <StyledTableCell>{detail.value}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBodyWrapper>
            </TableWrapper>
          </Box>
        </DialogBody>
      </CustomizedDialog>
    </div>
  );
};

export default ViewDetails;
