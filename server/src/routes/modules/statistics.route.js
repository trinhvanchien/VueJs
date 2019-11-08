const router = require( "express-promise-router" )();
const StatisticController = require( "../../controllers/statistic.controller" );

router
  .route( "/account" )
  .post( StatisticController.accountStatistics );

module.exports = router;
