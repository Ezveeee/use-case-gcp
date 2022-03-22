/**
 * Background Cloud Function to be triggered by Pub/Sub.
 * This function is exported by index.js, and executed when
 * the trigger topic receives a message.
 *
 * @param {object} message The Pub/Sub message.
 * @param {object} context The event metadata.
 */

// Import the Google Cloud client library
const { BigQuery } = require('@google-cloud/bigquery');
const bigquery = new BigQuery();

const datasetId = 'use_case_ldi';
const tableId = 'enseignes';

// Insert data into a table
exports.insertBigQuery = (message, context) => {
    try {
        data_string = Buffer.from(message.data, 'base64').toString()
        const rows = JSON.parse(data_string);
        bigquery
            .dataset(datasetId)
            .table(tableId)
            .insert(rows);
        console.log(`Inserted ${rows.length} rows`);
    } catch (error) {
        console.error(`Received error while inserting: ${error.message}`);
        process.exitCode = 1;
    }
};