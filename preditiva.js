const first = require('./first.js');
const follow = require('./follow.js');

const uniq = (arr) => arr.filter((item, index) => arr.indexOf(item) === index);

const union = (arr1, arr2) => uniq(arr1.concat(arr2));

const compact = (arr) => arr.filter(Boolean);

const indexBy = (arr) => {
  const result = {};

  arr.forEach((item) => {
    result[item] = item;
  });

  return result;
};

const VAZIO = null;

module.exports = (regras) => {
  const naoTerminais = uniq(regras.map(({ left }) => left));
  const naoTerminaisHash = indexBy(naoTerminais);

  function naoTerminal(item) {
    return naoTerminaisHash[item];
  }

  function vazio(item) {
    return item === VAZIO;
  }

  function terminal(item) {
    return !vazio(item) && !naoTerminal(item);
  }

  function makePreditiva(first, follow) {
    const preditiva = {};

    regras.forEach(({ left, right }, indiceRegra) => {
      const numeroRegra = indiceRegra + 1;
      const primeiroItem = right[0];
      let set = [];

      if (terminal(primeiroItem)) {
        set.push(primeiroItem);
      } else if (naoTerminal(primeiroItem)) {
        right.every((item, index) => {
          if (naoTerminal(item)) {
            set = union(set, compact(first[item]));

            if (first[item].includes(VAZIO)) {
              if (right[index + 1]) return true;

              set = union(set, follow[left]);
            }
          } else {
            set = union(set, [item]);
          }
        });
      } else {
        set = [...follow[left]];
      }

      preditiva[numeroRegra] = set;
    });

    return preditiva;
  }

  const preditiva = makePreditiva(first, follow);

  return { preditiva };
}