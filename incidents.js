let incidents = [
    {
        id: 1,
        createdOn: new Date(),
        createdBy: 2,
        type: "red-flag",
        location: "23, 34.67",
        images: [],
        comment: "this transpired today",
    },

    {
        id: 2,
        createdBy: 4,
        type: "intervention",
        location: "6.54, 3.36",
        images: [],
        comment: "Army molestion",
        status: "draft",
    },

    {
        id: 3,
        createdOn: new Date(),
        createdBy: 5,
        type: "red-flag",
        location: "23, 34.67",
        images: [],
        comments: "this transpired today",
        status: "resolved",
    }
]

module.exports =  incidents;