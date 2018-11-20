//const taskDateTypes = {up-to: 'log-in', all-day: 'unchecked', start-from: 'log-out'};
//const taskTypes = {case: 'briefcase', call: 'earphone', trip: 'road'};
const taskList = [{
  date: '2018-11-19',
  datePrimitive: 1542659940000,
  deleated: false,
  taskDateType: 'log-out',
  taskDetails: 'app details. Task started from specified hours',
  taskHeader: 'app header',
  taskType: 'briefcase',
  time: '22:39'
},
{
  date: '2018-11-20',
  datePrimitive: 1542746640000,
  deleated: false,
  taskDateType: 'log-out',
  taskDetails: 'app details. Task started from specified hours',
  taskHeader: 'app header',
  taskType: 'earphone',
  time: '22:44'
},
{
  date: '2018-11-19',
  datePrimitive: 1542659940000,
  deleated: false,
  taskDateType: 'log-in',
  taskDetails: 'app details. Task started from specified hours bbbbbbbbbbbbbbbbbbbbbbbbbbb',
  taskHeader: 'app header another',
  taskType: 'road',
  time: '22:39'
}];

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

const taskEditFormReset = () => {
  $$taskEditTypesInput[0].checked = true;
  $taskEditTime.value = mainWiewingDay.format('HH:mm');
  $taskEditDate.value = mainWiewingDay.format('YYYY-MM-DD');
  $$taskEditdDateTypes[2].checked = true;
  $taskEditTaskHeader.value = '';
  $taskEditTaskDetails.value = '';
  $taskEditHeaderError.classList.add('invisible');
};

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

const taskEditButtonSaveOnClick = () => {
  if ($taskEditTaskHeader.value.length < 4) {
    $taskEditHeaderError.classList.remove('invisible');
    return ;
  }
  const newObjectTask = ceateNewTaskInTaskListArray();
  const newHtmlTask = createHtmlTask(newObjectTask);
  $tasksContainer.appendChild(newHtmlTask);
  taskEditButtonBackOnClick ();
};

const mainWiewingDayOnInput = () => {
  mainWiewingDay = moment($mainWiewingDay.value);
  $mainWiewingWeek.innerHTML = `${mainWiewingDay.format('Wo')} week`;
  $mainWiewingDayName.innerHTML = makeMainWiewingDayName();
  renderTasks(mainWiewingDay.format('YYYY-MM-DD'));
};

const ceateNewTaskInTaskListArray = () => {
  const date = new Date(`${$taskEditDate.value} ${$taskEditTime.value}`);
  const newTask = {
    datePrimitive: date.valueOf(),
    date: $taskEditDate.value,
    time: $taskEditTime.value,
    taskHeader: $taskEditTaskHeader.value, 
    taskDetails: $taskEditTaskDetails.value, 
    taskDateType: findFormValue('form-date-types-input'),
    taskType: findFormValue('form-task-types-input'),
    deleated: false
  };
  taskList.push(newTask);
  taskList.sort((a,b) => (a.datePrimitive > b.datePrimitive) ? 1 :
    ((b.datePrimitive > a.datePrimitive) ? -1 : 0));
  return newTask;
};

const makeMainWiewingDayName = () => {
  return (Math.abs(moment().diff(mainWiewingDay, 'days')) < 1) ? 
    mainWiewingDay.calendar().split(' ')[0] :
    mainWiewingDay.fromNow();
};

const changeMainWiewingDay = day => {
  mainWiewingDay.add('days', day);
  renderMainWiewingDay();  
  renderTasks(mainWiewingDay.format('YYYY-MM-DD'));
};

const incrMainWiewingDay = () => changeMainWiewingDay(1);
const decrMainWiewingDay = () => changeMainWiewingDay(-1);

const findFormValue = form => {
  return Array.from(document.getElementsByClassName(form)).
    find(r => r.checked).value;
};

const createHtmlTask = objectTask => {
  const $task = document.createElement('div');
  $task.className = 'task';
  $task.innerHTML = `
    <div class="task__task-main">
      <div class="task__task-date-type ">
        <span class="glyphicon glyphicon-${objectTask.taskDateType}"></span>
      </div>
      <div class="task__task-date">${objectTask.time}</div>
      <div class="task__task-type">
      <span class="glyphicon glyphicon-${objectTask.taskType}"></span>
      </div>
      <div class="task__task-header">${objectTask.taskHeader}</div>
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
};

const renderMainWiewingDay = () => {
  $mainWiewingDay.value = mainWiewingDay.format('YYYY-MM-DD');
  $mainWiewingWeek.innerHTML = `${mainWiewingDay.format('Wo')} week`;
  $mainWiewingDayName.innerHTML = makeMainWiewingDayName();
};

const renderTasks = day => {
  $tasksContainer.innerHTML = '';
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].date === day) {
      const newHtmlTask = createHtmlTask(taskList[i]);
      $tasksContainer.appendChild(newHtmlTask);
    }
  }
};

const init = () => {
  renderMainWiewingDay();
  renderTasks(mainWiewingDay.format('YYYY-MM-DD'));
  $mainDatePrevBtn.addEventListener('click', decrMainWiewingDay);
  $mainDateNextBtn.addEventListener('click', incrMainWiewingDay);
  $mainWiewingDay.addEventListener('input', mainWiewingDayOnInput);
  $buttonNew.addEventListener('click', buttonNewOnClick);
  $taskEditButtonBack.addEventListener('click', taskEditButtonBackOnClick);
  $taskEditButtonSave.addEventListener('click', taskEditButtonSaveOnClick);
};

init();