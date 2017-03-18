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
    message: 'Install a full base nodeJs app into "'+ pwd +'"?',
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

                    fs.copy(__dirname + '/../file-structures/full/', pwd, function (err) {
                        if( err ){
                            console.log( err )
                        } else {
                            spacer();
                            console.log( clc.bold.green('quilk-cli has successfully installed a full base nodeJs app is now ready to go.'));
                            spacer();
                            console.log( clc.bold('Run "npm install" at the root of this project for the node app dependencies and the src/browser_app/ ofr hte client side dependencies'));
                            console.log(clc.bold('Build the node app by running webpack form the root of the project.'));
                            console.log(clc.bold('Build the browser app by running quilk from the root of the project.'));
                            spacer();
                        }
                    });
                }
            });
        }
    });
}, function (e) {
    console.log(e)
});