//date.setDate(date.getDate() + 1);

const madeDate = milisec => {
  const monthes = 'Jun,Feb,Mar,Apr,May,June,July,Aug,Sept,Oct,Nov,Dec'.split(',');
  const dateObj = new Date(milisec);
  return `${dateObj.getDate()} ${monthes[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
};

document.getElementsByClassName('today__date')[0].innerHTML = madeDate(Date.now());

