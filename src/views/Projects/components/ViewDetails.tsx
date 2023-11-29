import React from 'react'
import { Box } from '@mui/material'
import {
    TableWrapper,
    TableBodyWrapper,
    StyledTableCell,StyledTableRow
} from "UI/table";

const ViewDetails = ({data} : {data: {title: string, value: string|number}[]}) => {
    return (
        <Box>
            <TableWrapper>
                <TableBodyWrapper>
                    {
                        data?.map((detail, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell>{detail.title}</StyledTableCell>
                                <StyledTableCell>{detail.value}</StyledTableCell>
                            </StyledTableRow>
                        ))
                    }
                </TableBodyWrapper>
            </TableWrapper>
        </Box>
    )
}

export default ViewDetails