import { makeStyles } from "@material-ui/core";

export const useFormStyles = makeStyles(() => ({
    textField: {
        display: "block",
        marginBottom: "2rem"
    },
    formControl: {
        display: "block",
        width: 200,
        marginBottom: "2rem"
    },
    select: {
        width: 200
    },
    primaryBtn: {
        display: "block",
        backgroundColor: "#dbbf09",
        marginBottom: "2rem"
    },
    secondaryBtn: {
        display: "block",
        backgroundColor: "#d95d3b"
    }
}));

export const useTableStyles = makeStyles(() => ({
    tableRow: {
        background: "#d7d5e8"
    },
    highSeverity: {
        color: "#e80000"
    },
    mediumSeverity: {
        color: "#e8910e"
    },
    lowSeverity: {
        color: "#028c00"
    }
}));