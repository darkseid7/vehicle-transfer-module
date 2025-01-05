"use client";

import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Typography,
  IconButton,
  Box,
  Container,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import SearchBar from "../common/SearchBar";

export default function TransactionsTable() {
  const transactions = [
    {
      id: 1,
      plate: "2647KLR",
      type: "Venta",
      client: "31002483T",
      transmitter: "30482746L",
      service: 900,
      created_at: "2024-12-17T18:00:00",
    },
    {
      id: 2,
      plate: "9821BHF",
      type: "Cesión",
      client: "52018492F",
      transmitter: "47012845N",
      service: 450,
      created_at: "2024-12-16T10:30:00",
    },
  ];

  const handleView = (id: number) => {
    console.log("hadle view", id);
  };

  const handleEdit = (id: number) => {
    console.log("handle Edit", id);
  };

  const handleDelete = (id: number) => {
    console.log("Handle delete:", id);
  };

  return (
    <Container>
      <Box sx={{ my: 2 }}>
        <Typography variant="h4" fontWeight={800} sx={{ p: 2 }}>
          Transfers List
        </Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <SearchBar />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Plate</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Client</TableCell>
              <TableCell>Transmitter</TableCell>
              <TableCell>Service</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((row) => (
              <TableRow key={row.id} hover sx={{ cursor: "pointer" }}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.plate}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.client}</TableCell>
                <TableCell>{row.transmitter}</TableCell>
                <TableCell>{row.service}</TableCell>
                <TableCell>
                  {new Date(row.created_at).toLocaleString("es-ES", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => handleView(row.id)}
                  >
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton
                    color="primary"
                    onClick={() => handleEdit(row.id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(row.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
