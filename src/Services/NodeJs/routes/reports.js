var Boom = require('boom');
var Joi = require('joi');
var Feedback = require('../models/feedback.js').Feedback;
var calculator = require('../lib/index-calculator');
var moment = require('moment');

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
      if(request.params.reportName == "pollingstation"){
        generatePollingStationReport(request.query.pollingstation,function(error, report){
          if(error){
            reply(Boom.badImplementation(error)); 
          }
          else{
           reply(report);
          }
        })
      }
      if(request.params.reportName == "company"){
        reply(generateCompanyReport());
      }
    }
  });
};

function generatePollingStationReport(pollingStationId, callback){
  var report = {};
  Feedback.find({'pollingStation': pollingStationId},function(error, feedback){
    if(error){
      return error;
    }

    //set the happinessIndex
    var indicators = [];
    feedback.forEach(function(f){
      indicators.push(f.indicator);
    });
    report.happinessIndex = calculator.calculateIndex(indicators);

    //set happinessIndex for today
    indicators = [];
    feedback.forEach(function(){
      if(isFeedbackInRange(feedback, moment().startOf('day').toDate(), moment().endOf('day').toDate())){
        indicators.push(feedback.indicator);
      }
    });
    report.happinessIndexToday = calculator.calculateIndex(indicators);

    return callback(null, report);
    //console.log(calculator.calculateIndex([1,1,1,1]));
    //return calculator.calculateIndex([1,1,1,1]);
  });
}

function isFeedbackInRange(feedback, startDate, endDate){
  //console.log(startDate);
  //console.log(endDate);
  console.log(feedback);
  if(feedback.createDate > startDate && feedback.createDate < endDate) {
    console.log("got matched");
    return feedback;
  } 
  else {
    return null;
  }
}


  // return {
  //     happinessIndex: 10,
  //     happinessIndexToday: 2,
  //     feedbackCount: 3,
  //     pollingStation: pollingStationId,
  //     dailyIndexes: [
  //       {
  //         index:23,
  //         reportDate:2011-10-12,
  //         count:100
  //       },
  //       {
  //         index:2,
  //         reportDate:2011-10-12,
  //         count:10
  //       },
  //       {
  //         index:4,
  //         reportDate:2011-10-12,
  //         count:10044
  //       }
  //     ],
  //     happyReasons: [
  //       {
  //         questionId: 1234,
  //         questionText: "the question",
  //         count: 987987897
  //       },
  //       {
  //         questionId: 5555,
  //         questionText: "the question again",
  //         count: 44
  //       }
  //     ],
  //     unhappyReasons: [
  //       {
  //         questionId: 44,
  //         questionText: "nboss isa ",
  //         count: 987987897
  //       },
  //       {
  //         questionId: 33,
  //         questionText: "mum didnt hug me",
  //         count: 44
  //       }
  //     ]
  // }


function generateCompanyReport(){
  return {
      happinessIndex: 1,
      happinessIndexToday: 2,
      feedbackCount: 3,
      pollingStation: "Station name"
  }
}

//**** polling station report
// public int HappinessIndex { get; set; }
// public int HappinessIndexToday { get; set; }
// public int FeedbackCount { get; set; }
// public string PollingStation{ get; set; }
// public IList<IDailyIndexData> DailyIndexes { get; set; }
// public IList<IReasonData> UnhappyReasons { get; set; }
// public IList<IReasonData> HappyReasons { get; set; }
  // nt Index { get; set; }
  // DateTime ReportDate { get; set; }
  // int Count { get; set; }

  // Guid QuestionId { get; set; }
  // string QuestionText { get; set; }
  // int Count { get; set; }



///*** company report 
// public int HappinessIndex { get; set; }
// public int HappinessIndexToday { get; set; }
// public int FeedbackCount { get; set; }
// public IList<IDailyIndexData> DailyIndexes { get; set; }
// public IList<IReasonData> UnhappyReasons { get; set; }
// public IList<IReasonData> HappyReasons { get; set; }

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