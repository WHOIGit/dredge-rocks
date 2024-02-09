import { useState, useEffect } from "react";
import useSWR from "swr";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Unstable_Grid2";
import { fetcher, API_BASE } from "../services/api";

const apiCruisesUrl = `${API_BASE}/api/cruises/`;
const apiLithologyUrl = `${API_BASE}/api/lithologies/`;
const apiTexturesUrl = `${API_BASE}/api/textures/`;

export default function SearchForm() {
  const { data: cruises } = useSWR(apiCruisesUrl, fetcher);
  const { data: lithologies } = useSWR(apiLithologyUrl, fetcher);
  const [cruise, setCruise] = useState("");
  const [lithology, setLithology] = useState("");
  console.log(cruises);

  const handleCruiseChange = (event) => {
    setCruise(event.target.value);
  };

  const handleLithologyChange = (event) => {
    setLithology(event.target.value);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid xs={6}>
          <Box>
            <FormControl fullWidth>
              <InputLabel id="cruise-label">Cruise</InputLabel>
              <Select
                labelId="cruise-label"
                id="cruise-select"
                value={cruise}
                label="Cruise"
                onChange={handleCruiseChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {cruises?.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.ship} - {item.cruise_number}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid xs={6}>
          <Box>
            <FormControl fullWidth>
              <InputLabel id="lithologies-label">Primary Lithology</InputLabel>
              <Select
                labelId="lithologies-label"
                id="lithologies-select"
                value={lithology}
                label="Primary Lithology"
                onChange={handleLithologyChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {lithologies?.map((item, index) => (
                  <MenuItem key={index} value={item.primary_lithology}>
                    {item.primary_lithology}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid xs={4}>
          <Box>xs=4</Box>
        </Grid>
        <Grid xs={8}>
          <Box>xs=8</Box>
        </Grid>
      </Grid>
    </Box>
  );
}
