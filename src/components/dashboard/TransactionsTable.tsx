"use client";

import React, { useState, useEffect, useCallback } from "react";
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
import CircularProgress from "@mui/material/CircularProgress";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { RequirePermission } from "@/components/common/RequirePermission";
import { PERMISSIONS } from "@/app/permissions";

import { createClient } from "@/utils/supabase/client";
import SearchBar from "../common/SearchBar";
import Link from "next/link";
import DeleteButton from "./DeleteButton";

import PlateFilter from "./PlateFilter";
import TypeFilter from "./TypeFilter";
import { useSearchParams } from "next/navigation";

interface Transaction {
  id: string;
  plate: string;
  type: string;
  client: string;
  transmitter: string;
  service: string;
  created_at: string;
}

export default function TransactionsTable() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({ plate: "", type: "" });
  const [plates, setPlates] = useState<string[]>([]);
  const [types] = useState(["venta", "cesion"]);

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  const fetchData = useCallback(async () => {
    setLoading(true);
    const supabase = createClient();

    const { data, error } = await supabase
      .from("transfers")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to fetch transfers:", error);
    } else {
      setTransactions(data || []);
      setPlates(Array.from(new Set(data?.map((t) => t.plate))));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredTransactions = transactions.filter((t) => {
    const matchesPlate = filters.plate ? t.plate === filters.plate : true;
    const matchesType = filters.type ? t.type === filters.type : true;
    const matchesSearch = searchQuery
      ? Object.values(t).some((field) =>
          String(field).toLowerCase().includes(searchQuery.toLowerCase())
        )
      : true;
    return matchesPlate && matchesType && matchesSearch;
  });

  const handleDeleteSuccess = () => {
    fetchData();
  };

  return (
    <Container>
      <Box sx={{ my: 2 }}>
        <Typography variant="h4" fontWeight={800} sx={{ p: 2 }}>
          Transfers List
        </Typography>
      </Box>

      <Box
        sx={{
          mb: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <SearchBar />

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", gap: 2 }}>
            <PlateFilter
              plates={plates}
              selectedPlate={filters.plate}
              onChange={(value) => handleFilterChange("plate", value)}
            />
            <TypeFilter
              types={types}
              selectedType={filters.type}
              onChange={(value) => handleFilterChange("type", value)}
            />
          </Box>

          <RequirePermission permission={PERMISSIONS.CREATE_TRANSFERS}>
            <Link href="/transfer" style={{ textDecoration: "none" }}>
              <Button
                color="primary"
                variant="contained"
                startIcon={<AddCircleOutlineIcon />}
                sx={{
                  height: "56px",
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
      </Box>

      {loading ? (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <CircularProgress size={40} color="primary" />
        </Box>
      ) : filteredTransactions.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
          No transfers found.
        </Typography>
      ) : (
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
              {filteredTransactions.map((row) => (
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
                        style={{ textDecoration: "none" }}
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
                        <DeleteButton
                          id={Number(row.id)}
                          onDeleteSuccess={handleDeleteSuccess}
                        />
                      </RequirePermission>
                    </TableCell>
                  </RequirePermission>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}
