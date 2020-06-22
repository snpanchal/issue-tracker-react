import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import {
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button
} from "@material-ui/core";
import StatusSnackbar from "../StatusSnackbar";
import { useFormStyles } from "../../styles/styles";
import { createIssue } from "../../api/apiCalls";

function Create({ history }) {
    const classes = useFormStyles();
    const [title, setTitle] = useState("");
    const [responsible, setResponsible] = useState("");
    const [description, setDescription] = useState("");
    const [severity, setSeverity] = useState("");

    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showInfo, setShowInfo] = useState(false);

    const handleBackClicked = () => {
        history.push("/");
    };

    const handleCreateClicked = async () => {
        if (!(title.trim()) || !(responsible.trim()) || !(description.trim()) || !(severity.trim())) {
            setShowInfo(true);
            return;
        }

        const issueBody = { title, responsible, description, severity };
        const successful = await createIssue(issueBody);
        if (successful) {
            setShowSuccess(true);
            setTimeout(() => history.push("/"), 1000);
        } else {
            setShowError(true);
        }
    };

    const handleSuccessSnackbarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setShowSuccess(false);
    };

    const handleErrorSnackbarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setShowError(false);
    };

    const handleInfoSnackbarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setShowInfo(false);
    };

    return (
        <div className="root">
            <h1>Create a New Issue</h1>
            <form>
                <TextField
                    className={classes.textField}
                    label="Title"
                    variant="outlined"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <TextField
                    className={classes.textField}
                    label="Responsible"
                    variant="outlined"
                    value={responsible}
                    onChange={e => setResponsible(e.target.value)}
                />
                <TextField
                    className={classes.textField}
                    label="Description"
                    variant="outlined"
                    value={description}
                    multiline
                    fullWidth
                    rows={5}
                    onChange={e => setDescription(e.target.value)}
                />
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel className={classes.inputLabel}>Severity</InputLabel>
                    <Select
                        className={classes.select}
                        label="Severity"
                        value={severity}
                        onChange={e => setSeverity(e.target.value)}
                    >
                        <MenuItem value={"High"}>High</MenuItem>
                        <MenuItem value={"Medium"}>Medium</MenuItem>
                        <MenuItem value={"Low"}>Low</MenuItem>
                    </Select>
                </FormControl>
                <Button className={classes.primaryBtn} variant="contained" color="primary" onClick={handleCreateClicked}>Create Issue</Button>
                <Button className={classes.secondaryBtn} variant="contained" color="primary" onClick={handleBackClicked}>Back to List</Button>
            </form>
            <StatusSnackbar showSnackbar={showSuccess} handleSnackbarClose={handleSuccessSnackbarClose} snackbarSeverity="success" message="Created a new issue!" />
            <StatusSnackbar showSnackbar={showError} handleSnackbarClose={handleErrorSnackbarClose} snackbarSeverity="error" message="Could not create a new issue." />
            <StatusSnackbar showSnackbar={showInfo} handleSnackbarClose={handleInfoSnackbarClose} snackbarSeverity="info" message="Please make sure you fill out all required fields." />
        </div>
    );
}

export default withRouter(Create);
