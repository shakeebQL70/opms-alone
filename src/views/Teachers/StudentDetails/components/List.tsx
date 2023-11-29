import React, {useEffect, useMemo} from "react";
import { Box, Typography } from "@mui/material";
import {
  TableWrapper,
  TableHeadWrapper,
  TableBodyWrapper,
  PaginationWrapper,
  StyledTableRow,
  StyledTableCell,
  RowMultipleData,
} from "UI/table";
import { EditButton, ViewButton, ExportTableButton } from "UI/button";
import { useSearchParams } from "react-router-dom";
import {useStudentStore} from 'SUPER/store'
import {TableRowsSkeleton} from 'UI/contentSkeleton'
import { exportStudentDetails } from "../helper";

const List = () => {
  const studentStore = useStudentStore((state: any) => state)
  const {isLoading, getDetailsList:getList, detailsList: list, getAllDetails: getAll, allDetailsList: allList} = studentStore

  const [searchParams, setSearchParams] = useSearchParams();
  const options =  [5, 10, 15]

  const page = parseInt(searchParams.get('page') || '1') 
  const rowsPerPage = parseInt(searchParams.get('rows') || options[0]+'')

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setSearchParams({ page: newPage+1+'', rows: rowsPerPage+''  });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const perPage = parseInt(event.target.value, 10)
    setSearchParams({ page: '1', rows: perPage+''  });
  };

  useEffect(() => {
    getList()
  }, [page, rowsPerPage])

  useEffect(() => {
    getAll()
  }, [])

  const exported = useMemo(() => {
    const toExport = exportStudentDetails(allList) || []

    return toExport
  }, [allList])


  return (
    <Box>
      <ExportTableButton
        data={exported}
        filename="Student Details"
        text="Export Student Details"
      />
      <TableWrapper>
        <TableHeadWrapper>
          <StyledTableCell>SNo.</StyledTableCell>
          <StyledTableCell>Session</StyledTableCell>
          <StyledTableCell>Student Name</StyledTableCell>
          <StyledTableCell>Quarter</StyledTableCell>
          <StyledTableCell>Class</StyledTableCell>
          <StyledTableCell>Boys</StyledTableCell>
          <StyledTableCell>Girls</StyledTableCell>
          <StyledTableCell>Total Students</StyledTableCell>
        </TableHeadWrapper>
        <TableBodyWrapper>
            {
              isLoading ? 
                <TableRowsSkeleton items={8}/>
              :
              list?.results?.length ?
                list?.results?.map((item: any, index: number) => {
                  const data = [
                    { key: "Name", value: item?.school_name },
                    { key: "School Code", value: item?.school_code },
                    { key: "UDISE Code", value: item?.udise_code },
                    { key: "District", value: item?.district },
                    { key: "Block", value: item?.block },
                  ];
                  return (
                    <StyledTableRow key={index}>
                        <StyledTableCell className="">{index + 1}</StyledTableCell>
                        <StyledTableCell>{item?.session}</StyledTableCell>
                        <StyledTableCell>
                            <RowMultipleData data={data} highlightedKeys={["Name"]} />
                        </StyledTableCell>
                        <StyledTableCell>{item?.quarter}</StyledTableCell>
                        <StyledTableCell>{item?.class_section}</StyledTableCell>
                        <StyledTableCell>{item?.boys}</StyledTableCell>
                        <StyledTableCell>{item?.girls}</StyledTableCell>
                        <StyledTableCell>{item?.total_students}</StyledTableCell>
                        
                    </StyledTableRow>
                  );
                }) : <Box>
                <Typography textAlign='center' width='100%'> No data available </Typography>
              </Box>
            }
        </TableBodyWrapper>
        <PaginationWrapper
          rows={options}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          page={page - 1}
          rowsPerPage={rowsPerPage}
          count={list.total_items}
        />
      </TableWrapper>
    </Box>
  );
};

export default List;
