import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Banner from "../../assets/banner.png";

export default function PreLoader() {
  return (
    <div className="min-w-screen min-h-screenflex flex-col items-center mt-96  min-h-screen ">
      <img src={Banner} className="mb-8" width={150} />
      <Box sx={{ width: "20%" }}>
        <LinearProgress sx={{ backgroundColor: "#111827" }} disableShrink />
      </Box>
    </div>
  );
}
