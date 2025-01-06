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

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { RequirePermission } from "@/components/common/RequirePermission";
import { PERMISSIONS } from "@/app/permissions";

import { createClient } from "@/utils/supabase/server";
import SearchBar from "../common/SearchBar";

export default async function TransactionsTable({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const supabase = await createClient();

  const query = searchParams.q || "";

  let queryBuilder = supabase
    .from("transfers")
    .select("*")
    .order("created_at", { ascending: false });

  if (query) {
    queryBuilder = queryBuilder.or(
      `plate.ilike.%${query}%,type.ilike.%${query}%,client.ilike.%${query}%`
    );
  }

  const { data: transactions, error } = await queryBuilder;

  if (error) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography color="error">Failed to load transfers.</Typography>
      </Box>
    );
  }

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
              <TableCell>Plate</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Client</TableCell>
              <TableCell>Transmitter</TableCell>
              <TableCell>Service</TableCell>
              <TableCell>Created At</TableCell>
              <RequirePermission permission={PERMISSIONS.EDIT_TRANSFERS}>
                <TableCell align="center">Actions</TableCell>
              </RequirePermission>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions?.map((row) => (
              <TableRow key={row.id} hover>
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
                <RequirePermission permission={PERMISSIONS.EDIT_TRANSFERS}>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      href={`/transfers/edit/${row.id}`}
                    >
                      <EditIcon />
                    </IconButton>
                    <RequirePermission
                      permission={PERMISSIONS.DELETE_TRANSFERS}
                    >
                      <IconButton type="submit" color="error">
                        <DeleteIcon />
                      </IconButton>
                    </RequirePermission>
                  </TableCell>
                </RequirePermission>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
