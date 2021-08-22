const apiCalls = require("./apiCalls")
// @ponicode
describe("apiCalls.getAllIssues", () => {
    test("0", async () => {
        await apiCalls.getAllIssues()
    })
})

// @ponicode
describe("apiCalls.createIssue", () => {
    test("0", async () => {
        await apiCalls.createIssue(false)
    })

    test("1", async () => {
        await apiCalls.createIssue(true)
    })

    test("2", async () => {
        await apiCalls.createIssue(undefined)
    })
})

// @ponicode
describe("apiCalls.updateIssue", () => {
    test("0", async () => {
        await apiCalls.updateIssue("proj_", "value-added")
    })

    test("1", async () => {
        await apiCalls.updateIssue("P5", "value-added")
    })

    test("2", async () => {
        await apiCalls.updateIssue("projects/", "4th generation")
    })

    test("3", async () => {
        await apiCalls.updateIssue("YOUR_PROJECT_ID", "dedicated")
    })

    test("4", async () => {
        await apiCalls.updateIssue("fake_project", "logistical")
    })

    test("5", async () => {
        await apiCalls.updateIssue(undefined, undefined)
    })
})

// @ponicode
describe("apiCalls.completeIssue", () => {
    test("0", async () => {
        await apiCalls.completeIssue("project_secret_")
    })

    test("1", async () => {
        await apiCalls.completeIssue(12)
    })

    test("2", async () => {
        await apiCalls.completeIssue(2)
    })

    test("3", async () => {
        await apiCalls.completeIssue("bc23a9d531064583ace8f67dad60f6bb")
    })

    test("4", async () => {
        await apiCalls.completeIssue("projectId-1969970175")
    })

    test("5", async () => {
        await apiCalls.completeIssue(undefined)
    })
})

// @ponicode
describe("apiCalls.reopenIssue", () => {
    test("0", async () => {
        await apiCalls.reopenIssue("project_secret_")
    })

    test("1", async () => {
        await apiCalls.reopenIssue(2)
    })

    test("2", async () => {
        await apiCalls.reopenIssue("projectId-1969970175")
    })

    test("3", async () => {
        await apiCalls.reopenIssue("P5")
    })

    test("4", async () => {
        await apiCalls.reopenIssue("bc23a9d531064583ace8f67dad60f6bb")
    })

    test("5", async () => {
        await apiCalls.reopenIssue(undefined)
    })
})

// @ponicode
describe("apiCalls.commentOnIssue", () => {
    test("0", async () => {
        await apiCalls.commentOnIssue("fake_project_id", "Hello, world!")
    })

    test("1", async () => {
        await apiCalls.commentOnIssue("projects/", "Foo bar")
    })

    test("2", async () => {
        await apiCalls.commentOnIssue(12, "Foo bar")
    })

    test("3", async () => {
        await apiCalls.commentOnIssue("YOUR_PROJECT_ID", "Hello, world!")
    })

    test("4", async () => {
        await apiCalls.commentOnIssue("_14", "foo bar")
    })

    test("5", async () => {
        await apiCalls.commentOnIssue(undefined, undefined)
    })
})
