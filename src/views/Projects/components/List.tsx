import React, { useState, useEffect, useMemo } from "react";
import { Box, Typography, Skeleton } from "@mui/material";
import {
  TableWrapper,
  TableHeadWrapper,
  TableBodyWrapper,
  StyledTableCell,
  StyledTableRow,
} from "UI/table";
import { EditButton, ViewButton, ExportTableButton } from "UI/button";
import { TableRowsSkeleton } from "UI/contentSkeleton";
import View from "./View";
// import { useProjectStore } from "SUPER/store";
import EditDetails from "./EditDetails";

const ProjectList = () => {
  // const projects:any = useProjectStore((state: any) => state)

  const projects: any = {};
  const {
    data,
    getData: getProject,
    isLoading,
    openEditModal: edit,
    setOpenEditModal: setEdit,
  } = projects || {};
  const [id, setId] = useState<number>(0);

  const exported = useMemo(() => {
    const toExport = data?.map((item: any) => ({
      "Project Name": item.name,
      "Client Name": item.client_name,
      "Department Name": item.department,
      "Project In State": item.state,
    }));

    return toExport;
  }, [data]);

  useEffect(() => {
    if (!edit) {
      setId(0);
      getProject();
    }
  }, [edit]);

  const handleClose = () => {
    setId(0);
    setEdit(false);
  };

  const handleView = (id: number) => {
    setId(id);
  };
  const handleEdit = (id: number) => {
    setEdit(true);
    setId(id);
  };

  return (
    <Box>
      <Typography variant="h6" component="h1" fontWeight="bold">
        {" "}
        Project List{" "}
      </Typography>

      <Box my={3}>
        <ExportTableButton
          disabled={isLoading}
          data={exported}
          filename="Projects"
          text="Export Projects"
        />
        <TableWrapper>
          <TableHeadWrapper>
            <StyledTableCell>SNo.</StyledTableCell>
            <StyledTableCell>Project Name</StyledTableCell>
            <StyledTableCell>Client Name</StyledTableCell>
            <StyledTableCell>Department Name</StyledTableCell>
            <StyledTableCell>Project In State Name</StyledTableCell>
            <StyledTableCell>Actions</StyledTableCell>
          </TableHeadWrapper>
          <TableBodyWrapper>
            {isLoading ? (
              <TableRowsSkeleton items={6} />
            ) : data.length ? (
              data?.map((item: any, index: number) => (
                <StyledTableRow key={item.id}>
                  <StyledTableCell> {index + 1} </StyledTableCell>
                  <StyledTableCell> {item.name} </StyledTableCell>
                  <StyledTableCell> {item.client_name} </StyledTableCell>
                  <StyledTableCell> {item.department_name} </StyledTableCell>
                  <StyledTableCell> {item.state} </StyledTableCell>
                  <StyledTableCell>
                    <Box display="flex" gap="10px">
                      <ViewButton
                        title="View"
                        onClick={() => handleView(item.id)}
                      />
                      <EditButton
                        title="Edit"
                        onClick={() => handleEdit(item.id)}
                      />
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <Box>
                <Typography textAlign="center" width="100%">
                  {" "}
                  No data available{" "}
                </Typography>
              </Box>
            )}
          </TableBodyWrapper>
        </TableWrapper>
      </Box>

      {id ? (
        edit ? (
          <EditDetails handleClose={handleClose} id={id} />
        ) : (
          <View handleClose={handleClose} id={id} />
        )
      ) : null}
    </Box>
  );
};

export default ProjectList;
