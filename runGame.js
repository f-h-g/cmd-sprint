const models = require('./player.js');
const readline = require('readline');
const fs = require('fs');

//console.log('\u001b[' + 32 + 'm' + player + '\u001b[0m');
var results = [];
fs.readFile('./highscores.json', "utf-8", (err, data) => {
    if (err) throw err;
    results = JSON.parse(data).results;
});

function printScores(hs){
    var color = '32m';
    console.log('\u001b[' + color + "High Scores:" + '\u001b[0m');
    for(var i = 1; i < results.length; i++){
        if(i==hs){
            color='33m';
        } else color = '32m';
        console.log('\u001b[' + color + results[i][0] + ": " + results[i][1] + " seconds" + '\u001b[0m');
    }
}

function checkScores(score){
    for(var i = results.length-1; i >= 0; i--){
        if(Number(results[i][1])>score){
            return true;
        }
    }
    return false;
}

function updateScores(name, time){
    for(let i = 0; i < results.length; i++){
        if(Number(results[i][1])>time){
            results.pop();
            results.splice(i, 0, [name,time.toFixed(3)]);
            printScores(i);
            writeScores();
            return;
        }
    }
}

// Name,Score
// U1,4.000
// U2,10.000
// U3,100.000
// U4,150.000
// U5,200.000

function drawComponent(model){
    var print = [];
    for(var i = 0; i < 12; i++){
        var temp = [];
        for(var j = 0; j < 16; j++){
            var color = '';
            if(model[i][j] == 'O'){
                color = '40;30m';
                temp.push('\u001b[' + color + model[i][j] + '\u001b[0m');
            }
            else if(model[i][j] == 'X'){
                color = '100;90m';
                temp.push('\u001b[' + color + model[i][j] + '\u001b[0m');
            } 

            else if(model[i][j] == 'G'){
                color = '43;33m';
                temp.push('\u001b[' + color + model[i][j] + '\u001b[0m');
            } 
            else if(model[i][j] == 'B'){
                color = '42;32m';
                temp.push('\u001b[' + color + model[i][j] + '\u001b[0m');
            }
            // else if(model[i][j] == 'L'){ // terminal doesn't handle brights?
            //     color = '102;92m';
            //     temp.push('\u001b[' + color + model[i][j] + '\u001b[0m');
            // }
            // else if(model[i][j] == 'F'){ // DUPE COLOR - reuse O
            //     color = '40;30m';
            //     temp.push('\u001b[' + color + model[i][j] + '\u001b[0m');
            // }
            else if(model[i][j] == 'R'){
                color = '47;37m';
                temp.push('\u001b[' + color + model[i][j] + '\u001b[0m');
            }
            else if(model[i][j] == 'P'){
                color = '100;90m';
                temp.push('\u001b[' + color + model[i][j] + '\u001b[0m');
            }
            else{
                color = '44;34m';
                temp.push('\u001b[' + color + model[i][j] + '\u001b[0m');
            }
        }
        print.push(temp);
    }
    return print;
}

function drawScene(components){
    var print = "";
    for(var i = 0; i < 12; i++){
        for(var j = 0; j < components.length; j++){
            for(var k = 0; k < 16; k++){
                print += components[j][i][k];
            }
        }
        if(i!=11)print += '\n';
    }
    console.log(print);
}

