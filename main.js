let columns = ['ФИО', 'Факультет', 'ДР и возраст', 'Годы обучения']

let allStudents = [
  {name: 'Иван', lastname: 'Иванов', middlename: 'Иванович',
  birthdate: new Date('1983-01-01'), entryYear: 2000, faculty: 'лингвистика'},
  {name: 'Ольга', lastname: 'Потапова', middlename: 'Сергеевна',
  birthdate: new Date('1999-03-25'), entryYear: 2016, faculty: 'физика'},
  {name: 'Мария', lastname: 'Потапова', middlename: 'Сергеевна',
  birthdate: new Date('1999-03-25'), entryYear: 2017, faculty: 'лингвистика'},
  {name: 'Николай', lastname: 'Жук', middlename: 'Алексеевич',
  birthdate: new Date('2005-07-21'), entryYear: 2021, faculty: 'экология'},
  {name: 'Александра', lastname: 'Мельникова', middlename: 'Никитична',
  birthdate: new Date('2003-09-04'), entryYear: 2019, faculty: 'культурология'},
  {name: 'Николай', lastname: 'Медведев', middlename: 'Анатольевич',
  birthdate: new Date('1980-12-30'), entryYear: 1998, faculty: 'энергетика'},
]

let currentStudents = allStudents;

// let container = document.getElementsByClassName('container');
let container = document.createElement('div');
container.classList.add('container');

let tableHead = document.getElementById('studentsTable').tHead.rows[0];
let sortInfo = {fio: -1, faculty: -1, bd: -1, studyYears: -1}

let entryFields = {'имя': 'Имя студента', 'фамилия': 'Фамилия студента', 
'отчество': 'Отчество студента', 'дата_рождения': 'Дата рождения', 
'год_начала_обучения': 'Год начала обучения', 'факультет': 'Факультет студента'}

const toggleSortInfo = (columnName) => {
  for (let name of ['fio', 'faculty', 'bd', 'studyYears']) {
    if (name === columnName) {
      sortInfo[name] = -sortInfo[name];
    } else {
      sortInfo[name] = -1;
    }
  }
}

const sortByName = () => {
  currentStudents.sort((x1, x2) => {
    let FIO1 = `${x1.name} ${x1.lastname} ${x1.middlename}`;
    let FIO2 = `${x2.name} ${x2.lastname} ${x2.middlename}`;
    if (FIO1 > FIO2) {return -sortInfo.fio}
    if (FIO1 < FIO2) {return sortInfo.fio}
    return 0;
  });

  toggleSortInfo('fio');

  createTable(currentStudents);
}

const sortByFaculty = () => {
  currentStudents.sort((x1, x2) => {
    if (x1.faculty > x2.faculty) {return -sortInfo.faculty}
    if (x1.faculty < x2.faculty) {return sortInfo.faculty}
    return 0;
  });

  toggleSortInfo('faculty');

  createTable(currentStudents);
}

const sortByBd = () => {
  currentStudents.sort((x1, x2) => {
    if (x1.birthdate > x2.birthdate) {return -sortInfo.bd}
    if (x1.birthdate < x2.birthdate) {return sortInfo.bd}
    return 0;
  });

  toggleSortInfo('bd');

  createTable(currentStudents);
}

const sortByStudyYears = () => {
  currentStudents.sort((x1, x2) => {
    if (x1.entryYear > x2.entryYear) {return -sortInfo.studyYears}
    if (x1.entryYear < x2.entryYear) {return sortInfo.studyYears}
    return 0;
  });

  toggleSortInfo('studyYears');

  createTable(currentStudents);
}

tableHead.cells[0].addEventListener('click', sortByName);
tableHead.cells[1].addEventListener('click', sortByFaculty);
tableHead.cells[2].addEventListener('click', sortByBd);
tableHead.cells[3].addEventListener('click', sortByStudyYears);

