/**
 * Background Cloud Function to be triggered when a file is added to Cloud Storage bucket.
 *
 * @param {object} file The Cloud Storage file metadata.
 * @param {object} context The event metadata.
 */

// Imports the Google Cloud client library
const { PubSub } = require('@google-cloud/pubsub');
const pubSubClient = new PubSub();

exports.publishMessageOnFileUpload_ldi = (file, context) => {
    const topic = pubSubClient.topic('use-case-ldi');
    const data = JSON.stringify({ id: '1711', nom: 'DEPOBOIS', date_creation: '2000-01-01', date_fermeture: '2005-08-27', pays: 'FR', adresse: '10 avenue de l\'Europe', code_postal: '60280', ville: 'VENETTE' });
    const dataBuffer = Buffer.from(data);
    try {
        const messageId = topic.publishMessage({ data: dataBuffer });
        console.log(`Message ${messageId} published.`);
    } catch (error) {
        console.error(`Received error while publishing: ${error.message}`);
        process.exitCode = 1;
    }
    return topic.publishMessage({ data: dataBuffer });
};