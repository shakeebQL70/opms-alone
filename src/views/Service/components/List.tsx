import React, { useState } from "react"
import { Box, Typography } from '@mui/material'
import {
    TableWrapper,
    TableHeadWrapper,
    TableBodyWrapper,
    PaginationWrapper,
    StyledTableCell, StyledTableRow
} from "UI/table";
import { ViewButton } from "UI/button"
import { ExportTableButton } from "UI/button";
import { useSearchParams } from "react-router-dom";
import View from "./View";


const tableHeading = ["#", "Token No.", "School Name", "Component", "Problem", "Status", "Open Date", "Age", "Action"];

const tableData = [{
    tokenNo: 317,
    schoolName: {
        name: " UPG RAJKIYEKRIT MS KEWAL",
        schoolCode: "BCCL-JH-ICT3-PAL-420",
        upiseCode: "20021007001",
        district: "PALAMU",
        block: "CHAINPUR",
    },
    component: "Desktop",
    problem: "Other",
    status: "open",
    openDate: "16-10-2023",
    age: "+30days",
}
]

const List = () => {
    const [id, setId] = useState<number>(0)
    const [searchParams, setSearchParams] = useSearchParams();
    const options = [5, 10, 15];

    const page = parseInt(searchParams.get('page') || '0')
    const rowsPerPage = parseInt(searchParams.get('rows') || options[0] + '')

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setSearchParams({ page: newPage + 1 + '', rows: rowsPerPage + '' })
    }

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const perPage = parseInt(event.target.value, 10)
        setSearchParams({ page: '1', rows: perPage + '' });
    };

    const handleClose = () => {
        setId(0);
    }

    const handleView = (id: number) => {
        setId(id);

    }


    return (
        <Box>
            <Box my={3}>
                <ExportTableButton data={tableData} filename="Service Desk" text="Export" />
                <TableWrapper>
                    <TableHeadWrapper>
                        {tableHeading.map(item => {
                            return (
                                <StyledTableCell >{item}</StyledTableCell>)
                        })}
                    </TableHeadWrapper>
                    <TableBodyWrapper>
                        {
                            tableData.map((item: any, index: number) => {
                                return (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell>{index + 1}</StyledTableCell>
                                        <StyledTableCell>{item.tokenNo}</StyledTableCell>
                                        <StyledTableCell>{item.schoolName.name}</StyledTableCell>
                                        <StyledTableCell>{item.component}</StyledTableCell>
                                        <StyledTableCell>{item.problem}</StyledTableCell>
                                        <StyledTableCell>{item.status}</StyledTableCell>
                                        <StyledTableCell>{item.openDate}</StyledTableCell>
                                        <StyledTableCell>{item.age}</StyledTableCell>
                                        <StyledTableCell>
                                            <Box>
                                                <ViewButton title="View" onClick={() => handleView(item.tokenNo)} />
                                            </Box>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                )
                            })
                        }
                    </TableBodyWrapper>
                    <PaginationWrapper
                        rows={options}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        count={tableData.length}
                    />
                </TableWrapper>
            </Box>
            {id ? <View handleClose={handleClose} /> : null}

        </Box>
    );
}

export default List;