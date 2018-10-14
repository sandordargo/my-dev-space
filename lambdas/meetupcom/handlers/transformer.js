"use strict";

const { getFromS3 } = require("aws-lambda-data-utils");
const { validate } = require("jsonschema");
const eventSchema = require("./schemas/event-schema");
const { buckets } = require("../config");
const { uploadTo } = require("../utils");

const transformEvent = function (defaults, event) {
  return {};
};

const isValidEvent = (event) => validate(event, eventSchema).errors.length === 0;

// const uploadData = function(bucketName, eventsPage) {
//   return uploadTo(
//     bucketName,
//     (today, hash) =>
//       `eventbrite-events__${today.valueOf()}__${hash}.json`,
//     eventsPage
//   );
// };

// const eventsUploads = groupsEvents.map(function(groupEvents, index) {
//   const { urlname } = groups[index];
//   return uploadTo(
//     (today, hash) =>
//       `groups-events/meetupcom-group-${urlname.toLowerCase()}__${today.valueOf()}__${hash}.json`,
//     groupEvents
//   );
// });

module.exports.transform = async (event, context, callback) => {
  try {
    console.log('event', JSON.stringify(event));
    const records = event.Records;

    const transformedFiles = await Promise.all(await records.map(async function ({
      s3: { bucket, object: file }
    }) {
      // const data = await getFromS3(bucket.name, file.key);
      // const response = JSON.parse(data.Body.toString());

      // const transformedEvents = response.events.map((event) => (
      //   transformEvent({ country: "GB" }, event)
      // ));

      // const validEvents = transformedEvents.filter(isValidEvent)

      // if (validEvents.length !== transformedEvents.length) {
      //   console.log('WARNING: some events generated were not valid!')
      // }

      // return validEvents;
    }));

    // const { eventsBucket } = buckets();
    // const filePaths = await Promise.all(await transformedFiles.map(async function (transformedFile) {
    //   return (await uploadData(eventsBucket, transformedFile)).key;
    // }));
    const filePaths = 'test';

    callback(null, { message: filePaths });
  } catch (err) {
    callback(err, null);
  }
};
