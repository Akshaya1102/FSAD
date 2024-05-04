var persons = [
  {
    id: 5,
    name: "Luke",
    pScore: 98,
    sScore: 56,
    isUser: true,
  },
  {
    id: 2,
    name: "John",
    pScore: 45,
    sScore: 39,
    isUser: false,
  },
  {
    id: 44,
    name: "Martin",
    pScore: 73,
    sScore: 99,
    isUser: false,
  },
  {
    id: 52,
    name: "Jane",
    pScore: 35,
    sScore: 89,
    isUser: true,
  },
  {
    id: 53,
    name: "Cale",
    pScore: 88,
    sScore: 99,
    isUser: true,
  },
];

var validusers = persons.filter(function (person) {
  return person.isUser;
});

var validScores = validusers.map(function (validuser) {
  return validuser.pScore + validuser.sScore;
});

var totalScore = validScores.reduce(function (acc, score) {
  return acc + score;
}, 0);

/***single function *******/
var totalScore = persons
  .filter(function (person) {
    return person.isUser;
  })
  .map(function (validuser) {
    return validuser.pScore + validuser.sScore;
  })
  .reduce(function (acc, score) {
    return acc + score;
  }, 0);


 /***arrow function *******/ 
  const totalScore1 = persons
  .filter(person => person.isUser)
  .map(validuser => validuser.pScore + validuser.sScore)
  .reduce((acc, score) => acc + score, 0);