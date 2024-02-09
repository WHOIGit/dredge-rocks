import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import useSamples from "../hooks/useSamples";
import SearchForm from "./SearchForm";

const columns = [
  { field: "ship", headerName: "Ship", width: 100 },
  { field: "cruise", headerName: "Cruise", width: 100 },
  { field: "leg", headerName: "Leg", width: 50 },
  { field: "dredge", headerName: "Dredge", width: 50 },
  {
    field: "sample_number",
    headerName: "Sample Number",
    width: 50,
    valueGetter: (params) =>
      `${params.row.sample_number || ""} ${params.row.sub_sample || ""}`,
  },
  { field: "primary_lithology", headerName: "Primary Lithology", flex: 0.75 },
  { field: "av_grain_size", headerName: "Ave. Grain Size", flex: 0.75 },
  { field: "texture", headerName: "Texture", flex: 0.75 },
  { field: "contact", headerName: "Contact", flex: 0.75 },
  { field: "glass", headerName: "Glass (mm)", flex: 0.75 },
  { field: "palag", headerName: "Palag. (mm)", flex: 0.75 },
  {
    field: "photo",
    headerName: "Photo",
    flex: 0.75,
    renderCell: ({ row }) => {
      return (
        <Box
          component="img"
          sx={{
            height: 75,
            width: 100,
          }}
          src={row.sample_photo.thumbnail}
        />
      );
    },
  },
];

export default function SamplesDataGrid() {
  const [rows, setRows] = useState(null);
  const { data, isLoading, isError } = useSamples();
  const [cruise, setCruise] = useState("");
  const [dredge, setDredge] = useState("");
  const [lithology, setLithology] = useState("");
  const [texture, setTexture] = useState("");
  console.log(data);

  useEffect(() => {
    // filter results by form inputs
    if (data) {
      // check if any filters are set
      if (cruise || lithology || dredge || texture) {
        console.log("filter set");
        const newRows = data.results.filter((item) => {
          let cruiseCheck = true;
          let lithologyCheck = true;
          let dredgeCheck = true;
          let textureCheck = true;

          if (cruise) {
            cruiseCheck = item.cruise_id === cruise;
          }

          if (lithology) {
            lithologyCheck = item.primary_lithology === lithology;
          }

          if (dredge) {
            dredgeCheck = item.dredge === dredge;
          }

          if (texture) {
            textureCheck = item.texture === texture;
          }

          return cruiseCheck && lithologyCheck && dredgeCheck && textureCheck;
        });

        console.log("NEW DATA", newRows);
        setRows(newRows);
      } else {
        setRows(data.results);
      }
    }
  }, [data, cruise, lithology, dredge, texture]);

  if (isLoading || isError || !data || !rows) return null;

  return (
    <>
      <Typography variant="body1">Filter Samples</Typography>
      <Box sx={{ width: "50%" }}>
        <SearchForm
          cruise={cruise}
          setCruise={setCruise}
          lithology={lithology}
          setLithology={setLithology}
          dredge={dredge}
          setDredge={setDredge}
          texture={texture}
          setTexture={setTexture}
        />
      </Box>
      <Box>
        <DataGrid
          rows={rows}
          columns={columns}
          rowHeight={75}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 20,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </>
  );
}
