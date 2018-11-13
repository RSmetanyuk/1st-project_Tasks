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
const mainWiewingDay = NowMoment;
//const milisecInDay = 8.64e+7;


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

const init = () => {
  $buttonNew.addEventListener('click', buttonNewOnClick);
  $taskEditButtonBack.addEventListener('click', taskEditButtonBackOnClick);
};

init();