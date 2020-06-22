import React, { useState, useEffect } from "react";
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
import Comments from "./Comments";
import { useFormStyles } from "../../styles/styles";
import "./styles.css";
import { getIssueById, updateIssue, commentOnIssue } from "../../api/apiCalls";

function Edit({
    match: { params: { issueId } },
    history
}) {
    const classes = useFormStyles();
    const [title, setTitle] = useState("");
    const [responsible, setResponsible] = useState("");
    const [description, setDescription] = useState("");
    const [severity, setSeverity] = useState("");
    const [status, setStatus] = useState("");
    const [comments, setComments] = useState([]);
    const [commentName, setCommentName] = useState("");
    const [commentMsg, setCommentMsg] = useState("");
    const [archived, setArchived] = useState(false);

    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showInfo, setShowInfo] = useState(false);

    const fetchIssue = async (issueId) => {
        const issue = await getIssueById(issueId);
        setTitle(issue.title);
        setResponsible(issue.responsible);
        setDescription(issue.description);
        setStatus(issue.status);
        setSeverity(issue.severity);
        setComments(issue.comments);
        setArchived(issue.archived);
    };

    useEffect(() => {
        fetchIssue(issueId);
    }, [issueId]);

    const handleBackClicked = () => {
        history.push("/");
    };

    const handleUpdateClicked = async () => {
        if (!(title.trim()) || !(responsible.trim()) || !(description.trim()) || !(status.trim()) || !(severity.trim())) {
            setShowInfo(true);
            return;
        }

        const issueBody = { title, responsible, description, status, severity };
        const successful = await updateIssue(issueId, issueBody);
        if (successful) {
            setShowSuccess(true);
        } else {
            setShowError(true);
        }
        setTimeout(() => history.push("/"), 1000);
    };

    const handleAddCommentClicked = async () => {
        if (!(commentName.trim()) || !(commentMsg.trim())) {
            setShowInfo(true);
            return;
        }

        const commentBody = { name: commentName, message: commentMsg };
        const successful = await commentOnIssue(issueId, commentBody);
        if (!successful) {
            setShowError(true);
            return;
        }

        fetchIssue(issueId);
        setCommentName("");
        setCommentMsg("");
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
            <h1>View and Update Issue</h1>
            <form>
                <TextField
                    className={classes.textField}
                    label="Title"
                    variant="outlined"
                    value={title}
                    disabled={archived}
                    onChange={e => setTitle(e.target.value)}
                />
                <TextField
                    className={classes.textField}
                    label="Responsible"
                    variant="outlined"
                    value={responsible}
                    disabled={archived}
                    onChange={e => setResponsible(e.target.value)}
                />
                <TextField
                    className={classes.textField}
                    label="Description"
                    variant="outlined"
                    value={description}
                    multiline
                    fullWidth
                    disabled={archived}
                    rows={5}
                    onChange={e => setDescription(e.target.value)}
                />
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel className={classes.inputLabel}>Status</InputLabel>
                    <Select
                        className={classes.select}
                        label="Status"
                        value={status}
                        disabled={archived}
                        onChange={e => setStatus(e.target.value)}
                    >
                        <MenuItem value={"Open"}>Open</MenuItem>
                        <MenuItem value={"In Progress"}>In Progress</MenuItem>
                        <MenuItem value={"Done"}>Done</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel className={classes.inputLabel}>Severity</InputLabel>
                    <Select
                        className={classes.select}
                        label="Severity"
                        value={severity}
                        disabled={archived}
                        onChange={e => setSeverity(e.target.value)}
                    >
                        <MenuItem value={"High"}>High</MenuItem>
                        <MenuItem value={"Medium"}>Medium</MenuItem>
                        <MenuItem value={"Low"}>Low</MenuItem>
                    </Select>
                </FormControl>
                {!archived && <Button className={classes.primaryBtn} variant="contained" color="primary" onClick={handleUpdateClicked}>Update Issue</Button>}
                <Button className={classes.secondaryBtn} variant="contained" color="primary" onClick={handleBackClicked}>Back to List</Button>
            </form>
            {comments.length > 0
                ? <Comments comments={comments} />
                : <p className="no-comments">No comments on this issue yet.</p>}
            <h3 className="add-comment-heading">Add a comment</h3>
            <TextField
                className={classes.textField}
                label="Name"
                variant="outlined"
                value={commentName}
                onChange={e => setCommentName(e.target.value)}
            />
            <TextField
                className={classes.textField}
                label="Message"
                variant="outlined"
                value={commentMsg}
                multiline
                fullWidth
                rows={3}
                onChange={e => setCommentMsg(e.target.value)}
            />
            <Button className={classes.primaryBtn} variant="contained" color="primary" onClick={handleAddCommentClicked}>Add Comment</Button>
            <StatusSnackbar showSnackbar={showSuccess} handleSnackbarClose={handleSuccessSnackbarClose} snackbarSeverity="success" message="Updated issue!" />
            <StatusSnackbar showSnackbar={showError} handleSnackbarClose={handleErrorSnackbarClose} snackbarSeverity="error" message="Could not update issue." />
            <StatusSnackbar showSnackbar={showInfo} handleSnackbarClose={handleInfoSnackbarClose} snackbarSeverity="info" message="Please make sure you fill out all required fields." />
        </div>
    );
}

export default withRouter(Edit);
