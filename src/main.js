import 'bootstrap';
import moment from 'moment';
import transform from 'moment-transform';

//const taskDateTypes = {up-to: 'log-in', all-day: 'unchecked', start-from: 'log-out'};
//const taskTypes = {case: 'briefcase', call: 'earphone', trip: 'road'};
const taskList = (localStorage.getItem('taskList') === null) ? [] : JSON.parse(localStorage.getItem('taskList'));
console.log(taskList);

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
const mainWiewingDay = moment();

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
  const newTask = ceateNewTaskInTaskListArray();
  if (newTask.date === mainWiewingDay.format('YYYY-MM-DD')) {
    renderTasks();
  }
  taskEditButtonBackOnClick ();
};

const mainWiewingDayOnInput = () => {
  mainWiewingDay.transform($mainWiewingDay.value, 'YYYY-MM-DD');
  changeMainWiewingDay(0);
};

const findFormValue = form => {
  return Array.from(document.getElementsByClassName(form)).
    find(r => r.checked).value;
};

const ceateNewTaskInTaskListArray = () => {
  const date = new Date(`${$taskEditDate.value} ${$taskEditTime.value}`);
  const newTask = {
    datePrimitive: date.valueOf(),
    date: $taskEditDate.value,
    time: $taskEditTime.value,
    taskHeader: $taskEditTaskHeader.value.trim(), 
    taskDetails: $taskEditTaskDetails.value.trim(), 
    taskDateType: findFormValue('form-date-types-input'),
    taskType: findFormValue('form-task-types-input'),
    deleated: false
  };
  taskList.push(newTask);
  taskList.sort((a,b) => (a.datePrimitive > b.datePrimitive) ? 1 :
    ((b.datePrimitive > a.datePrimitive) ? -1 : 0));
  localStorage.setItem('taskList', JSON.stringify(taskList));
  return newTask;
};

const makeMainWiewingDayName = () => {
  return (Math.abs(moment().diff(mainWiewingDay, 'days')) < 1) ?
    mainWiewingDay.calendar().split(' ')[0] :
    mainWiewingDay.fromNow();
};

const changeMainWiewingDay = day => {
  mainWiewingDay.add(day, 'days');
  renderMainWiewingDay();  
  renderTasks();
};

const incrMainWiewingDay = () => changeMainWiewingDay(1);
const decrMainWiewingDay = () => changeMainWiewingDay(-1);

const createHtmlTask = (objectTask, taskNumber, backgroundColor) => {
  const $task = document.createElement('div');
  $task.className = `task ${backgroundColor}`;
  $task.dataset.taskNumber = taskNumber;
  $task.innerHTML = `
    <div class="task__task-main">
      <div class="task__task-date-type ">
        <img src="src/images/${objectTask.taskDateType}.svg" height="16" width="16"></img>
      </div>
      <div class="task__task-date">${objectTask.time}</div>
      <div class="task__task-type">
      <img src="src/images/${objectTask.taskType}.svg" height="16" width="16"></img>
      </div>
      <div class="task__task-header">${objectTask.taskHeader}</div>
      <button type="button" class="task__task-edit-button btn btn-outline-warning">
        <img src="src/images/pencil.svg" height="16" width="16"></img>
      </button> 
      <button type="button" class="task__task-deleat-button btn btn-outline-danger">
        <img src="src/images/remove.svg" height="16" width="16"></img>
      </button>
    </div>              
    <div class="task__task-details">${objectTask.taskDetails}</div>
  `;
  return $task;
};

const addRemoveTaskListener = () => {
  $tasksContainer.addEventListener('click', event => {
    let {target} = event;
    if (target.parentElement.classList.contains('task__task-deleat-button')) { 
      target = target.parentElement;
    }
    const isRemoveBtnClicked = target.classList.contains('task__task-deleat-button');
    const $task = target.parentElement.parentElement;
    const indexOfRemovedTaskNumber = $task.getAttribute('data-taskNumber');
  
    if (isRemoveBtnClicked) {
      $tasksContainer.removeChild($task);
      taskList.splice(indexOfRemovedTaskNumber, 1);
      localStorage.setItem('taskList', JSON.stringify(taskList));
    }
  });
};

const renderMainWiewingDay = () => {
  $mainWiewingDay.value = mainWiewingDay.format('YYYY-MM-DD');
  $mainWiewingWeek.innerHTML = `${mainWiewingDay.format('Wo')} week`;
  $mainWiewingDayName.innerHTML = makeMainWiewingDayName();
};

const renderTasks = () => {
  $tasksContainer.innerHTML = '';
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].date === mainWiewingDay.format('YYYY-MM-DD')) {
      const backgroundColor = (taskList[i].datePrimitive < Date.now().valueOf()) ?
        'background--grey' : 'background--green';
      const newHtmlTask = createHtmlTask(taskList[i], i, backgroundColor);
      $tasksContainer.appendChild(newHtmlTask);
    }  
  }
};

const init = () => {
  renderMainWiewingDay();
  renderTasks();
  $mainDatePrevBtn.addEventListener('click', decrMainWiewingDay);
  $mainDateNextBtn.addEventListener('click', incrMainWiewingDay);
  $mainWiewingDay.addEventListener('input', mainWiewingDayOnInput);
  $buttonNew.addEventListener('click', buttonNewOnClick);
  $taskEditButtonBack.addEventListener('click', taskEditButtonBackOnClick);
  $taskEditButtonSave.addEventListener('click', taskEditButtonSaveOnClick);
  addRemoveTaskListener();
};

init();