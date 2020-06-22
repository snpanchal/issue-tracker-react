import React from "react";
import { TableCell, TableRow, Button } from "@material-ui/core";
import { useTableStyles } from "../../styles/styles";

function IssueTableRow({
    issue,
    handleEditClicked,
    handleCompleteClicked
}) {
    const classes = useTableStyles();

    let severityClass = classes.highSeverity;
    switch (issue.severity) {
        case "Low":
            severityClass = classes.lowSeverity;
            break;
        case "Medium":
            severityClass = classes.mediumSeverity;
            break;
    }

    return (
        <TableRow className={classes.tableRow}>
            <TableCell>{issue.title}</TableCell>
            <TableCell>{issue.responsible}</TableCell>
            <TableCell className={severityClass}>{issue.severity}</TableCell>
            <TableCell>{issue.status}</TableCell>
            <TableCell>
                <Button variant="contained" color="primary" onClick={() => handleEditClicked(issue._id)}>View</Button>&nbsp;
                <Button variant="contained" color="primary" onClick={() => handleCompleteClicked(issue._id)}>Complete</Button>
            </TableCell>
        </TableRow>
    );
}

export default IssueTableRow;