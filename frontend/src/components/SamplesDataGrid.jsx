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
  const [rows, setRows] = useState([]);
  const { data, isLoading, isError } = useSamples();
  console.log(data);

  useEffect(() => {
    setRows(data);
  }, [data]);

  if (isLoading || isError || !data) return null;

  return (
    <>
      <Box>
        <SearchForm />
      </Box>
      <Box>
        <DataGrid
          rows={data}
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
