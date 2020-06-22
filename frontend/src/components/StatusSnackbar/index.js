import React from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

function StatusSnackbar({
    showSnackbar,
    handleSnackbarClose,
    snackbarSeverity,
    message
}) {
    return (
        <Snackbar open={showSnackbar} autoHideDuration={2000} onClose={handleSnackbarClose}>
            <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity={snackbarSeverity}>{message}</MuiAlert>
        </Snackbar>
    );
}

export default StatusSnackbar;
