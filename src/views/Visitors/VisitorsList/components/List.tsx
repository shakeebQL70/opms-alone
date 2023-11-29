import React, {useEffect, useMemo} from 'react'
import { Box, Typography } from '@mui/material'
import {
  TableWrapper,
  TableHeadWrapper,
  TableBodyWrapper,
  PaginationWrapper,
  StyledTableRow,StyledTableCell,RowMultipleData
} from "UI/table";
import { EditButton, ViewButton, ExportTableButton } from "UI/button";
import {useVisitorStore} from 'SUPER/store' 
import { useSearchParams } from 'react-router-dom';
import {TableRowsSkeleton} from 'UI/contentSkeleton'
import {
  formatDateYYYYMMDD,
} from "../../../../utils";
import { exportVisitorDetails } from '../helper';
interface IList {
    handleOpen: (id: number, type: 'edit' | 'view') => void
}

const List = ({handleOpen}: IList) => {
  const visitorStore = useVisitorStore((state: any) => state)
  const {isLoading, getList, list, getAll, allList, allLoading, openEditModal} = visitorStore

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
    if(!openEditModal) getList()
  }, [page, rowsPerPage, openEditModal])

  useEffect(() => {
    if(!openEditModal) getAll()
  }, [openEditModal])

  const exported = useMemo(() => {
    const toExport = exportVisitorDetails(allList)

    return toExport
  }, [allList])

  return (
    <Box>
        <ExportTableButton data={exported} filename="Visitors Details" text="Export Visitors Details" />
        <TableWrapper>
            <TableHeadWrapper>
                <StyledTableCell>SNo.</StyledTableCell>
                <StyledTableCell>School Name</StyledTableCell>
                <StyledTableCell>Visitor Name</StyledTableCell>
                <StyledTableCell>Date</StyledTableCell>
                <StyledTableCell>Type</StyledTableCell>
                <StyledTableCell>Designation</StyledTableCell>
                <StyledTableCell>Purpose</StyledTableCell>
                <StyledTableCell>Feedback</StyledTableCell>
                <StyledTableCell>Issues</StyledTableCell>
                <StyledTableCell
                    sx={{ width: "120px", textAlign: "center", fontWeight: "bold" }}
                >
                    Action
                </StyledTableCell>
            </TableHeadWrapper>
            <TableBodyWrapper>
            {
              isLoading ? 
                <TableRowsSkeleton items={10}/>
              :
              list?.results?.length ?
                list?.results?.map((item: any, index: number) => {
                  const data = [
                    { key: "Name", value: item?.school?.school_name },
                    { key: "School Code", value: item?.school?.school_code },
                    { key: "UDISE Code", value: item?.school?.udise_code },
                    { key: "District", value: item?.school?.district },
                    { key: "Block", value: item?.school?.block },
                  ];
                  return (
                    <StyledTableRow key={index}>
                        <StyledTableCell className="">{(index + 1) + (rowsPerPage * (page-1))}</StyledTableCell>
                        <StyledTableCell>
                            <RowMultipleData data={data} highlightedKeys={["Name"]} />
                        </StyledTableCell>
                        <StyledTableCell>{item.name}</StyledTableCell>
                        <StyledTableCell>{formatDateYYYYMMDD(item.date)}</StyledTableCell>
                        <StyledTableCell>{item.type}</StyledTableCell>
                        <StyledTableCell>{item.designation}</StyledTableCell>
                        <StyledTableCell>{item.purpose}</StyledTableCell>
                        <StyledTableCell>{item.feedback}</StyledTableCell>
                        <StyledTableCell>{item.any_issue}</StyledTableCell>
                        <StyledTableCell sx={{ textAlign: "center", padding: "08px" }}>
                            <Box display='flex'>
                                <ViewButton title="View" onClick={() => handleOpen(item.id, 'view')} />
                                <EditButton title="Edit" onClick={() => handleOpen(item.id, 'edit')}/>
                            </Box>
                        </StyledTableCell>
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
  )
}

export default List