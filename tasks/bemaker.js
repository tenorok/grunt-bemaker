module.exports = function(grunt) {

    var path = require('path'),
        bemaker = require('bemaker'),
        moment = require('moment'),

        Make = bemaker.Make,
        Cli = bemaker.Cli,
        Log = bemaker.Log;

    grunt.registerMultiTask('bemaker', 'Build BEM project', function() {

        var done = this.async(),
            data = this.data,

            cli = new Cli(),
            timeStart = moment();

        cli.verboseAliases = {
            log: { log: console.log },
            info: { info: console.info },
            warn: { warn: console.warn },
            error: { error: console.error }
        };

        var log = new Log({});

        var make = new Make({
            directories: Cli.resolveAbsolutePath(data.directories || []),
            outname: data.outname || '',
            outdir: Cli.resolveAbsolutePath(data.outdir || '.'),
            extensions: data.extensions,
            blocks: data.blocks,
            dependext: data.dependext,
            jsdoctag: data.jsdoctag,
            before: data.before,
            after: data.after
        });

        make
            .on('level', function(data) {
                grunt.verbose.writeln(log.log({
                    operation: 'walk',
                    path: data.path,
                    description: 'directory'
                }));
            })
            .on('block', function(data) {
                grunt.verbose.writeln(log.log({
                    operation: 'walk',
                    text: data.name,
                    description: 'block'
                }));
            })
            .on('file', function(data) {
                grunt.verbose.writeln(log.log({
                    operation: 'walk',
                    path: data.path,
                    description: 'file'
                }));
            })
            .on('depend', function(data) {
                grunt.verbose.writeln(log.log({
                    operation: 'read',
                    path: data.path,
                    description: 'dependencies'
                }));
            })
            .on('filter', function(data) {
                grunt.verbose.writeln(log.log({
                    operation: 'filter',
                    text: data.block
                }));
            })
            .on('extension', function(data) {
                grunt.verbose.writeln(log.log({
                    operation: 'group',
                    text: data.name,
                    description: 'extension'
                }));
            })
            .on('save', function(data) {
                grunt.log.writeln(log.info({
                    operation: 'write',
                    path: data.path
                }));
            })
            .on('loop', function(branch) {
                grunt.log.writeln(log.warn({
                    operation: 'loop',
                    text: branch.join(' → ')
                }));
            })
            .on('unexist', function(data) {
                var blocks = [];
                if(data.name) {
                    blocks.push(data.name);
                }
                blocks.push(data.require);
                grunt.log.writeln(log.warn({
                    operation: 'unexist',
                    text: blocks.join(' → ')
                }));
            });

        make.build().then(function() {
            grunt.log.writeln(log.info({ text: 'total time', total: moment() - timeStart }));
            done();
        });
    });
};
