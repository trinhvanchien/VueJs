/**
 * Create route Spin for project
 * author: Le khang
 * date: 21/05/2019
 * team: BE-RHP
 */
const router = require("express-promise-router")();

const SpinThemeController = require("../../controllers/spinTheme.controller");
const auth = require("../../helpers/middleware/authenticate.middleware");
const collaborator = require("../../helpers/middleware/collaborator.middleware");

router.route("/").get(auth, SpinThemeController.index);
router.route("/create").post(auth, collaborator, SpinThemeController.create);
router.route("/update/:id").patch(auth, collaborator, SpinThemeController.update);
router.route("/delete/:id").delete(auth, collaborator, SpinThemeController.delete);
router.route("/get-unpaginated").get(auth, SpinThemeController.getUnpaginated);

router.route("/detail/:id").get(auth, SpinThemeController.detail);
router.route("/index-options").post(auth, SpinThemeController.indexOptions);
module.exports = router;
