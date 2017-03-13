let clc = require('cli-color');
let h = [
    [clc.bold('quilk-cli install-base-nodejs-app'), 'Install the skeleton for a nodejs application'],
    [clc.bold('quilk-cli help') , 'Displays the help you are reading right now.'],
];

console.log( clc.bold('Here is a list of the quilk_ci commands you can use:') );

for (var i = 0 ; i < h.length ; ++i){
    console.log( h[i][0] );
    console.log( h[i][1] );
}