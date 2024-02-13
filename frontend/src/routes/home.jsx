import { Box, Divider, Typography } from "@mui/material";
import Copyright from "../components/Copyright";
import SamplesDataGrid from "../components/SamplesDataGrid";

export default function Home() {
  return (
    <>
      <Box sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom>
          Dredge Rock Sample Photos
        </Typography>

        <Typography variant="body2" gutterBottom>
          Intro text here. Lorem ipsum dolor sit amet, consectetur adipiscing
          elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
          laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
          in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Typography>

        <Divider sx={{ my: 2 }} />

        <SamplesDataGrid />
      </Box>
      <Box sx={{ p: 2, textAlign: "center" }}>
        <Copyright />
      </Box>
    </>
  );
}
