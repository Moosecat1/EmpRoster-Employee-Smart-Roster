//random number in range (min included, max excluded)
function random(min, max){
    let num = Math.random() * (max - min) + min;

    return Math.floor(num);
}

//generate a random character
function randomChar()
{
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const indx = random(0, characters.length);

    return characters[indx];
}

module.exports.random = random;
module.exports.randomChar = randomChar;
