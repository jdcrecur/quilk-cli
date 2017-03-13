var inquirer = require('inquirer'),
    fs = require('fs-extra'),
    pwd = process.cwd(),
    clc = require('cli-color');

function spacer(  ){
    console.log('');
    console.log('');
}
spacer();

inquirer.prompt([{
    type: 'confirm',
    name: 'install',
    message: 'Install a base nodeJs app into "'+ pwd +'"?',
    default: false
}]).then(function (answers) {

    spacer();
    if( !answers.install ) {
        return;
    }

    inquirer.prompt([{
        type: 'confirm',
        name: 'install_confirm',
        message: 'Are you sure? This will recursively empty "'+ pwd +'" before installing!',
        default: false
    }]).then(function ( answers ) {
        spacer();
        if( answers.install_confirm ){
            fs.emptyDir( pwd, function (err) {
                if (err) {
                    console.log( err );
                } else {

                        fs.copy(__dirname + '/../file-structures/', pwd + '/', function (err) {
                            if( err ){
                                console.log( err )
                            } else {
                                spacer();
                                console.log('quilk-cli has successfully been installed a base nodjs app.');
                                spacer();
                                console.log('Run npm install at the root and the src/browser_app/');
                                spacer();
                                console.log('Build the node app by running wepack form the root of the project.');
                                spacer();
                                console.log('Build the browser app by running quilk from the root of the project.')
                            }
                        });
                }
            });
        }
    });
}, function (e) {
    console.log(e)
});