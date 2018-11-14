const NowMoment = moment();
//const taskDateTypes = {1: 'up-to', 2: 'start-from', 3: 'all-day'};
//const taskTypes = {1: 'case', 2: 'call', 3: 'trip'};
/*const taskList = [{
  date: 1542050090876, 
  taskHeader: 'Some task header 1', 
  taskDetails: 'some task details details details details details 1', 
  taskDateType: 2, 
  taskType: 1,
  deleatet: false}, {
  date: 1542050099876, 
  taskHeader: 'Some task header 1', 
  taskDetails: 'some task details details details details details 1', 
  taskDateType: 2, 
  taskType: 1,
  deleatet: false}];
*/
const $$menueButtons = document.getElementsByClassName('footer-button');
const $buttonNew = $$menueButtons[0];
const $taskEditButtonBack = document.getElementsByClassName('task-edit_button-back')[0];
const $mainDatePrevBtn = document.getElementsByClassName('main-date__prev-btn')[0];
const $mainDateNextBtn = document.getElementsByClassName('main-date__next-btn')[0];
let mainWiewingDay = moment();

document.getElementsByClassName('day-header__date')[0].innerHTML = 
  mainWiewingDay.format('D MMM YYYY');
document.getElementsByClassName('day-header__week')[0].innerHTML = 
  `${mainWiewingDay.format('Wo')} week`;
document.getElementsByClassName('task__task-date')[0].innerHTML = NowMoment.format('HH : MM');

const buttonNewOnClick = () => {
  document.getElementsByClassName('task-edit')[0].classList.toggle('hidden');
  document.getElementsByClassName('main-view')[0].classList.toggle('hidden');
  $buttonNew.setAttribute('disabled', '');
};

const taskEditButtonBackOnClick = () => {
  document.getElementsByClassName('task-edit')[0].classList.toggle('hidden');
  document.getElementsByClassName('main-view')[0].classList.toggle('hidden');
  $buttonNew.removeAttribute('disabled');
};

const changeMainDate = days => {
  mainWiewingDay.add('days', days);
  document.getElementsByClassName('day-header__date')[0].innerHTML = 
  mainWiewingDay.format('D MMM YYYY');
document.getElementsByClassName('day-header__week')[0].innerHTML = 
  `${mainWiewingDay.format('Wo')} week`;
  console.log(mainWiewingDay);
};

const incrMainDate = () => changeMainDate(1);
const decrMainDate = () => changeMainDate(-1);

const init = () => {
  $mainDatePrevBtn.addEventListener('click', decrMainDate);
  $mainDateNextBtn.addEventListener('click', incrMainDate);
  $buttonNew.addEventListener('click', buttonNewOnClick);
  $taskEditButtonBack.addEventListener('click', taskEditButtonBackOnClick);
  $buttonNew.addEventListener('click', buttonNewOnClick);
};

init();