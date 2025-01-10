"use client";

import React from "react";
import { FormControl, Select, MenuItem } from "@mui/material";

interface TypeFilterProps {
  types: string[];
  selectedType: string;
  onChange: (value: string) => void;
}

export default function TypeFilter({
  types,
  selectedType,
  onChange,
}: TypeFilterProps) {
  return (
    <FormControl sx={{ minWidth: 150 }}>
      <Select
        displayEmpty
        value={selectedType}
        onChange={(e) => onChange(e.target.value)}
        renderValue={(selected) => {
          if (!selected) {
            return <span style={{ color: "#888" }}>Type</span>;
          }
          return selected;
        }}
      >
        <MenuItem value="">
          <em>All</em>
        </MenuItem>
        {types.map((type) => (
          <MenuItem key={type} value={type}>
            {type}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