const getAge = (birthDate) => {
  let today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  let m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

const getStudyYears = (entryYear) => {
  let graduationYear =  entryYear + 4;
  let entryDate = new Date (entryYear, 09, 01);
  let classYear = getAge(entryDate) + 1;
  if (classYear > 4) {
    return `${entryYear}-${graduationYear} (закончил)`;
  }
  return `${entryYear}-${graduationYear} (${classYear} курс)`;
}

const createRow = (s) => {
  let FIO = `${s.name} ${s.lastname} ${s.middlename}`;
  let faculty = s.faculty;
  let bd = s.birthdate;
  let old = `${bd.getDate()}.${bd.getMonth() + 1}.${bd.getFullYear()} (${getAge(bd)} лет)`
  let studyYears = getStudyYears(s.entryYear);
  return [FIO, faculty, old, studyYears];
}

const createTable = (students) => {
  let body = document.body;
  let table = document.getElementById('studentsTable');
  table.removeChild(table.children[1]);
  // table = document.createElement('table');
  // table.id = 'studentsTable';
  // let thead = table.createTHead();
  // let row = thead.insertRow(0);
  // for (let i = 0; i < 4; i++) {
  //   cell = row.insertCell(i);
  //   cell.innerHTML = columns[i];
  // }
  let tbody = table.createTBody();
  for (let i = 0; i < students.length; i++) {
    row = tbody.insertRow(i);
    let studentInfo = createRow(students[i]);
    for(let j = 0; j < 4; j++) {
      cell = row.insertCell(j);
      cell.innerHTML = studentInfo[j];
    }
  }
  container.appendChild(table)
  body.append(container);
  currentStudents = students;
}

const createFilters = () => {
  let findStudentForm = document.createElement('div');
  findStudentForm.classList.add('findStudentForm');
  let h3 = document.createElement('h3');
  h3.textContent = 'Найти студента';
  let filtersForm = document.createElement('div');
  filtersForm.classList.add('filtersForm');
  

  let filterName = document.createElement('input');
  filterName.classList.add('filterName');
  filterName.placeholder = 'ФИО студента';

  let filterFaculty = document.createElement('input');
  filterFaculty.classList.add('filterFaculty');
  filterFaculty.placeholder = 'Факультет';

  let filterEntryYear = document.createElement('input');
  filterEntryYear.classList.add('filterEntryYear');
  filterEntryYear.type = 'number';
  filterEntryYear.placeholder = 'Год начала обучения';

  let filterGraduationYear = document.createElement('input');
  filterGraduationYear.classList.add('filterGraduationYear');
  filterGraduationYear.type = 'number';
  filterGraduationYear.placeholder = 'Год окончания обучения';

  filtersForm.append(filterName, filterFaculty, filterEntryYear, filterGraduationYear);
  findStudentForm.append(h3, filtersForm);
  container.append(findStudentForm);
  document.body.append(container);

  return {filterName: filterName, filterFaculty: filterFaculty,
  filterEntryYear: filterEntryYear, filterGraduationYear: filterGraduationYear};
}

let filters = createFilters();

const filterByNames = (request, students) => {
  //let condition = filterString.split(' ').some(str => str.includes(request));
  let correctStudents = [];
  for (let i = 0; i < students.length; i++) {
    let fioStudent = [students[i].name, students[i].lastname, students[i].middlename];
    let condition = fioStudent.some(str => str.includes(request));
    if (condition) {
      correctStudents.push(students[i])
    }
  }
  return correctStudents
};

const filterByFaculty = (request, students) => {
  let correctStudents = [];
  for (let i = 0; i < students.length; i++) {
    let condition = students[i].faculty.includes(request);
    if (condition) {
      correctStudents.push(students[i])
    }
  }
  return correctStudents;
}

const filterByYears = (request, students) => {
  let correctStudents = [];
  let condition;
  for (let i = 0; i < students.length; i++) {
    condition = students[i].entryYear === request;
    if (condition) {
      correctStudents.push(students[i])
    }
  }
  return correctStudents;
}

const globalFilter = (e) => {
  let filteredStudets = filterByNames(filters.filterName.value, allStudents);
  filteredStudets = filterByFaculty(filters.filterFaculty.value, filteredStudets);
  let request = filters.filterEntryYear.value;
  if (request !== '') {
    filteredStudets = filterByYears(Number(request), filteredStudets);
  }
  request = filters.filterGraduationYear.value;
  if (request !== '') {
    filteredStudets = filterByYears(Number(request) - 4, filteredStudets);
  }
  
  createTable(filteredStudets);
  e.srcElement.focus();
}

const addEntryFields = () => {
  let addStudentForm = document.createElement('div');
  addStudentForm.classList.add('addStudentForm');
  let h3 = document.createElement('h3');
  h3.textContent = 'Добавить студента';
  let newStudentInfoForm = document.createElement('div');
  newStudentInfoForm.classList.add('newStudentInfoForm');

  let result = {};

  for (let fieldName in entryFields) {
    let k = document.createElement('input');
    k.classList.add(fieldName);
    newStudentInfoForm.append(k);
    k.placeholder = entryFields[fieldName];
    if (entryFields[fieldName] === 'Дата рождения') {
      k.type = 'date';
    }
    if (entryFields[fieldName]=== 'Год начала обучения') {
      k.type = 'number';
    }
    
    result[fieldName] = k;
  }

  let btn = document.createElement('button');
  btn.type = 'submit';
  btn.classList.add('btn');
  btn.innerHTML = '+';
  newStudentInfoForm.append(btn);

  addStudentForm.append(h3, newStudentInfoForm);

  container.append(addStudentForm);
  document.body.append(container);

  result['button'] = btn;

  return result;
}

let newStudentElements = addEntryFields();

const checkInput = () => {
  for (let fieldName in entryFields) {
    let n = newStudentElements[fieldName].value.trim();
    if (n === '') {
      alert(`пустая строка для поля ${fieldName}`);
      return false;
    }
  }
  let date = new Date(newStudentElements['дата_рождения'].value);
  if (date === "Invalid Date") {
    alert(`неверная запись даты дождения`);
    return false;
  }
  if (new Date(1900, 01, 01) > date || date > new Date()) {
    alert(`неверная дата рождения`);
    return false;
  }

  let dataEnter = Number(newStudentElements['год_начала_обучения'].value)
  if (dataEnter < 2000 || dataEnter > (new Date()).getFullYear()) {
    alert(`неверный год начала обучения`);
    return false;
  }
  if (dataEnter > date) {
    alert(`неверный год начала обучения`);
    return false;
  }
  return true;
}

const clearInput = () => {
  for (let fieldName in entryFields) {
    newStudentElements[fieldName].value = '';
  }
}

const addNewStudent = () => {
  if (!checkInput()) {
    return;
  }
  student = {name: newStudentElements['имя'].value, lastname: newStudentElements['фамилия'].value,
  middlename: newStudentElements['отчество'].value, birthdate: new Date(newStudentElements['дата_рождения'].value),
  entryYear: Number(newStudentElements['год_начала_обучения'].value), faculty: newStudentElements['факультет'].value}
  allStudents.push(student);
  createTable(allStudents);
  clearInput()
}

newStudentElements.button.addEventListener('click', addNewStudent);

filters.filterName.addEventListener('input', globalFilter);
filters.filterFaculty.addEventListener('input', globalFilter);
filters.filterEntryYear.addEventListener('input', globalFilter);
filters.filterGraduationYear.addEventListener('input', globalFilter);

// filters.filterName.addEventListener('input', filterByNames);
// filters.filterFaculty.addEventListener('input', filterByFaculty);
// filters.filterEntryYear.addEventListener('input', (e) => filterByYears(e, 'entry'));
// filters.filterGraduationYear.addEventListener('input', (e) => filterByYears(e, 'graduation'));

createTable(allStudents);


