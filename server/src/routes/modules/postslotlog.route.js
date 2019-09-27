/**
 * Create route Photo Library for project
 * author: sky albert
 * date: 21/05/2019
 * team: BE-RHP
 */
const router = require( "express-promise-router" )();

const PhotoLibraryController = require( "../../controllers/postslotlog.controller" );
const auth = require( "../../helpers/middleware/authenticate.middleware" );
const permission = require( "../../helpers/middleware/permission.middleware" );

router
  .route( "/" )
  .get( auth, permission, PhotoLibraryController.index )
  .post( PhotoLibraryController.create )
  .patch( PhotoLibraryController.update )
  .delete( auth, permission, PhotoLibraryController.delete );

module.exports = router;
