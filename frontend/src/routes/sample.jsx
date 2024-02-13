import { useParams } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import Grid from "@mui/material/Unstable_Grid2";
import Copyright from "../components/Copyright";
import useSamples from "../hooks/useSamples";

export default function Sample() {
  let { sampleId } = useParams();
  const { data } = useSamples(sampleId);
  console.log(data);
  return (
    <>
      <Box sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom>
          Sample {data?.sample_number}
          {data?.sub_sample} - Cruise {data?.ship} {data?.cruise}, Leg{" "}
          {data?.leg}, Dredge {data?.dredge}
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid xs={4}>
              <img src={data?.sample_photo?.file} width="100%" />
              <Box>
                <Button
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  onClick={() =>
                    window.open(data?.sample_photo.file, "_blank").focus()
                  }
                >
                  Download Photo
                </Button>
              </Box>
            </Grid>
            <Grid xs={8}>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                  <Grid xs={2} sx={{ fontWeight: "bold" }}>
                    Ship:
                  </Grid>
                  <Grid xs={10}>{data?.ship}</Grid>

                  <Grid xs={2} sx={{ fontWeight: "bold" }}>
                    Cruise:
                  </Grid>
                  <Grid xs={10}>{data?.cruise}</Grid>

                  <Grid xs={2} sx={{ fontWeight: "bold" }}>
                    Leg:
                  </Grid>
                  <Grid xs={10}>{data?.leg}</Grid>

                  <Grid xs={2} sx={{ fontWeight: "bold" }}>
                    Dredge:
                  </Grid>
                  <Grid xs={10}>{data?.dredge}</Grid>

                  <Grid xs={2} sx={{ fontWeight: "bold" }}>
                    Primary Lithology:
                  </Grid>
                  <Grid xs={10}>{data?.primary_lithology}</Grid>

                  <Grid xs={2} sx={{ fontWeight: "bold" }}>
                    Av. Grain Size:
                  </Grid>
                  <Grid xs={10}>{data?.av_grain_size}</Grid>

                  <Grid xs={2} sx={{ fontWeight: "bold" }}>
                    Texture:
                  </Grid>
                  <Grid xs={10}>{data?.texture}</Grid>

                  <Grid xs={2} sx={{ fontWeight: "bold" }}>
                    Contact:
                  </Grid>
                  <Grid xs={10}>{data?.contact}</Grid>

                  <Grid xs={2} sx={{ fontWeight: "bold" }}>
                    Glass:
                  </Grid>
                  <Grid xs={10}>{data?.glass}</Grid>

                  <Grid xs={2} sx={{ fontWeight: "bold" }}>
                    Palag:
                  </Grid>
                  <Grid xs={10}>{data?.palag}</Grid>

                  <Grid xs={2} sx={{ fontWeight: "bold" }}>
                    Comments:
                  </Grid>
                  <Grid xs={10}>{data?.comments}</Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box sx={{ p: 2, textAlign: "center" }}>
        <Copyright />
      </Box>
    </>
  );
}
