"use client";

import React, { useState, useTransition } from "react";
import {
  Button,
  IconButton,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { deleteTransfer } from "@/app/(dashboard)/dashboard/actions";

interface DeleteButtonProps {
  id: number;
}

export default function DeleteButton({ id }: DeleteButtonProps) {
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [isPending, startTransition] = useTransition();

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleSnackbarClose = () => setSnackbarOpen(false);

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteTransfer(id);

      if (result.error) {
        setSnackbarMessage(result.error);
        setSnackbarSeverity("error");
      } else {
        setSnackbarMessage("Transfer deleted successfully!");
        setSnackbarSeverity("success");
      }

      setSnackbarOpen(true);
      handleClose();
    });
  };

  return (
    <>
      <IconButton color="error" onClick={handleOpen}>
        <DeleteIcon />
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Transfer?</DialogTitle>
        <DialogContent>
          <DialogContentText color="white">
            Are you sure you want to delete this transfer? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" disabled={isPending}>
            {isPending ? <CircularProgress size={20} /> : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
