import { Box } from "@mui/material";
import React from "react";
import { DialogBody, DialogHeader, CustomizedDialog } from "UI/modal";
import {
  TableWrapper,
  TableBodyWrapper,
  StyledTableCell,
  StyledTableRow,
} from "UI/table";
import { defaultMISOfficeValues } from "./AddEdit";

interface IViewDetails {
  open: boolean;
  handleClose: (...params: any) => void;
  details: typeof defaultMISOfficeValues;
}

const ViewDetails = (props: IViewDetails) => {
  const { open, handleClose, details } = props;
  const data = [
    {
      title: "School Name(BCCL Code)",
      value: (details.schoolCode as any)?.label,
    },
    { title: "Class Date", value: details.classDate },
    { title: "Start Time", value: details.startTime },
    { title: "End Time", value: details.endTime },
    {
      title: "Total Duration",
      value: "",
    },
    { title: "No. Of Node Used", value: details.noOfNodeUsed },
    { title: "Category", value: details.category },
    { title: "Remarks", value: details.remarks },
    {
      title: "Instructor Engaged	",
      value: details.instructorEngaged || "Not available",
    },
    { title: "Image", value: "Not Available" },
    { title: "Teacher Name", value: (details.teacherName as any)?.label },
  ];

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
