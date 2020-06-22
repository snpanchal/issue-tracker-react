import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import {
    makeStyles,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@material-ui/core";
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import IssueTableRow from "./IssueTableRow";
import ArchivedIssueTableRow from "./ArchivedIssueTableRow";
import { getAllIssues, completeIssue, reopenIssue } from "../../api/apiCalls";
import StatusSnackbar from "../StatusSnackbar";

const useStyles = makeStyles(() => ({
    tableHead: {
        background: "#5e58fc"
    },
    createBtn: {
        backgroundColor: "#dbbf09",
        marginBottom: "2rem"
    },
    archivedBtn: {
        backgroundColor: "#107028",
        marginTop: "2rem",
        marginBottom: "2rem"
    }
}));

function List({ history }) {
    const [showArchived, setShowArchived] = useState(false);
    const [allIssues, setAllIssues] = useState([]);

    const [showCompleted, setShowCompleted] = useState(false);
    const [showReopen, setShowReopen] = useState(false);
    const [showError, setShowError] = useState(false);

    const classes = useStyles();

    const fetchIssues = async () => {
        const issues = await getAllIssues();
        setAllIssues(issues);
    };

    useEffect(() => {
        fetchIssues();
    }, []);

    const handleCreateClick = () => {
        history.push("/create")
    };

    const handleEditClicked = (issueId) => {
        history.push(`/edit/${issueId}`);
    };

    const handleCompleteClicked = async (issueId) => {
        const successful = await completeIssue(issueId);
        if (successful) {
            setShowCompleted(true);
            setTimeout(() => fetchIssues(), 1000);
        } else {
            setShowError(true);
        }
    };

    const handleReopenClicked = async (issueId) => {
        const successful = await reopenIssue(issueId);
        if (successful) {
            setShowReopen(true);
            setTimeout(() => fetchIssues(), 1000);
        } else {
            setShowError(true);
        }
    };

    const handleCompletedSnackbarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setShowCompleted(false);
    };

    const handleReopenSnackbarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setShowReopen(false);
    };

    const handleErrorSnackbarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setShowError(false);
    };

    const issues = allIssues.filter(issue => !issue.archived);
    const archivedIssues = allIssues.filter(issue => issue.archived);
    return (
        <div className="root">
            <h1>All Issues</h1>
            <Button
                className={classes.createBtn}
                startIcon={<ControlPointIcon />}
                variant="contained"
                color="primary"
                onClick={handleCreateClick}
            >
                <span>Create Issue</span>
            </Button>
            {issues.length > 0 ? (<TableContainer classNamecomponent={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Responsible</TableCell>
                            <TableCell>Severity</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {issues.map(issue => (
                            <IssueTableRow
                                issue={issue}
                                handleEditClicked={handleEditClicked}
                                handleCompleteClicked={handleCompleteClicked}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>) : <span style={{ display: "block" }}>No current issues.</span>}
            {archivedIssues.length > 0 && (
                <div>
                    <Button
                        className={classes.archivedBtn}
                        startIcon={<CheckCircleOutlineIcon />}
                        variant="contained"
                        color="primary"
                        onClick={() => setShowArchived(!showArchived)}
                    >
                        {!showArchived ? "View Completed Issues" : "Hide Completed Issues"}
                    </Button>
                    {showArchived && (
                        <div className="archived-issues">
                            <TableContainer component={Paper}>
                                <Table size="small" aria-label="a dense table">
                                    <TableHead className={classes.tableHead}>
                                        <TableRow>
                                            <TableCell>Title</TableCell>
                                            <TableCell>Responsible</TableCell>
                                            <TableCell>Severity</TableCell>
                                            <TableCell>Completed On</TableCell>
                                            <TableCell>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {archivedIssues.map(issue => (
                                            <ArchivedIssueTableRow
                                                issue={issue}
                                                handleEditClicked={handleEditClicked}
                                                handleReopenClicked={handleReopenClicked}
                                            />
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    )}
                </div>
            )}
            <StatusSnackbar showSnackbar={showCompleted} handleSnackbarClose={handleCompletedSnackbarClose} snackbarSeverity="success" message="Completed issue!" />
            <StatusSnackbar showSnackbar={showReopen} handleSnackbarClose={handleReopenSnackbarClose} snackbarSeverity="success" message="Reopened issue!" />
            <StatusSnackbar showSnackbar={showError} handleSnackbarClose={handleErrorSnackbarClose} snackbarSeverity="error" message="Something went wrong." />
        </div>
    );
}

export default withRouter(List);