var sceneOrder = [
    drawComponent(models.openAir), drawComponent(models.player), drawComponent(models.obstacle), drawComponent(models.openAir), drawComponent(models.openAir), drawComponent(models.obstacle), drawComponent(models.openAir),//0-6
    drawComponent(models.openAir), drawComponent(models.openAir), drawComponent(models.openAir), drawComponent(models.obstacleTree), drawComponent(models.openAir), drawComponent(models.openAir), drawComponent(models.obstacle),//7-13
    drawComponent(models.openAir), drawComponent(models.obstacleTree), drawComponent(models.openAir), drawComponent(models.obstacleTree), drawComponent(models.openAir), drawComponent(models.openAir), drawComponent(models.obstacle),//14-20
    drawComponent(models.openAir), drawComponent(models.openAir), drawComponent(models.openAir), drawComponent(models.obstacle), drawComponent(models.openAir), drawComponent(models.openAir), drawComponent(models.obstacle),//21-27
    drawComponent(models.openAir), drawComponent(models.goal), drawComponent(models.openAir), drawComponent(models.openAir), drawComponent(models.openAir), drawComponent(models.openAir), drawComponent(models.openAir),//28-34
    drawComponent(models.openAir)//35
];
var location = 1;
var obstacles = [2,5,10,13,15,17,20,24,27];
var rocks = [2,5,13,20,24,27];
var cacti = [10,15,17];

//drawScene(sceneOrder);

function questionName(time){
    const rl2 = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl2.question("Enter name: ", (name) => {
        if(name != ""){
            updateScores(name, time);
            rl2.close();
            return;
        }
        else {
            rl2.close();
            return questionName(time);
        }
    });
}

function writeScores(){
    var hsData = {"results": results};
    fs.writeFileSync('./highscores.json', JSON.stringify(hsData), 'utf8', function (err) {
        if (err) {
            console.log('Some error occured - file either not saved or corrupted file saved.');
        } 
    });
}

function runLoop(){
    drawScene(sceneOrder.slice(location-1, location+5));
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question("Enter Input: ", (answer) => {
        if(answer.toLocaleLowerCase() == "q"){
            rl.close();
            return;
        }
        else if(answer.toLocaleLowerCase() == "d"){
            if(location < sceneOrder.length-8){
                location++;
                if(!obstacles.includes(location)){
                    var temp = sceneOrder[location];
                    sceneOrder[location] = sceneOrder[location-1];
                    sceneOrder[location-1] = temp;
                    rl.close();
                    return runLoop();
                }
                else{
                    console.log("Game over. Score: " + (location-2) + " feet");
                    rl.close();
                    printScores();
                    return;
                }
            }
            else{
                location+=2;
                var temp = sceneOrder[location];
                sceneOrder[location] = sceneOrder[location-2];
                sceneOrder[location-2] = temp;
                drawScene(sceneOrder.slice(location-1, location+5));
                start = process.hrtime(start);
                console.log("You reached the end; you win! Time: " + (start[0] + start[1]/1000000000).toFixed(3) + " seconds");
                rl.close();
                var time = start[0] + start[1]/1000000000;
                if(checkScores(time)){
                    questionName(time);
                    return;            
                }
                else{
                    printScores();
                    return;
                }
            }
        }
        else if(answer.toLocaleLowerCase() == "w"){
            if(flag){
                flag = false;
                start = process.hrtime();
            }
            location++;
            if(rocks.includes(location)){
                location++;
                var temp = sceneOrder[location];
                sceneOrder[location] = sceneOrder[location-2];
                sceneOrder[location-2] = temp;
                rl.close();
                return runLoop();
            }
            else if(cacti.includes(location)){
                console.log("Game over. Score: " + (location-1) + " feet");
                rl.close();
                printScores();
                return;
            }
            else{
                location--;
                rl.close();
                return runLoop();
            }
        }
        else if(answer.toLocaleLowerCase() == "s"){
            location++;
            if(cacti.includes(location)){
                location++;
                var temp = sceneOrder[location];
                sceneOrder[location] = sceneOrder[location-2];
                sceneOrder[location-2] = temp;
                rl.close();
                return runLoop();
            }
            else if(rocks.includes(location)){
                console.log("Game over. Score: " + (location-1) + " feet");
                rl.close();
                printScores();
                return;
            }
            else{
                location--;
                rl.close();
                return runLoop();
            }
        }
        else{
            rl.close();
            return runLoop();
        }
    });
}

var start;// = process.hrtime();
var flag = true;
runLoop();


