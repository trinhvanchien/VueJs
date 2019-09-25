/**
 * Create route PHoto Library for project
 * author: sky albert
 * date: 21/05/2019
 * team: BE-RHP
 */
const router = require( "express-promise-router" )();

const PhotoLibraryController = require( "../../controllers/photolibrary.controller" );
const auth = require( "../../helpers/middleware/authenticate.middleware" );

router
  .route( "/" )
  .get( auth, PhotoLibraryController.index )
  .post( auth, PhotoLibraryController.create )
  .patch( auth, PhotoLibraryController.update )
  .delete( auth, PhotoLibraryController.delete );

module.exports = router;
