import axios from "axios";

const BASE_URL = "http://localhost:4000";

export async function getAllIssues() {
    const res = await axios.get(`${BASE_URL}/issues`);
    return res.data;
}

export async function getIssueById(id) {
    const res = await axios.get(`${BASE_URL}/issues/${id}`);
    return res.data;
}

export async function createIssue(issueBody) {
    const res = await axios.post(`${BASE_URL}/issues/add`, issueBody);
    return res.status === 200;
}

export async function updateIssue(id, issueBody) {
    const res = await axios.post(`${BASE_URL}/issues/update/${id}`, issueBody);
    return res.status === 200;
}

export async function completeIssue(id) {
    const res = await axios.post(`${BASE_URL}/issues/complete/${id}`);
    return res.status === 200;
}

export async function reopenIssue(id) {
    const res = await axios.post(`${BASE_URL}/issues/reopen/${id}`);
    return res.status === 200;
}

export async function commentOnIssue(id, commentBody) {
    const res = await axios.post(`${BASE_URL}/issues/comment/${id}`, commentBody);
    return res.status === 200;
}
