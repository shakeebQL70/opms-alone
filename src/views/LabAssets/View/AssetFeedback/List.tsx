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
import {useLabAssetStore} from 'SUPER/store'
import {TableRowsSkeleton} from 'UI/contentSkeleton'
import { exportLabAssetFeedback } from "./helper";

interface IList {
  handleOpen: (id: number, type: 'edit' | 'view') => void;
}

const List = ({ handleOpen }: IList) => {
  const store = useLabAssetStore((state: any) => state)
  const {isLoading, getList, list, getAll, allList, allLoading, openEditModal} = store

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
    const toExport = exportLabAssetFeedback(allList)

    return toExport
  }, [allList])


  return (
    <Box>
      <ExportTableButton
        data={exported}
        filename="Asset Feeback List"
        text="Export Asset Feedback List"
      />
      <TableWrapper>
        <TableHeadWrapper>
          <StyledTableCell>SNo.</StyledTableCell>
          <StyledTableCell>School Name</StyledTableCell>
          <StyledTableCell>Designation</StyledTableCell>
          <StyledTableCell>Name</StyledTableCell>
          <StyledTableCell>Asset Serial No</StyledTableCell>
          <StyledTableCell>Rating</StyledTableCell>
          <StyledTableCell>Comment/Feedback</StyledTableCell>
          <StyledTableCell
            sx={{ width: "120px", textAlign: "center", fontWeight: "bold" }}
          >
            Action
          </StyledTableCell>
        </TableHeadWrapper>
        <TableBodyWrapper>
            {
              isLoading ? 
                <TableRowsSkeleton items={8}/>
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
                        <StyledTableCell>{item?.designation}</StyledTableCell>
                        <StyledTableCell>{item?.name}</StyledTableCell>
                        <StyledTableCell>{item?.asset_serial_no}</StyledTableCell>
                        <StyledTableCell>{item?.rating}</StyledTableCell>
                        <StyledTableCell>{item?.comment}</StyledTableCell>
                        <StyledTableCell sx={{ textAlign: "center", padding: "08px" }}>
                            <Box display='flex'>
                                <ViewButton title="View" onClick={() => handleOpen(item.id, 'view')} />
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
  );
};

export default List;
