import React from "react";
import { Grid, Typography } from "@mui/material";
import { Tour } from "@mui/icons-material";

const capitalizeFirstLetter = (inputString) => {
  return (
    inputString.charAt(0).toUpperCase() + inputString.slice(1).toLowerCase()
  );
};
const ListedOptionLayout = ({ data, boolFlag }) => {
  return (
    <Grid
      display={"flex"}
      flexDirection={"column"}
      width={"100%"}
      sx={{
        transition: "background-color 0.3s",
        padding: "3px",
        borderRadius: "8px",
        cursor: "pointer",
        color: "black",
      }}
    >
      <Grid
        display={"flex"}
        gap="10px"
        paddingX={"4px"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Grid>
          <Typography fontWeight={"600"}>
            {boolFlag
              ? `${capitalizeFirstLetter(data?.name)} Rs ${data?.price}`
              : "Freebies :- "}
          </Typography>
        </Grid>
        <Grid display={"flex"} justifyContent={"center"} alignItems={"center"} gap={'5px'}>
          <Typography
            fontWeight={"600"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            {data?.red}&nbsp;
            <Tour
              sx={{
                color: "#fa1942",
              }}
            />
          </Typography>

          <Typography
            fontWeight={"600"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            {data?.green}&nbsp;{" "}
            <Tour
              sx={{
                color: "#76de9a",
              }}
            />
          </Typography>
          <Typography
            fontWeight={"600"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            {data?.yellow}&nbsp;{" "}
            <Tour
              sx={{
                color: "#fac219",
              }}
            />
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default ListedOptionLayout;
