import React, {useEffect, useMemo} from 'react'
import { Box, Typography } from '@mui/material'
import {
  TableWrapper,
  TableHeadWrapper,
  TableBodyWrapper,
  PaginationWrapper,
  StyledTableRow,StyledTableCell,RowMultipleData,Status, Trained
} from "UI/table";
import { EditButton, ViewButton, ExportTableButton } from "UI/button";
import { useTeacherStore } from "SUPER/store";
import {TableRowsSkeleton} from 'UI/contentSkeleton'
import { useSearchParams } from 'react-router-dom';
import { exportTeacherDetails } from '../helper/template';
interface IList {
    handleOpen: (isEdit: boolean, id:number) => void;
}

const getSchoolNameData = (data: {name: string, code: string, udise: string, dist: string, block: string}) => {
  return [
    { key: "Name", value: data.name },
    { key: "Code", value: data.code },
    { key: "UDISE", value: data.udise },
    { key: "District", value: data.dist },
    { key: "Block", value: data.block },
  ]
}

const List = ({handleOpen}: IList) => {
  const teacherStore = useTeacherStore((state: any) => state)
  const {isLoading, getList, list, getAll, allList, allLoading, openEditModal} = teacherStore 

  const [searchParams, setSearchParams] = useSearchParams();
  const options =  [5, 10, 15]

  const page = parseInt(searchParams.get('page') || '1') 
  const rowsPerPage = parseInt(searchParams.get('rows') || options[0]+'')

  const exported  = useMemo(() => {
    const res = exportTeacherDetails(allList || [])
    return res;
  }, [allList])

  const getAllList = async() => {
    await getAll();
  }

  useEffect(() => {
    if(!openEditModal){
      getList(page, rowsPerPage)
    }
  }, [page, rowsPerPage, openEditModal])

  useEffect(() => {
    if(!openEditModal){
      getAllList()
    }
  }, [openEditModal])

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

  return (
    <Box>
        <ExportTableButton disabled={allLoading || isLoading} data={exported} filename="Teacher's Details" text="Export Teacher Details" />
        <TableWrapper>
            <TableHeadWrapper>
                <StyledTableCell>SNo.</StyledTableCell>
                <StyledTableCell>School</StyledTableCell>
                <StyledTableCell>Teacher Name</StyledTableCell>
                <StyledTableCell>Gender</StyledTableCell>
                <StyledTableCell>Mobile No.</StyledTableCell>
                <StyledTableCell>Subject</StyledTableCell>
                <StyledTableCell>ICT Trained</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell
                    sx={{ width: "120px", textAlign: "center", fontWeight: "bold" }}
                >
                    Action
                </StyledTableCell>
            </TableHeadWrapper>
            <TableBodyWrapper>
            {
              isLoading ? 
                <TableRowsSkeleton items={9}/>
              :
              list?.results?.length ?
                list?.results?.map((item: any, index: number) => {
                  return (
                    <StyledTableRow key={item.id}>
                        <StyledTableCell className="">{(index + 1) + (rowsPerPage * (page-1))}</StyledTableCell>
                        <StyledTableCell>
                            <RowMultipleData data={getSchoolNameData({name: item?.school?.school_name,
                               code: item?.school?.school_code,
                               block: item?.school?.block, dist: item?.school?.district, udise: item?.school?.udise_code})} highlightedKeys={["Name"]} />
                        </StyledTableCell>
                        <StyledTableCell>{item.name}</StyledTableCell>
                        <StyledTableCell>{item.gender}</StyledTableCell>
                        <StyledTableCell>{item.mobile}</StyledTableCell>
                        <StyledTableCell>{item.appointed_subject.join(', ')}</StyledTableCell>
                        <StyledTableCell><Trained trained={item.ict_trained === 'yes'} /></StyledTableCell>
                        <StyledTableCell> <Status active={item.status === 'active'} /></StyledTableCell>
                        <StyledTableCell sx={{ textAlign: "center", padding: "08px" }}>
                            <Box display='flex'>
                                <ViewButton title="View" onClick={() => handleOpen(false, item.id)} />
                                <EditButton title="Edit" onClick={() => handleOpen(true, item.id)}/>
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
                page={page-1}
                rowsPerPage={rowsPerPage}
                count={list.total_items}
            />
        </TableWrapper>
    </Box>
  )
}

export default List