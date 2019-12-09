/**
 * Create Category Default for project
 * author: Sky Albert
 * date: 04/06/2019
 * team: BE-RHP
 */
const router = require( "express-promise-router" )();
const CategoryDefaultController = require( "../../controllers/categorydefault.controller" );
const auth = require( "../../helpers/middleware/authenticate.middleware" );
const collaborator = require( "../../helpers/middleware/collaborator.middleware" );

router
  .route( "/" )
  .get( auth, CategoryDefaultController.index )
  .post( auth, collaborator, CategoryDefaultController.create )
  .patch( auth, collaborator, CategoryDefaultController.update )
  .delete( auth, collaborator, CategoryDefaultController.delete );

router
  .route( "/:categoryId/post/:postId" )
  .post( auth, CategoryDefaultController.createPostByCategory )
  .delete( auth, CategoryDefaultController.removePostByCategory );
module.exports = router;
