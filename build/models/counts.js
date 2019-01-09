"use strict";

var _pg = require("pg");

async function counters(req, res) {
    var connectionString = process.env.DATABASE_URL;

    var client = new _pg.Client({
        connectionString: connectionString,
        ssl: true,
    });

    var redAll = "SELECT COUNT(*) FROM redflags";
    var intAll = "SELECT COUNT(*) FROM interventions";

    var redRes = "SELECT COUNT(*) FROM redflags WHERE current_status='resolved'";
    var intRes = "SELECT COUNT(*) FROM interventions WHERE current_status='resolved'";

    var redRej = "SELECT COUNT(*) FROM redflags WHERE current_status='rejected'";
    var intRej = "SELECT COUNT(*) FROM interventions WHERE current_status='rejected'";

    var redDraft = "SELECT COUNT(*) FROM redflags WHERE current_status='under-investigation'";
    var intDraft = "SELECT COUNT(*) FROM interventions WHERE current_status='under-investigation'";

    var total_reds = void 0,
        total_ints = void 0,
        reds_res = void 0,
        ints_res = void 0,
        ints_rej = void 0,
        reds_rej = void 0,
        reds_draft = void 0,
        ints_draft = void 0;

    try {
        client.connect();

        total_reds = await client.query(redAll);
        total_ints = await client.query(intAll);
        reds_res = await client.query(redRes);
        ints_res = await client.query(intRes);
        reds_rej = await client.query(redRej);
        ints_rej = await client.query(intRej);
        reds_draft = await client.query(redDraft);
        ints_draft = await client.query(intDraft);

        var counts = {
            countAllRed: total_reds.rows[0].count,
            countAllInt: total_ints.rows[0].count,
            countResRed: reds_res.rows[0].count,
            countResInt: ints_res.rows[0].count,
            countRejRed: reds_rej.rows[0].count,
            countRejInt: ints_rej.rows[0].count,
            countDraftRed: reds_draft.rows[0].count,
            countDraftInt: ints_draft.rows[0].count
        };

        client.end();
        res.status(200).json(counts);
    } catch (err) {
        console.log(err.message);
        client.end();
    }
}

module.exports = counters;
