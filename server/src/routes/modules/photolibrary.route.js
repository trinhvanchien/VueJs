/**
 * Create route PHoto Library for project
 * author: sky albert
 * date: 21/05/2019
 * team: BE-RHP
 */
const router = require( "express-promise-router" )();

const PhotoLibraryController = require( "../../controllers/photolibrary.controller" );
const auth = require( "../../helpers/middleware/authenticate.middleware" );
const permission = require( "../../helpers/middleware/permission.middleware" );

router
  .route( "/" )
  .get( auth, permission, PhotoLibraryController.index )
  .post( auth, permission, PhotoLibraryController.create )
  .patch( auth, permission, PhotoLibraryController.update )
  .delete( auth, permission, PhotoLibraryController.delete );

module.exports = router;
