import React from "react";
import {
  PaperWrapper,
  TableWrapper,
  TableHeadWrapper,
  TableBodyWrapper,
  TableRowWrapper,
  TableCellWrapper,
} from "UI/table";

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <PaperWrapper>
        <TableWrapper>
          <TableHeadWrapper>
            <TableCellWrapper>Title</TableCellWrapper>
            <TableCellWrapper>Body</TableCellWrapper>
            <TableCellWrapper>Action</TableCellWrapper>
          </TableHeadWrapper>
          <TableBodyWrapper>
            {[{ id: 1, title: "Dog", body: "Hi my name is Don" }]?.map(
              (item: any) => {
                return (
                  <TableRowWrapper key={item.id}>
                    <TableCellWrapper>{item.title}</TableCellWrapper>
                    <TableCellWrapper>{item.body}</TableCellWrapper>
                    <TableCellWrapper>sdd</TableCellWrapper>
                  </TableRowWrapper>
                );
              }
            )}
          </TableBodyWrapper>
        </TableWrapper>
        {/* <PaginationWrapper rows={data} /> */}
      </PaperWrapper>
    </div>
  );
};

export default Dashboard;
