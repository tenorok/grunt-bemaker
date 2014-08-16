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
            timeStart = moment(),
            verbose;

        cli.verboseAliases = {
            log: { log: console.log },
            info: { info: console.info },
            warn: { warn: console.warn },
            error: { error: console.error }
        };

        if(data.verbose) {
            verbose = cli.resolveVerboseAliases(data.verbose.toString());
        }

        var log = new Log(verbose);

        log.info({ text: 'build started' });

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
                log.log({
                    operation: 'walk',
                    path: data.path,
                    description: 'directory'
                });
            })
            .on('block', function(data) {
                log.log({
                    operation: 'walk',
                    text: data.name,
                    description: 'block'
                });
            })
            .on('file', function(data) {
                log.log({
                    operation: 'walk',
                    path: data.path,
                    description: 'file'
                });
            })
            .on('depend', function(data) {
                log.log({
                    operation: 'read',
                    path: data.path,
                    description: 'dependencies'
                });
            })
            .on('filter', function(data) {
                log.log({
                    operation: 'filter',
                    text: data.block
                });
            })
            .on('extension', function(data) {
                log.log({
                    operation: 'group',
                    text: data.name,
                    description: 'extension'
                });
            })
            .on('save', function(data) {
                log.info({
                    operation: 'write',
                    path: data.path
                });
            });

        make.build().then(function() {
            log.info({ text: 'build finished', total: moment() - timeStart });
            done();
        });
    });
};
