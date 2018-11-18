const NowMoment = moment();
/*
moment.updateLocale('en', {
  calendar : {
      lastDay : '[Yesterday]',
      sameDay : '[Today]',
      nextDay : '[Tomorrow]',
      lastWeek : '[Last] dddd',
      nextWeek : '[Next] dddd',
      sameElse : 'L'
  }
});
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
const $mainWiewingWeek = document.getElementsByClassName('day-header__week')[0];
const $mainWiewingDay = document.getElementsByClassName('day-header__date')[0];
const $mainWiewingDayName = document.getElementsByClassName('day-header__name')[0];
let mainWiewingDay = moment();


/*
$mainWiewingDay.addEventListener('keyup', ({key, target}) => {
*/

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

const mainWiewingDayOnInput = () => {
  mainWiewingDay = moment($mainWiewingDay.value);
  $mainWiewingWeek.innerHTML = `${mainWiewingDay.format('Wo')} week`;
  $mainWiewingDayName.innerHTML = makeMainWiewingDayName();
};

const changeMainWiewingDay = days => {
  mainWiewingDay.add('days', days);
  $mainWiewingDay.value = mainWiewingDay.format('YYYY-MM-DD');
  $mainWiewingWeek.innerHTML = `${mainWiewingDay.format('Wo')} week`;
  $mainWiewingDayName.innerHTML = makeMainWiewingDayName();
};

const makeMainWiewingDayName = () => {
  return (Math.abs(moment().diff(mainWiewingDay, 'days')) < 1) ? 
    mainWiewingDay.calendar().split(' ')[0] :
    mainWiewingDay.fromNow();
};

const incrMainWiewingDay = () => changeMainWiewingDay(1);
const decrMainWiewingDay = () => changeMainWiewingDay(-1);

const init = () => {
  changeMainWiewingDay(0);
  document.getElementsByClassName('task__task-date')[0].innerHTML = NowMoment.format('HH : MM');  //temporary
  $mainDatePrevBtn.addEventListener('click', decrMainWiewingDay);
  $mainDateNextBtn.addEventListener('click', incrMainWiewingDay);
  $mainWiewingDay.addEventListener('input', mainWiewingDayOnInput);
  $buttonNew.addEventListener('click', buttonNewOnClick);
  $taskEditButtonBack.addEventListener('click', taskEditButtonBackOnClick);
  $buttonNew.addEventListener('click', buttonNewOnClick);
};

init();