/**
 * Create route Spin for project
 * author: Le khang
 * date: 21/05/2019
 * team: BE-RHP
 */
const router = require("express-promise-router")();

const SpinWordController = require("../../controllers/spinWord.controller");
const auth = require("../../helpers/middleware/authenticate.middleware");
const collaborator = require("../../helpers/middleware/collaborator.middleware");

router.route("/").get(auth, collaborator, SpinWordController.index);
router.route("/create").post(auth, collaborator, SpinWordController.create);
router.route("/update/:id").patch(auth, collaborator, SpinWordController.update);
router.route("/delete/:id").delete(auth, collaborator, SpinWordController.delete);

// router get word by key
router.route("/key").post(auth, SpinWordController.getWordByKey);

/** Spin content */
router.route("/spin").post(auth, SpinWordController.spin);

router.route("/index-options").post(auth, SpinWordController.indexOptions);
router.route("/detail/:id").get(auth, SpinWordController.detail);

module.exports = router;
