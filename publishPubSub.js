/**
 * Background Cloud Function to be triggered when a file is added to Cloud Storage bucket.
 *
 * @param {object} file The Cloud Storage file metadata.
 * @param {object} context The event metadata.
 */

// Import the Google Cloud Pub/Sub & Storage client libraries
const { PubSub } = require('@google-cloud/pubsub');
const pubSubClient = new PubSub();
const { Storage } = require('@google-cloud/storage');
const storage = new Storage();

// Assign the topic where to publish
const topic = pubSubClient.topic('use-case-ldi');

// Publish a message inside a topic
exports.publishPubSub = (file, context) => {
    try {
        // Read the csv file and convert it to Javascript object
        storage.bucket('use-case-ldi').file(file.name).download((err, contents) => {
            if (err) {
                console.log('error', err);
                return null
            }
            // Split into an array the csv at each end of line
            var lineArray = contents.toString().split("\r\n");
            var oneLine = [];
            var result = [];
            // Go through each csv line and add it's content to the result variable
            for (i = 0; i < lineArray.length; ++i) {
                var temp = {};
                result.push(temp);
                oneLine = lineArray[i].toString().split("\t");
                result[i]["id"] = oneLine[0] + oneLine[1] + oneLine[2];
                result[i]["nom"] = oneLine[16];
                result[i]["date_creation"] = oneLine[6];
                result[i]["date_fermeture"] = oneLine[7];
                result[i]["pays"] = oneLine[5];
                result[i]["adresse"] = oneLine[8];
                result[i]["code_postal"] = oneLine[11];
                result[i]["ville"] = oneLine[12];
            }
            // Convert Javascript object to string and send to topic
            const stringResult = JSON.stringify(result);
            const bufferResult = Buffer.from(stringResult);
            const messageId = topic.publishMessage({ data: bufferResult });
            console.log(`Message ${messageId} published.`);
        });
    } catch (error) {
        console.error(`Received error while publishing: ${error.message}`);
        process.exitCode = 1;
    }
};