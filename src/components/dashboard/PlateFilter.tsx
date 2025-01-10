"use client";

import React from "react";
import { FormControl, Select, MenuItem } from "@mui/material";

interface PlateFilterProps {
  plates: string[];
  selectedPlate: string;
  onChange: (value: string) => void;
}

export default function PlateFilter({
  plates,
  selectedPlate,
  onChange,
}: PlateFilterProps) {
  return (
    <FormControl sx={{ minWidth: 150 }}>
      <Select
        displayEmpty
        value={selectedPlate}
        onChange={(e) => onChange(e.target.value)}
        renderValue={(selected) => {
          if (!selected) {
            return <span style={{ color: "#888" }}>Plates</span>;
          }
          return selected;
        }}
      >
        <MenuItem value="">
          <em>All</em>
        </MenuItem>
        {plates.map((plate) => (
          <MenuItem key={plate} value={plate}>
            {plate}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
