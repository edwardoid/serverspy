/**
 * Created by Edward on 7/20/2015.
 */


var OSInfo = function () {
    this.plugin_name = "Main";
    this.plugin_alias = "main";
    this.plugin_author = "Edward Sargsian"
    this.plugin_versioin = "1.0"
}

OSInfo.prototype.name = function() {
    return this.plugin_name;
}

OSInfo.prototype.alias = function() {
    return this.plugin_alias;
}

OSInfo.prototype.author = function() {
    return this.plugin_author;
}

OSInfo.prototype.version = function() {
    return this.plugin_versioin;
}

function calculate_cpu_load(cpu) {
    var total = 0
    for(type in cpu.times)
        total += cpu.times[type];

    for(type in cpu.times)
        console.log("\t", type, Math.round(100 * cpu.times[type] / total));
}

OSInfo.prototype.render = function(req, res) {
    var os = require('os');

    var cpu_stats = [ 23.5, 75.69, 100, 23.6 ]
    
    res.render(__dirname + '/views/info',
        {
            'hostname': os.hostname(),
            'arch': os.arch(),
            'uptime': Math.ceil((os.uptime() / 3600) % 60) + "H " + Math.ceil((os.uptime() / 60) % 60) + "m " + Math.ceil(os.uptime() % 60 ) + "s",
            'cpu_stats': cpu_stats,
            'total_mem': os.totalmem / 1024,
            'free_mem': os.freemem() / 1024
        }
    )
}

exports.initialize = function() {
    return new OSInfo();
}
