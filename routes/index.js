var express = require('express');
var router = express.Router();
var pm = require("./../plugins/plugin_manager.js");

/* GET home page. */
router.get('/', function(req, res, next) {
    var plugins = pm.get_available_plugins();

    var alias_to_name = {}
    for(var pl in plugins) {
        alias_to_name[pl] = plugins[pl].name();
    };


    res.render('index', { plugins_list: alias_to_name });
});

module.exports = router;
