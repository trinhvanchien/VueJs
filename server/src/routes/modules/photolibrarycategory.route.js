/**
 * Create route Photo Library Category for project
 * author: sky albert
 * date: 23/09/2019
 * team: BE-RHP
 */
const router = require( "express-promise-router" )();

const PhotoLibraryCategoryController = require( "../../controllers/photolibrarycategory.controller" );
const auth = require( "../../helpers/middleware/authenticate.middleware" );
const collaborator = require( "../../helpers/middleware/collaborator.middleware" );

router
  .route( "/" )
  .get( auth, PhotoLibraryCategoryController.index )
  .post( auth, collaborator, PhotoLibraryCategoryController.create )
  .patch( auth, collaborator, PhotoLibraryCategoryController.update )
  .delete( auth, collaborator, PhotoLibraryCategoryController.delete );

router.route( "/:id" ).get( auth, collaborator, PhotoLibraryCategoryController.getPhotoLibraryByUser );
router.route( "/:id/bz" ).get( auth, collaborator, PhotoLibraryCategoryController.getPhotoLibrary );

module.exports = router;
