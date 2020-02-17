/**
 * Create route PHoto Library for project
 * author: sky albert
 * date: 21/05/2019
 * team: BE-RHP
 */
const router = require( "express-promise-router" )();

const PhotoLibraryController = require( "../../controllers/photolibrary.controller" );
const auth = require( "../../helpers/middleware/authenticate.middleware" );
const collaborator = require( "../../helpers/middleware/collaborator.middleware" );
const UploadImage = require( "../../helpers/services/upload.service" );

router
  .route( "/" )
  .get( auth, collaborator, PhotoLibraryController.index )
  .post( auth, collaborator, PhotoLibraryController.create )
  .patch( auth, collaborator, PhotoLibraryController.update )
  .delete( auth, collaborator, PhotoLibraryController.delete );

router.route( "/upload" ).post( auth, collaborator, UploadImage.array( "./uploads/albums", "attachments", 25, null, "uid" ), PhotoLibraryController.upload );

module.exports = router;
