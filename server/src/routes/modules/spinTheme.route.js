/**
 * Create route Spin for project
 * author: Le khang
 * date: 21/05/2019
 * team: BE-RHP
 */
const router = require( "express-promise-router" )();

const SpinThemeController = require( "../../controllers/spinTheme.controller" );
const auth = require( "../../helpers/middleware/authenticate.middleware" );
const collaborator = require( "../../helpers/middleware/collaborator.middleware" );

router
  .route( "/" )
  .get( auth, collaborator, SpinThemeController.index )
  .post( auth, collaborator, SpinThemeController.create )
  .patch( auth, collaborator, SpinThemeController.update )
  .delete( auth, collaborator, SpinThemeController.delete );

module.exports = router;
