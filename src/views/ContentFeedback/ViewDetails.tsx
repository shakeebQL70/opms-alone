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
  { title: "Date", value: "17-10-2023" },
  { title: "Class", value: "8" },
  { title: "Section", value: "11:00 AM" },
  { title: "Subject", value: "00:45:00 Hrs" },
  { title: "Other Subject", value: "..." },
  { title: "Chapter/Topic", value: "REPRODUCTION" },
  { title: "Issue in Details and Suggestion", value: "No" },
  { title: "Subject Teacher", value: "Vinod Kumar" },
  { title: "Issue Resolved", value: "No" },
  { title: "Resolved Date", value: "00-00-0000" },
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
