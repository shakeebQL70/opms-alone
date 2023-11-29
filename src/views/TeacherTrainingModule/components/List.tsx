import React, { useEffect } from "react"
import { Box, Typography } from '@mui/material'
import {
    TableWrapper,
    TableHeadWrapper,
    TableBodyWrapper,
    PaginationWrapper,
    StyledTableCell, StyledTableRow, RowMultipleData
} from "UI/table";
import { ViewButton, EditButton } from "UI/button"
import { ExportTableButton } from "UI/button";
import { useSearchParams } from "react-router-dom";
import {useTeacherTrainingStore} from 'SUPER/store'
import {TableRowsSkeleton} from 'UI/contentSkeleton'
import { formatDateYYYYMMDD } from "../../../utils";

const tableHeading = [
    { id: 1, title: '#' },
    { id: 2, title: 'School Name' },
    { id: 3, title: 'Teacher Name' },
    { id: 4, title: 'Batch' },
    { id: 5, title: 'Training Subject' },
    { id: 6, title: 'Center' },
    { id: 7, title: 'District' },
    { id: 8, title: 'Type of Residential' },
    { id: 9, title: 'Duration' },
    { id: 10, title: 'Trainer Name' },
    { id: 16, title: 'Action' },
];

const tableData = [{}]

const getSchoolNameData = (data: {name: string, code: string, udise: string, dist: string, block: string}) => {
    return [
      { key: "Name", value: data.name },
      { key: "Code", value: data.code },
      { key: "UDISE", value: data.udise },
      { key: "District", value: data.dist },
      { key: "Block", value: data.block },
    ]
  }
interface IList {
    handleOpen: (id:number, type: 'edit' | 'view') => void
}

const List = ({handleOpen}: IList) => {
    const store = useTeacherTrainingStore((state: any) => state)
  const {isLoading, getList, list, getAll, openEditModal} = store

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

//   const exported = useMemo(() => {
//     const toExport = exportLabAssetDetails(allList)

//     return toExport
//   }, [allList])


    return (
        <Box>
            <Box my={3}>
                <ExportTableButton data={tableData} filename="Teacher Training" text="Export Training Details" />
                <TableWrapper>
                    <TableHeadWrapper>
                        {tableHeading.map(item => {
                            return (
                                <StyledTableCell key={item.id} >{item.title}</StyledTableCell>)
                        })}
                    </TableHeadWrapper>
                    <TableBodyWrapper>
                        {
                            isLoading ? 
                                <TableRowsSkeleton items={11}/>
                            :
                            list?.results?.length ?
                                list?.results?.map((item: any, index: number) => {
                                return (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell>{(index + 1) + (rowsPerPage * (page-1))}</StyledTableCell>
                                        <RowMultipleData data={getSchoolNameData({name: item?.school?.school_name,
                                            code: item?.school?.school_code,
                                            block: item?.school?.block, dist: item?.school?.district, udise: item?.school?.udise_code})} highlightedKeys={["Name"]} />
                                        <StyledTableCell>{item.teacher_name}</StyledTableCell>
                                        <StyledTableCell>{item.training_branch}</StyledTableCell>
                                        <StyledTableCell>{item.training_subject}</StyledTableCell>
                                        <StyledTableCell>{item.training_center}</StyledTableCell>
                                        <StyledTableCell>{item.district}</StyledTableCell>
                                        <StyledTableCell>{item.type_of_residential}</StyledTableCell>
                                        <StyledTableCell>{item.duration}</StyledTableCell>
                                        <StyledTableCell>{item.trainer_name}</StyledTableCell>
                                        <StyledTableCell>
                                            <Box>
                                                <ViewButton title="View" onClick={() => handleOpen(item.id, 'view')} />
                                                <EditButton title="Edit" onClick={() => handleOpen(item.id, 'edit')} />
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
        </Box>
    );
}

export default List;