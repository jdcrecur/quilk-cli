let clc = require('cli-color');
let h = [
    [clc.bold('quilk-cli install-light'), 'Install the skeleton for a nodejs application'],
    [clc.bold('quilk-cli install-full'), 'Install the skeleton for a full nodejs application. This requires mongodb and redis on your system.'],
    [clc.bold('quilk-cli help') , 'Displays the help you are reading right now.'],
];

console.log( clc.bold('Here is a list of the quilk-cli commands you can use:') );

for (let i = 0 ; i < h.length ; ++i){
    console.log( h[i][0] );
    console.log( h[i][1] );
}