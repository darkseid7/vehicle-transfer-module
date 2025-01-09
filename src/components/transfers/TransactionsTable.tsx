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
  Button,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";

import { RequirePermission } from "@/components/common/RequirePermission";
import { PERMISSIONS } from "@/app/permissions";

import { createClient } from "@/utils/supabase/server";
import SearchBar from "../common/SearchBar";
import Link from "next/link";
import DeleteButton from "./DeleteButton";

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

      <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 2 }}>
        <SearchBar />
        <RequirePermission permission={PERMISSIONS.CREATE_TRANSFERS}>
          <Link
            href="/transfer"
            style={{
              textDecoration: "none",
            }}
          >
            <Button
              color="primary"
              variant="contained"
              sx={{
                "&:visited": {
                  color: "inherit",
                },
              }}
            >
              New Transfer
            </Button>
          </Link>
        </RequirePermission>
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
                    <Link
                      href={`/transfer/${row.id}`}
                      style={{
                        textDecoration: "none",
                      }}
                    >
                      <IconButton
                        color="primary"
                        sx={{
                          "&:visited": {
                            color: "inherit",
                          },
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Link>
                    <RequirePermission
                      permission={PERMISSIONS.DELETE_TRANSFERS}
                    >
                      <DeleteButton id={row.id} />
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
