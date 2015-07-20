
var fs = require("fs");
var path = require("path");
var plugins_dir = __dirname;
var plugins = undefined;

function try_to_load(dir) {
    var instance = undefined;
    fs.readdirSync(dir).forEach(function (candidate) {
        if (instance === undefined) {
            if (path.extname(candidate) === ".js") {
                console.log("Plugin candidate: " + candidate);
                try {
                    var pl = require(path.join(dir, candidate));
                    if (pl === undefined)
                        throw "Not a plugin"
                    instance = pl.initialize();
                }
                catch (e) {
                    console.log(e.toString())
                }
            }
        }
    });

    return instance;
}

exports.get_available_plugins = function () {
    if(plugins === undefined) {
        plugins = {}
        fs.readdirSync(plugins_dir).forEach(function (candidate_dir) {
            try {
                p = try_to_load(path.join(plugins_dir, candidate_dir));
                if(p === undefined)
                    return
                var alias = p.alias();
                if(alias === undefined)
                    return;
                plugins[alias] = p
                console.log(p.name() + " loaded")
            }
            catch (e) {}
        });
    }

    return plugins;
}

exports.get_plugin = function(name) {
    return plugins[name];
}


