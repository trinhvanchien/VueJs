/**
 * Create route Spin for project
 * author: Le khang
 * date: 21/05/2019
 * team: BE-RHP
 */
const router = require( "express-promise-router" )();

const SpinWordController = require( "../../controllers/spinWord.controller" );
const auth = require( "../../helpers/middleware/authenticate.middleware" );
const collaborator = require( "../../helpers/middleware/collaborator.middleware" );

router
  .route( "/" )
  .get( auth, collaborator, SpinWordController.index )
  .post( auth, collaborator, SpinWordController.create )
  .patch( auth, collaborator, SpinWordController.update )
  .delete( auth, collaborator, SpinWordController.delete );

// router get word by key
router.route( "/key" ).post( auth, SpinWordController.getWordByKey );

module.exports = router;
