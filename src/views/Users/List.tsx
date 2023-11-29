import React from "react";
import {
  TableWrapper,
  TableHeadWrapper,
  TableBodyWrapper,
  PaginationWrapper,
  StyledTableCell,
  StyledTableRow,
  Status,
} from "UI/table";
import { EditButton, ViewButton } from "UI/button";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

interface IList {
  handleOpen: (...params: any) => void;
  options: any[];
  handleChangePage: (...params: any[]) => void;
  handleChangeRowsPerPage: (...params: any[]) => void;
  page: number;
  rowsPerPage: number;
  results: any[];
  handleOpenDetails: (...params: any[]) => void;
}

const colHeaders = [
  {
    title: "Name",
    id: 1,
  },
  {
    title: "District",
    id: 2,
  },
  {
    title: "Qualification",
    id: 5,
  },
  {
    title: "Experience",
    id: 6,
  },
  {
    title: "Designation",
    id: 10,
  },
  {
    title: "Status",
    id: 7,
  },
];

const List = (props: IList) => {
  const {
    handleOpen,
    options,
    results,
    handleChangePage,
    handleChangeRowsPerPage,
    page,
    rowsPerPage,
    handleOpenDetails,
  } = props;

  return (
    <div>
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
          {results?.map((item: any, index: number) => {
            return (
              <StyledTableRow key={index}>
                <StyledTableCell className="">{index + 1}</StyledTableCell>
                <StyledTableCell>{item.first_name} {item.last_name}</StyledTableCell>
                <StyledTableCell>
                  {item?.district || "Not available"}
                </StyledTableCell>
                <StyledTableCell>
                  {item?.qualification || "Not available"}
                </StyledTableCell>
                <StyledTableCell>
                  {item?.experience || "Not available"}
                </StyledTableCell>
                <StyledTableCell>{item.designation}</StyledTableCell>
                <StyledTableCell>
                  {<Status active={item.status === "active"} />}
                </StyledTableCell>

                <StyledTableCell sx={{ textAlign: "center", padding: "08px" }}>
                  <Box display="flex">
                    <ViewButton
                      title="View"
                      onClick={handleOpenDetails(item.id)}
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
          count={results.length}
        />
      </TableWrapper>
    </div>
  );
};

export default List;
