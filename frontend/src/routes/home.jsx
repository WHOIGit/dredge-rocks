import { Box, Typography } from "@mui/material";
import Copyright from "../components/Copyright";
import SamplesDataGrid from "../components/SamplesDataGrid";

export default function Home() {
  return (
    <>
      <Box sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom>
          About Dredge Rocks
        </Typography>

        <Typography variant="body1" gutterBottom>
          Home text
        </Typography>

        <SamplesDataGrid />
      </Box>
      <Box sx={{ p: 2, textAlign: "center" }}>
        <Copyright />
      </Box>
    </>
  );
}
