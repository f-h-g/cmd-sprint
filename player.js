var player = 
[
    ['*','*','*','*','*','*','*','*','*','*','*','*','*','*','*','*'],
    ['*','*','*','*','*','O','O','O','O','O','O','*','*','*','*','*'],
    ['*','*','*','*','O','O','O','O','O','O','O','O','*','*','*','*'],
    ['*','*','*','*','O','O','O','O','O','O','O','O','*','*','*','*'],
    ['*','*','*','*','*','O','O','O','O','O','O','*','*','*','*','*'],
    ['*','*','*','*','*','*','*','O','O','*','*','*','*','*','*','*'],
    ['*','*','*','*','*','*','O','O','O','O','*','*','*','*','*','*'],
    ['*','*','*','*','*','O','*','O','O','*','O','*','*','*','*','*'],
    ['*','*','*','*','O','*','*','O','O','*','*','O','*','*','*','*'],
    ['*','*','*','*','*','*','O','*','*','O','*','*','*','*','*','*'],
    ['*','*','*','*','*','O','O','*','*','O','O','*','*','*','*','*'],
    ['G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G'],
];//go*

var obstacle = 
[
    ['*','*','*','*','*','*','*','*','*','*','*','*','*','*','*','*'],
    ['*','*','*','*','*','*','*','*','*','*','*','*','*','*','*','*'],
    ['*','*','*','*','*','*','*','*','*','*','*','*','*','*','*','*'],
    ['*','*','*','*','*','*','*','*','*','*','*','*','*','*','*','*'],
    ['*','*','*','*','*','*','*','*','*','*','*','*','*','*','*','*'],
    ['*','*','*','*','*','*','*','*','*','*','*','*','*','*','*','*'],
    ['*','*','*','*','*','*','*','*','*','*','*','*','*','*','*','*'],
    ['*','*','*','*','*','*','*','X','X','*','*','*','*','*','*','*'],
    ['*','*','*','*','*','*','X','X','X','X','*','*','*','*','*','*'],
    ['*','*','*','*','*','X','X','X','X','X','X','*','*','*','*','*'],
    ['*','*','*','*','*','X','X','X','X','X','X','*','*','*','*','*'],
    ['G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G'],
];//gx*

var obstacleTree = 
[
    ['*','*','*','*','*','*','*','*','*','*','*','*','*','*','*','*'],
    ['*','*','*','*','*','*','*','B','B','*','*','*','*','*','*','*'],
    ['*','*','*','*','*','*','*','B','B','*','*','*','*','*','*','*'],
    ['*','*','*','B','B','*','*','B','B','*','*','*','*','*','*','*'],
    ['*','*','*','B','B','*','*','B','B','*','*','*','*','*','*','*'],
    ['*','*','*','*','B','B','B','B','B','B','B','B','*','*','*','*'],
    ['*','*','*','*','*','*','*','B','B','*','*','B','B','*','*','*'],
    ['*','*','*','*','*','*','*','B','B','*','*','B','B','*','*','*'],
    ['*','*','*','*','*','*','*','B','B','*','*','*','*','*','*','*'],
    ['*','*','*','*','*','*','*','B','B','*','*','*','*','*','*','*'],
    ['*','*','*','*','*','*','*','B','B','*','*','*','*','*','*','*'],
    ['G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G'],
];//gb*

var openAir = 
[
    ['*','*','*','*','*','*','*','*','*','*','*','*','*','*','*','*'],
    ['*','*','*','*','*','*','*','*','*','*','*','*','*','*','*','*'],
    ['*','*','*','*','*','*','*','*','*','*','*','*','*','*','*','*'],
    ['*','*','*','*','*','*','*','*','*','*','*','*','*','*','*','*'],
    ['*','*','*','*','*','*','*','*','*','*','*','*','*','*','*','*'],
    ['*','*','*','*','*','*','*','*','*','*','*','*','*','*','*','*'],
    ['*','*','*','*','*','*','*','*','*','*','*','*','*','*','*','*'],
    ['*','*','*','*','*','*','*','*','*','*','*','*','*','*','*','*'],
    ['*','*','*','*','*','*','*','*','*','*','*','*','*','*','*','*'],
    ['*','*','*','*','*','*','*','*','*','*','*','*','*','*','*','*'],
    ['*','*','*','*','*','*','*','*','*','*','*','*','*','*','*','*'],
    ['G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G'],
];//g*

var goal = 
[
    ['*','*','*','*','*','*','*','*','*','*','*','*','*','*','*','*'],
    ['*','*','*','*','*','*','*','*','*','*','*','*','*','*','*','*'],
    ['*','*','*','*','P','O','R','O','R','O','R','P','*','*','*','*'],
    ['*','*','*','*','P','R','O','R','O','R','O','P','*','*','*','*'],
    ['*','*','*','*','P','*','*','*','*','*','*','P','*','*','*','*'],
    ['*','*','*','*','P','*','*','*','*','*','*','P','*','*','*','*'],
    ['*','*','*','*','P','*','*','*','*','*','*','P','*','*','*','*'],
    ['*','*','*','*','P','*','*','*','*','*','*','P','*','*','*','*'],
    ['*','*','*','*','P','*','*','*','*','*','*','P','*','*','*','*'],
    ['*','*','*','*','P','*','*','*','*','*','*','P','*','*','*','*'],
    ['*','*','*','*','P','*','*','*','*','*','*','P','*','*','*','*'],
    ['G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G'],
];//grpo*

module.exports.player = player;
module.exports.obstacle = obstacle;
module.exports.openAir = openAir;
module.exports.obstacleTree = obstacleTree;
module.exports.goal = goal;

//****************
//*****OOOOOO*****
//****OOOOOOOO****
//*****OOOOOO*****
//*******OO*******
//******OOOO******
//*****O*OO*O*****
//****O**OO**O****
//******O**O******
//*****OO**OO*****
//GGGGGGGGGGGGGGGG