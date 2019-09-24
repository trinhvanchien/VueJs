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
const UploadImage = require( "../../helpers/services/upload.service" );

router
  .route( "/" )
  .get( auth, permission, PhotoLibraryController.index )
  .post( auth, permission, PhotoLibraryController.create )
  .patch( auth, permission, PhotoLibraryController.update )
  .delete( auth, permission, PhotoLibraryController.delete );

router.route( "/upload" ).post( auth, permission, UploadImage.array( "./uploads/albums", "attachments", 25, null, "uid" ), PhotoLibraryController.upload );

module.exports = router;
