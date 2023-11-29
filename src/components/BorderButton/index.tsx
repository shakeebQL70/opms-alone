import { Box, IconButton } from "@mui/material";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import React from "react";
interface IBB {
  disabled: boolean;
  handleClick: (...params: any[]) => void;
}
const BorderButton = (props: IBB) => {
  const { disabled, handleClick } = props;
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "end",
        borderColor: "rgba(0,0,0,0.23)",
        borderWidth: "2px",
        borderRadius: "5px",
        borderStyle: "solid",
        // zIndex: -1,
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          marginTop: "-20px",
          marginRight: "10px",
        }}
      >
        <IconButton color="error" onClick={handleClick} disabled={disabled}>
          <RemoveCircleRoundedIcon />
        </IconButton>
      </Box>
    </div>
  );
};

export default BorderButton;
