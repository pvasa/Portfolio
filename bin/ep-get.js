let log = module.parent.log;

let router = require(`express`).Router();

router.get(`/`, function (req, res) {
    res.render(`views`);
});
module.exports = router;
