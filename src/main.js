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
const $menueButtons = document.getElementsByClassName('footer-button');
const $buttonNew = $menueButtons[0];
const $taskEditButtonBack = document.getElementsByClassName('task-edit_button-back')[0];

document.getElementsByClassName('day-header__date')[0].innerHTML = NowMoment.format('D MMM YYYY');
document.getElementsByClassName('day-header__week')[0].innerHTML = `${NowMoment.format('Wo')} week`;
document.getElementsByClassName('task__task-date')[0].innerHTML = NowMoment.format('HH : MM');

const init = () => {
  $buttonNew.addEventListener('click', () => {
    document.getElementsByClassName('task-edit')[0].classList.toggle('hidden');
    document.getElementsByClassName('main-view')[0].classList.toggle('hidden');
    $buttonNew.setAttribute('disabled', '');
  });
  $taskEditButtonBack.addEventListener('click', () => {
    document.getElementsByClassName('task-edit')[0].classList.toggle('hidden');
    document.getElementsByClassName('main-view')[0].classList.toggle('hidden');
    $buttonNew.removeAttribute('disabled');
  });
};

init();