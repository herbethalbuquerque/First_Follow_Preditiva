const makeFirst = require('./first.js');
const makeFollow = require('./follow.js');
const makePreditiva = require('./preditiva.js');

const regras = [
    // E → TE’
    {
        left: "E",
        right: ["T", "E'"]
    },
     
    // E’ → +TE’ε
    {
        left: "E'",
        right: ["+", "T" , "E'", "ε"]
    },

    // // T → FT’
    // {
    //     left: "T",
    //     right: ["F", "T'"]
    // },    

    // T’ → *FT’ε
    {
        left: "E",
        right: ["*", "F", "T'", "ε"]
    },

    // F → (E)id
    {
        left: "F",
        right: ["(", "E", ")", "id"]
    },    
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