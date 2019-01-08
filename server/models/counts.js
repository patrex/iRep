import {Client} from 'pg';

async function counters(req, res){
    const connectionString = "postgres://ireporter:hallmark@localhost:5432/ireporter";

    const client = new Client({
        connectionString
    });
    
    let redAll = `SELECT COUNT(*) FROM redflags`;
    let intAll = `SELECT COUNT(*) FROM interventions`;
    
    let redRes = `SELECT COUNT(*) FROM redflags WHERE current_status='resolved'`;
    let intRes = `SELECT COUNT(*) FROM interventions WHERE current_status='resolved'`;
    
    let redRej = `SELECT COUNT(*) FROM redflags WHERE current_status='rejected'`;
    let intRej = `SELECT COUNT(*) FROM interventions WHERE current_status='rejected'`;
    
    let redDraft = `SELECT COUNT(*) FROM redflags WHERE current_status='under-investigation'`;
    let intDraft = `SELECT COUNT(*) FROM interventions WHERE current_status='under-investigation'`;
    
    let total_reds, total_ints, reds_res,
        ints_res, ints_rej, reds_rej,
        reds_draft, ints_draft;
    
    try{
        client.connect();

        total_reds = await client.query(redAll);
        total_ints = await client.query(intAll);
        reds_res = await client.query(redRes);
        ints_res = await client.query(intRes);
        reds_rej = await client.query(redRej);
        ints_rej = await client.query(intRej);
        reds_draft = await client.query(redDraft);
        ints_draft = await client.query(intDraft);

        const counts = {
            countAllRed: total_reds.rows[0].count,
            countAllInt: total_ints.rows[0].count,
            countResRed: reds_res.rows[0].count,
            countResInt: ints_res.rows[0].count,
            countRejRed: reds_rej.rows[0].count,
            countRejInt: ints_rej.rows[0].count,
            countDraftRed: reds_draft.rows[0].count,
            countDraftInt: ints_draft.rows[0].count
        }

        client.end();
        res.status(200).json(counts);

    }catch(err){
        console.log(err.message);
        client.end();
    }
}

module.exports = counters;