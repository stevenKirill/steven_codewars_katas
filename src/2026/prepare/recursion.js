const company = {
  name: "Главный офис",
  employees: [{ name: "Ольга", salary: 3000 }],
  subDepartments: [
    {
      name: "Разработка",
      employees: [
        { name: "Кирилл", salary: 5000 },
        { name: "Анна", salary: 4500 },
      ],
      subDepartments: [
        {
          name: "Frontend",
          employees: [{ name: "Игорь", salary: 6000 }],
          subDepartments: [], // Пустой подотдел
        },
      ],
    },
    {
      name: "Продажи",
      employees: [{ name: "Олег", salary: 4000 }],
      subDepartments: [],
    },
  ],
};



// Напишите функцию findEmployee(department, targetName),
// которая принимает объект отдела (сначала весь company)
// и имя сотрудника, которого нужно найти.

function findEmployee(department, targetName) {
  // 1. Сначала проверяем сотрудников в текущем отделе
  for (const person of department.employees) {
    if (person.name === targetName) {
      return person; // Нашли! Выходим из функции и возвращаем объект
    }
  }

  // 2. Если здесь не нашли, перебираем подотделы (если они есть)
  if (department.subDepartments && department.subDepartments.length > 0) {
    for (const subDept of department.subDepartments) {
      // Вызываем функцию рекурсивно для ОДНОГО подотдела (передаем объект subDept)
      const result = findEmployee(subDept, targetName);

      // Если на глубине сотрудник нашелся (result не null),
      // то прокидываем его наверх и завершаем функцию
      if (result !== null) {
        return result;
      }
    }
  }

  // 3. Если ни в текущем отделе, ни во всех вложенных ничего не нашлось
  return null;
}


// Тест 1: Поиск на самом верхнем уровне
console.log(findEmployee(company, "Ольга"));
// Ожидается объект: { name: "Ольга", salary: 3000 }

// Тест 2: Поиск на втором уровне вложенности
console.log(findEmployee(company, "Кирилл"));
// Ожидается объект: { name: "Кирилл", salary: 5000 }

// Тест 3: Поиск на самом глубоком уровне
console.log(findEmployee(company, "Игорь"));
// Ожидается объект: { name: "Игорь", salary: 6000 }

// Тест 4: Сотрудник не существует
console.log(findEmployee(company, "Светлана"));
// Ожидается: null
