/* eslint-disable react/prop-types */
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

export default function SearchForm({
  cruise,
  setCruise,
  lithology,
  setLithology,
  dredge,
  setDredge,
  texture,
  setTexture,
}) {
  const { data: cruises } = useSWR(apiCruisesUrl, fetcher);
  const { data: lithologies } = useSWR(apiLithologyUrl, fetcher);
  const { data: textures } = useSWR(apiTexturesUrl, fetcher);

  console.log(cruises);

  const handleCruiseChange = (event) => {
    setCruise(event.target.value);
    if (!event.target.value) {
      setDredge(event.target.value);
    }
  };

  const handleLithologyChange = (event) => {
    setLithology(event.target.value);
  };

  const handleDredgeChange = (event) => {
    setDredge(event.target.value);
  };

  const handleTextureChange = (event) => {
    setTexture(event.target.value);
  };

  return (
    <Box sx={{ flexGrow: 1, my: 2 }}>
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
                {cruises?.map((item, index) => (
                  <MenuItem key={index} value={item.id}>
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
        <Grid xs={6}>
          <Box>
            <FormControl fullWidth>
              <InputLabel id="dredge-label">Dredge Number</InputLabel>
              <Select
                labelId="dredge-label"
                id="dredge-select"
                value={dredge}
                label="Dredge Numbery"
                onChange={handleDredgeChange}
                disabled={!cruise}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid xs={6}>
          <Box>
            <FormControl fullWidth>
              <InputLabel id="textures-label">Textures</InputLabel>
              <Select
                labelId="textures-label"
                id="textures-select"
                value={texture}
                label="Textures"
                onChange={handleTextureChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {textures?.map((item, index) => (
                  <MenuItem key={index} value={item.texture}>
                    {item.texture}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
