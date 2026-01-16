const employees = [
  {
    name: "Andrew Clark",
    level: "junior",
    monthlyWage: 5000,
    tenure: 2,
  },
  {
    name: "Dan Abramov",
    level: "middle",
    monthlyWage: 6000,
    tenure: 4,
  },
  {
    name: "Sebastian Markbåge",
    level: "teamlead",
    monthlyWage: 10000,
    tenure: 10,
  },
  {
    name: "Sophie Alpert",
    level: "senior",
    monthlyWage: 9000,
    tenure: 9,
  },
  {
    name: "Tianyu Yao",
    level: "middle",
    monthlyWage: 7000,
    tenure: 3,
  },
];

function totalIncome(employees) {
  let res = 0;
  for (let i = 0; i < employees.length; i++) {
    let all = employees[i].monthlyWage * 12;
    if (employees[i].level === "junior") {
      res += all;
    }
    if (employees[i].level === "middle") {
      res += all * 1.1;
    }
    if (employees[i].level === "senior") {
      res += all * (1.1 + 0.05 * employees[i].tenure);
    }
    if (employees[i].level === "teamlead") {
      res += all * (1.2 + 0.1 * employees[i].tenure);
    }
  }
  return Math.round(res);
}
