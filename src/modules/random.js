const firstNames = [
    "James", "Robert", "John", "Michael", "David", "William", "Richard", "Joseph", "Thomas", "Charles",
    "Alan", "Juan", "Wayne", "Elijah", "Randy", "Roy", "Vincent", "Ralph", "Eugene", "Russell",
    "Bobby", "Mason", "Maclan", "Philip", "Jerry", "George", "Kramer", "Bruce", "Logan", "Albert",
    "Yennefer", "Evelynn", "Olivia", "Natalie", "Brittany", "Charlotte", "Marie", "Kayla", "Alexis", "Lori",
    "Andrea", "Cheryl", "Hannah", "Jacqueline", "Amelia", "Martha", "Gloria", "Teresa", "Anne", "Sarah",
    "Carolyn", "Maria", "Heather", "Ruth", "Diane", "Julie", "Joyce", "Virginia", "Kelly", "Lauren"
];

const lastNames = [
    "Quintana", "Horne", "Finley", "Blanchard", "Haley", "Phan", "Portillo", "Clements", "Nixon", "Correa",
    "Archer", "Tang", "Travis", "Odom", "Duke", "Whitney", "Rowland", "Rollins", "Hendrix", "Mayo",
    "Bender", "Shepard", "Shapiro", "Smith", "De Lucia", "Muscat", "McRobert", "Reh", "Moy", "Dos Santos",
    "Wells", "Balasubramanium", "Magana", "Blackburn", "Gould", "Duffy", "Herring", "Hamilton", "McGregor", "Sampson",
    "Crosby", "Fitzpatrick", "Giles", "Conrad", "Esparza", "Spalding", "LeBlanc", "Glasc", "Gillespie", "Lowery",
    "Meadows", "Whitehead", "Blackhead", "Davila", "McKee", "Barr", "DeJesus", "Marin", "Berger", "Bartlett"
];

const companyNames = [
    "Joe's Megacorp", "Gaming Limited", "Anime Lovers", "JV BigCorp", "BigFart Incorporated", "Yellow Pages",
    "Daniel's Donuts", "Peter's Peaches", "Menulawg", "Fernando's Dry Cleaning", "Peter's Pooches", "Carmando Farnando"
];

const emailDomain = [
    "gmail.com", "outlook.com", "uowmail.edu.au", "anime.gov", "hotmail.com", "protonmail.com", "joemother.biz"
];

const empTypes = [
    "Casual", "Part-time", "Full-time"
];

const empPrivileges = [
    "Employee", "Manager", "Admin"
];

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

function randomName()
{
    const firstIndex = random(0, firstNames.length);
    const lastIndex = random(0, lastNames.length);

    return {firstName: firstNames[firstIndex], lastName: lastNames[lastIndex]};
}

function randomCompanyName()
{
    const index = random(0, companyNames.length);
    return companyNames[index];
}

function randomDomain()
{
    const index = random(0, emailDomain.length);
    return emailDomain[index];
}

function randomPhoneNumber()
{
    var phoneNumber = "0" + random(1, 10);

    for (var i = 0; i < 8; i++) {
        phoneNumber += random(0, 10);
    }

    return phoneNumber;
}

function randomType()
{
    return empTypes[random(0, empTypes.length)];
}

function randomPrivilege()
{
    return empPrivileges[random(0, empPrivileges.length)];
}


module.exports.random = random;
module.exports.randomChar = randomChar;
module.exports.randomName = randomName;
module.exports.randomCompanyName = randomCompanyName;
module.exports.randomDomain = randomDomain;
module.exports.randomPhoneNumber = randomPhoneNumber;
module.exports.randomType = randomType;
module.exports.randomPrivilege = randomPrivilege;

