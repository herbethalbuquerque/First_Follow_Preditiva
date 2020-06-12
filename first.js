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

  function conjuntoVazio() {
    const sets = {};

    naoTerminais.forEach((naoterminal) => {
      sets[naoterminal] = [];
    });

    return sets;
  }

  function makeFirst() {
    const first = conjuntoVazio();
    let conjuntoAlterado;

    do {
      conjuntoAlterado = false;

      regras.forEach(({ left, right }) => {
        const naoterminal = left;
        let set = first[naoterminal];

        right.every((item, index) => {
          if (naoTerminal(item)) {
            set = union(set, compact(first[item]));

            if (first[item].includes(VAZIO)) {
              if (right[index + 1]) return true;
              set = union(set, [VAZIO]);
            }
          } else if (terminal(item)) {
            set = union(set, [item]);
          } else {
            set = union(set, [VAZIO]);
          }
        });

        if (first[naoterminal].length !== set.length) {
          first[naoterminal] = set;
          conjuntoAlterado = true;
        }
      });
    } while (conjuntoAlterado);

    return first;
  }

  const first = makeFirst();

  return { first };
}