let inquirer = require('inquirer'),
    fs = require('fs-extra'),
    pwd = process.cwd(),
    clc = require('cli-color');

let spacer = () => {
    console.log('');
    console.log('');
};
spacer();

inquirer.prompt([{
    type: 'confirm',
    name: 'install',
    message: 'Install a full base nodeJs app into "'+ pwd +'" (to run this node application after installing you will also need mongodb and redis installed)?',
    default: false
}]).then( (answers) => {

    spacer();
    if( !answers.install ) {
        return;
    }

    inquirer.prompt([{
        type: 'confirm',
        name: 'install_confirm',
        message: 'Are you sure? This will recursively empty "'+ pwd +'" before installing!',
        default: false
    }]).then( ( answers ) => {
        spacer();
        if( answers.install_confirm ){
            fs.emptyDir( pwd, (err) => {
                if (err) {
                    console.log( err );
                } else {

                    fs.copy(__dirname + '/../file-structures/full/', pwd, (err) => {
                        if( err ){
                            console.log( err )
                        } else {
                            spacer();
                            console.log( clc.bold.green('quilk-cli has successfully installed a full base nodeJs app is now ready to go.'));
                            spacer();

                            //include the command runner
                            let cmd = require('./command_run');
                            cmd('npm', ['install'], ()=>{
                                //change directory to the browser app and npm install
                                process.chdir('src/browser_app');
                                cmd('npm', ['install'], ()=>{
let completedMsg = `
Great! The quilk-cli has just installed a ready to node js app and installed the npm dependencies.

To get started from here, there are 3 tasks to perform from this position in your file structure:
1 - Install globally pm2, webpack & quilk "sudo npm install -g quilk webpack pm2".
2 - Run quilk to build the client side dependencies "quilk".
3 - Run webpack to build the server file "webpack".

After that, just run the server "pm2 start build/server.js" and point your browser to localhost:3010

This is the full installation, as long as the prerequisites were completed beforehand you should be able to register and login out of the box. 
`;
                                console.log( completedMsg );

                                });
                            });
                        }
                    });
                }
            });
        }
    });
}, (e) => {
    console.log(e)
});