/**
 * Create route membership package for project
 * author: sky albert
 * date: 13/09/2019
 * team: BE-RHP
 */
const router = require( "express-promise-router" )();
const PackageController = require( "../../controllers/membershippackage.controller" );

const auth = require( "../../helpers/middleware/authenticate.middleware" );
const permission = require( "../../helpers/middleware/permission.middleware" );

router
  .route( "/" )
  .get( PackageController.index )
  .patch( auth, permission, PackageController.update )
  .post( auth, permission, PackageController.create )
  .delete( auth, permission, PackageController.delete );

router.route( "/:id" ).post( PackageController.isExist );
router.route( "/:id/member" ).post( auth, permission, PackageController.addMember );

// router user add members to package
router.route( "/:id/many" ).post( auth, permission, PackageController.addMemberToPackage );
// router add price for old package
router.route( "/:id/price" ).post( auth, permission, PackageController.addPriceByPackage );

module.exports = router;
