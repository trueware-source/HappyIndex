var Boom = require('boom');                                  // HTTP Errors
var Joi = require('joi');                                   // Validation
var Feedback = require('../models/feedback.js').Feedback; // Mongoose ODM

// Exports = exports? Huh? Read: http://stackoverflow.com/a/7142924/5210
module.exports = exports = function (server) {

    console.log('Loading report routes');
    exports.index(server);
};

/**
 * GET /reports
 * Gets all the reports
 *
 * @param server - The Hapi Server
 */
exports.index = function (server) {
    // GET /reports
    server.route({
        method: 'GET',
        path: '/reports/{reportName}',
        handler: function (request, reply) {
            Feedback.find(function (err, report) {
                if (!err) {
                    reply(report);
                } else {
                    reply(Boom.badImplementation(err)); // 500 error
                }
            });
        }
    });
};




// var query = from f in _feedbackCollection.AsQueryable<FeedbackData>()
//                         where f.CreateDate >= startDate && f.CreateDate <= endDate && f.PollingStation.Equals(pollingStation??"")
//                         select f;
            
// var indicators = new List<int>();
// foreach (var feedback in query)
// {
//     indicators.Add(feedback.Indicator);
// }
// var result = new PollingStationFeedbackReport();
// result.HappinessIndex = Services.HappyIndexCalculator.Calculate(indicators);
// result.PollingStation = pollingStation;
// result.FeedbackCount = query.Count();
// result.HappinessIndexToday = GetIndexByDateRange(DateTime.Today, DateTime.Today.AddHours(24));

// return result;


/**
 * Formats an error message that is returned from Mongoose.
 *
 * @param err The error object
 * @returns {string} The error message string.
 */
function getErrorMessageFrom(err) {
    var errorMessage = '';

    if (err.errors) {
        for (var prop in err.errors) {
            if(err.errors.hasOwnProperty(prop)) {
                errorMessage += err.errors[prop].message + ' '
            }
        }

    } else {
        errorMessage = err.message;
    }

    return errorMessage;
}