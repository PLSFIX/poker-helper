export function calcEq(betSize) {
  const percent = betSize / 100;
  const ratio = (1 + percent) / percent;
  const eq = +((1 / ratio) * 100).toFixed(2);

  return eq;
}

export function calcRatio(betSize) {
  const percent = betSize / 100;
  const ratio = +((1 + percent) / percent).toFixed(2);

  return `${ratio} to 1`;
}

export function calcMinEVBet(value) {
  const percent = value / 100;
  const minEVbet = +((percent / (1 - percent)) * 100).toFixed(2);

  if (minEVbet === Number.POSITIVE_INFINITY) {
    return 100500;
  }

  return minEVbet;
}

export function EV() {

}
