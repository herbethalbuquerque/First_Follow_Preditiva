const first = require('./first.js');

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

const FIM = null;

module.exports = (regras) => {
  const naoTerminais = uniq(regras.map(({ left }) => left));
  const naoTerminaisHash = indexBy(naoTerminais);

  function naoTerminal(item) {
    return naoTerminaisHash[item];
  }

  function conjuntoVazio() {
    const sets = {};

    naoTerminais.forEach((naoterminal) => {
      sets[naoterminal] = [];
    });

    return sets;
  }

  function makeFollow(first) {
    const follow = conjuntoVazio();
    const naoterminal = regras[0].left;
    follow[naoterminal].push(FIM);

    let conjuntoAlterado;

    do {
      conjuntoAlterado = false;

      regras.forEach(({ left, right }) => {
        right.forEach((item, index) => {
          if (!naoTerminal(item)) return;

          const naoterminal = left;
          const restItems = right.slice(index + 1);
          let set = follow[item];

          if (restItems.length) {
            restItems.every((restItem, restIndex) => {
              if (naoTerminal(restItem)) {
                set = union(set, compact(first[restItem]));

                if (first[restItem].includes(EMPTY_CHAIN)) {
                  if (restItems[restIndex + 1]) return true;
                  set = union(set, follow[naoterminal]);
                }
              } else {
                set = union(set, [restItem]);
              }
            });
          } else {
            set = union(set, follow[naoterminal]);
          }
          if (follow[item].length !== set.length) {
            follow[item] = set;
            conjuntoAlterado = true;
          }
        });
      });
    } while (conjuntoAlterado);

    return follow;
  }

  const follow = makeFollow(first);

  return { follow };
}