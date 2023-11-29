import { Box, TableHead, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { DialogBody, DialogHeader, CustomizedDialog } from "UI/modal";
import {
  TableWrapper,
  TableBodyWrapper,
  StyledTableCell,
  StyledTableRow,
  TableHeadWrapper,
  PaginationWrapper,
} from "UI/table";

import { BasicTabs, TabsWrapper, TabWrapper, CustomTabPanel } from "UI/tabs";
import { NA } from "../../Users/Details";
import { formatDateYYYYMMDD } from "../../../utils";

interface IViewDetails {
  open: boolean;
  handleClose: (...params: any) => void;
  details: any;
}

const tabs = ["Client Information", "Problem Description", "Call Log Summary"];

const colHeaders = [
  {
    title: "Open Date",
    id: 99,
  },
  {
    title: "Follow Up Date",
    id: 1,
  },
  {
    title: "Status Remark",
    id: 2,
  },
  {
    title: "Current Status",
    id: 5,
  },
];


const ViewDetails = (props: IViewDetails) => {
  const { open, handleClose, details } = props;
  const [selectedTab, setSelectTab] = useState(0);
  const options = [5, 10, 15];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(options[0]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectTab(newValue);
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

  const clientInfoDetails = {
    schoolName: details?.school?.name || NA,
    district: details?.school?.district || NA,
    address: details?.school?.address || NA,
    pContactNo: details?.school?.principal_mobile || NA,
    schoolCoordinator: NA,
    principalName: details?.school?.principal_name || NA,
    block: details?.school?.block || NA,
    complaintLoggedBy: NA,
    designation: "Principal",
    contactNo: details?.school?.policestation_landline || NA,
  };

  const problemDescDetails = {
    equipmentName: details?.asset?.item_category || NA,
    oemName: details?.asset?.oem_name || NA,
    modelName: details?.asset?.item_model_name || NA,
    warrantyExpireDate: details?.asset?.warranty_end_date
      ? formatDateYYYYMMDD(details?.asset?.warranty_end_date)
      : NA,
    requestType: details?.request_type || NA,
    complaintSeverity: details?.ticket_complaint || NA,
    serialNumber: details?.asset?.item_serial_no || NA,
    serviceProvider: details?.asset?.item_make || NA,
    installationDate: NA,
    warrantyStatus: "Active",
    problemType: details?.problem_type || NA,
    complaintRemarks: details?.problem_description || NA,
  };

  const ClientInfo = () => (
    <TableWrapper>
      <TableBodyWrapper>
        <StyledTableRow>
          <StyledTableCell>School Name</StyledTableCell>
          <StyledTableCell>{clientInfoDetails.schoolName}</StyledTableCell>
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell>District</StyledTableCell>
          <StyledTableCell>{clientInfoDetails.address}</StyledTableCell>
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell>Address</StyledTableCell>
          <StyledTableCell>{clientInfoDetails.address}</StyledTableCell>
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell>School Name</StyledTableCell>
          <StyledTableCell>{clientInfoDetails.schoolName}</StyledTableCell>
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell>Contact No.</StyledTableCell>
          <StyledTableCell>{clientInfoDetails.pContactNo}</StyledTableCell>
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell>School Co-ordinator</StyledTableCell>
          <StyledTableCell>
            {clientInfoDetails.schoolCoordinator}
          </StyledTableCell>
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell>School Name</StyledTableCell>
          <StyledTableCell>{clientInfoDetails.schoolName}</StyledTableCell>
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell>Principal Name</StyledTableCell>
          <StyledTableCell>{clientInfoDetails.principalName}</StyledTableCell>
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell>Block</StyledTableCell>
          <StyledTableCell>{clientInfoDetails.block}</StyledTableCell>
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell>Complaint Logged By</StyledTableCell>
          <StyledTableCell>
            {clientInfoDetails.complaintLoggedBy}
          </StyledTableCell>
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell>Designation</StyledTableCell>
          <StyledTableCell>{clientInfoDetails.designation}</StyledTableCell>
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell>Contact No</StyledTableCell>
          <StyledTableCell>{clientInfoDetails.contactNo}</StyledTableCell>
        </StyledTableRow>
      </TableBodyWrapper>
    </TableWrapper>
  );
  const ProblemDesc = () => (
    <TableWrapper>
      <TableBodyWrapper>
        <StyledTableRow>
          <StyledTableCell>Equipment Name</StyledTableCell>
          <StyledTableCell>{problemDescDetails.equipmentName}</StyledTableCell>
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell>OEM Name</StyledTableCell>
          <StyledTableCell>{problemDescDetails.oemName}</StyledTableCell>
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell>Model Name</StyledTableCell>
          <StyledTableCell>{problemDescDetails.modelName}</StyledTableCell>
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell>Warranty Expire Date</StyledTableCell>
          <StyledTableCell>
            {problemDescDetails.warrantyExpireDate}
          </StyledTableCell>
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell>Request Type</StyledTableCell>
          <StyledTableCell>{problemDescDetails.requestType}</StyledTableCell>
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell>Complaint Severity</StyledTableCell>
          <StyledTableCell>
            {problemDescDetails.complaintSeverity}
          </StyledTableCell>
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell>Serial Number</StyledTableCell>
          <StyledTableCell>{problemDescDetails.serialNumber}</StyledTableCell>
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell>Installation Date</StyledTableCell>
          <StyledTableCell>
            {problemDescDetails.installationDate}
          </StyledTableCell>
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell>Warranty Status</StyledTableCell>
          <StyledTableCell>{problemDescDetails.warrantyStatus}</StyledTableCell>
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell>Problem Type</StyledTableCell>
          <StyledTableCell>{problemDescDetails.problemType}</StyledTableCell>
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell>Complaint Remarks</StyledTableCell>
          <StyledTableCell>
            {problemDescDetails.complaintRemarks}
          </StyledTableCell>
        </StyledTableRow>
      </TableBodyWrapper>
    </TableWrapper>
  );

  const CallLog = () => (
    <>
      <TableWrapper>
        <TableHeadWrapper>
          <StyledTableCell>{"S.No"}</StyledTableCell>
          {colHeaders.map((item) => {
            return (
              <StyledTableCell key={item.id}>{item.title}</StyledTableCell>
            );
          })}
        </TableHeadWrapper>
        {/* <TableBodyWrapper>
        {[baseData]?.map((item: any, index: number) => {
          return (
            <StyledTableRow key={index}>
            <StyledTableCell className="">{index + 1}</StyledTableCell>
            <StyledTableCell>{item.openDate}</StyledTableCell>
            <StyledTableCell>{item.followUpDate}</StyledTableCell>
            <StyledTableCell>{item.statusRemark}</StyledTableCell>
            <StyledTableCell>{item.currentStatus}</StyledTableCell>
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
          count={[baseData].length}
        /> */}
      </TableWrapper>
      <Paper elevation={0} sx={{ p: "1rem" }}>
        <Typography component="h1" textAlign={"center"}>
          No Details found
        </Typography>
      </Paper>
    </>
  );

  return (
    <div>
      <CustomizedDialog
        open={open}
        handleClose={handleClose}
        fullWidth
        maxWidth="md"
      >
        <DialogHeader handleClose={handleClose}>
          Complaint History List
        </DialogHeader>
        <DialogBody>
          {!details ? (
            <Paper elevation={0} sx={{ p: "1rem" }}>
              <Typography component="h1" textAlign={"center"}>
                No Details found
              </Typography>
            </Paper>
          ) : (
            <BasicTabs>
              <TabsWrapper value={selectedTab} onChange={handleChange}>
                {tabs.map((tab, index) => {
                  return <TabWrapper key={index} label={tab} index={index} />;
                })}
              </TabsWrapper>

              <CustomTabPanel value={selectedTab} index={0}>
                <ClientInfo />
              </CustomTabPanel>
              <CustomTabPanel value={selectedTab} index={1}>
                <ProblemDesc />
              </CustomTabPanel>
              <CustomTabPanel value={selectedTab} index={2}>
                <CallLog />
              </CustomTabPanel>
            </BasicTabs>
          )}
        </DialogBody>
      </CustomizedDialog>
    </div>
  );
};

export default ViewDetails;
