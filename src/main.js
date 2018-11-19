const NowMoment = moment();

//const taskDateTypes = {up-to: 'log-in', all-day: 'unchecked', start-from: 'log-out'};
//const taskTypes = {0: 'briefcase', 1: 'earphone', 2: 'road'};
const taskList = [{
  date: 1000000000000, 
  taskHeader: 'Some task header 1', 
  taskDetails: 'some task details details details details details 1', 
  taskDateType: 2, 
  taskType: 1,
  deleated: false}, {
  date: 2000000000000, 
  taskHeader: 'Some task header 1', 
  taskDetails: 'some task details details details details details 1', 
  taskDateType: 2, 
  taskType: 1,
  deleated: false}];

const $$menueButtons = document.getElementsByClassName('footer-button');
const $buttonNew = $$menueButtons[0];
const $tasksContainer = document.getElementsByClassName('tasks-container')[0];
const $taskEditButtonBack = document.getElementsByClassName('task-edit_button-back')[0];
const $taskEditButtonSave = document.getElementsByClassName('task-edit_button-save')[0];
const $mainDatePrevBtn = document.getElementsByClassName('main-date__prev-btn')[0];
const $mainDateNextBtn = document.getElementsByClassName('main-date__next-btn')[0];
const $mainWiewingWeek = document.getElementsByClassName('day-header__week')[0];
const $mainWiewingDay = document.getElementsByClassName('day-header__date')[0];
const $mainWiewingDayName = document.getElementsByClassName('day-header__name')[0];
const $$taskEditTypesInput = document.getElementsByClassName('form-task-types-input');
const $taskEditTime = document.getElementsByClassName('task-edit__time')[0];
const $taskEditDate = document.getElementsByClassName('task-edit__date')[0];
const $$taskEditdDateTypes = document.getElementsByClassName('form-date-types-input');
const $taskEditTaskHeader = document.getElementsByClassName('task-edit__task-header')[0];
const $taskEditHeaderError = document.getElementsByClassName('task-edit__header-error')[0];
const $taskEditTaskDetails = document.getElementsByClassName('task-edit__task-details')[0];
let mainWiewingDay = moment();

const buttonNewOnClick = () => {
  document.getElementsByClassName('task-edit')[0].classList.toggle('hidden');
  document.getElementsByClassName('main-view')[0].classList.toggle('hidden');
  $buttonNew.setAttribute('disabled', '');
  taskEditFormReset();
};

const taskEditButtonBackOnClick = () => {
  document.getElementsByClassName('task-edit')[0].classList.toggle('hidden');
  document.getElementsByClassName('main-view')[0].classList.toggle('hidden');
  $buttonNew.removeAttribute('disabled');
};

const taskEditFormReset= () => {
  $$taskEditTypesInput[0].checked = true;
  $taskEditTime.value = moment().format('HH:mm');
  $taskEditDate.value = moment().format('YYYY-MM-DD');
  $$taskEditdDateTypes[2].checked = true;
  $taskEditTaskHeader.value = '';
  $taskEditTaskDetails.value = '';
  $taskEditHeaderError.classList.add('invisible');
};

const taskEditButtonSaveOnClick = () => {
  if ($taskEditTaskHeader.value.length < 4) {
    $taskEditHeaderError.classList.remove('invisible')
    return ;
  };
  const date = new Date(`${$taskEditDate.value} ${$taskEditTime.value}`);
  const newTask = {
    datePrimitive: date.valueOf(),
    date: $taskEditDate.value,
    time: $taskEditTime.value,
    taskHeader: $taskEditTaskHeader.value, 
    taskDetails: $taskEditTaskDetails.value, 
    taskDateType: finfFormValue('form-date-types-input'), 
    taskType: finfFormValue('form-task-types-input'),
    deleated: false};
  const $task = createHtmlTask(newTask);
  $tasksContainer.appendChild($task);
  taskList.push(newTask);
  taskEditButtonBackOnClick ();

  console.log(taskList[taskList.length - 1]);
  
  console.log($taskEditTaskHeader.value.length);

};

const mainWiewingDayOnInput = () => {
  mainWiewingDay = moment($mainWiewingDay.value);
  $mainWiewingWeek.innerHTML = `${mainWiewingDay.format('Wo')} week`;
  $mainWiewingDayName.innerHTML = makeMainWiewingDayName();
};

const makeMainWiewingDayName = () => {
  return (Math.abs(moment().diff(mainWiewingDay, 'days')) < 1) ? 
    mainWiewingDay.calendar().split(' ')[0] :
    mainWiewingDay.fromNow();
};

const changeMainWiewingDay = days => {
  mainWiewingDay.add('days', days);
  $mainWiewingDay.value = mainWiewingDay.format('YYYY-MM-DD');
  $mainWiewingWeek.innerHTML = `${mainWiewingDay.format('Wo')} week`;
  $mainWiewingDayName.innerHTML = makeMainWiewingDayName();
};

const incrMainWiewingDay = () => changeMainWiewingDay(1);
const decrMainWiewingDay = () => changeMainWiewingDay(-1);

const finfFormValue = (form) => {
  return Array.from(document.getElementsByClassName(form)).
    find(r => r.checked).value;
};

const createHtmlTask = (objectTask) => {
  const $task = document.createElement('div');
  $task.className = 'task';
  $task.innerHTML = `
    <div class="task__task-main">
      <div class="task__task-date-type ">
        <span class="glyphicon glyphicon-${objectTask.taskDateType}"></span>
      </div>
      <div class="task__task-date">${objectTask.time}</div>
      <div class="task__task-header">${objectTask.taskHeader}</div>
      <div class="task__task-type">
        <span class="glyphicon glyphicon-${objectTask.taskType}"></span>
      </div>
      <div class="task__task-edit-button">
        <span class="glyphicon glyphicon-cog"></span>
      </div>
      <div class="task__task-deleat-button">
        <span class="glyphicon glyphicon-remove"></span>
      </div>
    </div>              
    <div class="task__task-details">${objectTask.taskDetails}</div>
  `;
  return $task;
}

const init = () => {
  changeMainWiewingDay(0);
  //document.getElementsByClassName('task__task-date')[0].innerHTML = NowMoment.format('HH : MM');  //temporary
  $mainDatePrevBtn.addEventListener('click', decrMainWiewingDay);
  $mainDateNextBtn.addEventListener('click', incrMainWiewingDay);
  $mainWiewingDay.addEventListener('input', mainWiewingDayOnInput);
  $buttonNew.addEventListener('click', buttonNewOnClick);
  $taskEditButtonBack.addEventListener('click', taskEditButtonBackOnClick);
  $taskEditButtonSave.addEventListener('click', taskEditButtonSaveOnClick);
  $buttonNew.addEventListener('click', buttonNewOnClick);
};

init();