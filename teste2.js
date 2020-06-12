const makeFirst = require('./first.js');
const makeFollow = require('./follow.js');
const makePreditiva = require('./preditiva.js');

// S → Bb | Cd
// B → aB | ε
// C → cC | ε

const regras = [
    // S → Bb | Cd
    {
        left: "S",
        right: ["b", "B", "d", "C"]
    },
     
    // B → aB | ε
    {
        left: "B",
        right: ["a", "B", "ε"]
    },

    // C → cC | ε
    {
        left: "C",
        right: ["c", "C", "ε"]
    }   
];
 
const { first } = makeFirst(regras);
const { follow } = makeFollow(regras);
const { preditiva } = makePreditiva(regras);

console.log("First");
console.log(first);
console.log("Follow");
console.log(follow);
console.log("Preditiva");
console.log(preditiva);