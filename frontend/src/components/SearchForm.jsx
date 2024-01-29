import { useState, useEffect } from "react";
import useSWR from "swr";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { fetcher, API_BASE } from "../services/api";

const apiUrl = `${API_BASE}/api/cruises/`;

export default function SearchForm() {
  const { data: cruises, error } = useSWR(apiUrl, fetcher);
  const [cruise, setCruise] = useState("");
  console.log(cruises);
  const handleChange = (event) => {
    setCruise(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="cruise-label">Cruise</InputLabel>
        <Select
          labelId="cruise-label"
          id="cruise-select"
          value={cruise}
          label="Cruise"
          onChange={handleChange}
        >
          {cruises?.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.ship} - {item.cruise_number}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
