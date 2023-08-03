// Даны два отсортированных списка с временными интервалами, когда пользователи были в сети.
// Начало интервала строго меньше конца. Напишите функцию, которая находит интервалы, когда
// оба пользователя были онлайн.


function intersection(list1, list2) {
  let result = [];
  let i = 0;
  let j = 0;

  while (i < list1.length && j < list2.length) {
    const [start1, end1] = list1[i];
    const [start2, end2] = list2[j];

    // Находим пересечение интервалов
    const startIntersect = Math.max(start1, start2);
    const endIntersect = Math.min(end1, end2);

    if (startIntersect < endIntersect) {
      result.push([startIntersect, endIntersect]);
    }
    // Увеличиваем указатель для интервала, который закончился раньше
    if (end1 < end2) {
      i++;
    } else {
      j++;
    }
  }

  return result;
}

console.log(intersection(
  [[8, 12], [17, 22]],
  [[5, 11], [14, 18], [20, 23]]
)) // [[8, 11], [17, 18], [20, 22]]

console.log(intersection(
  [[9, 15], [18, 21]],
  [[10, 14], [21, 22]]
)) // [[10, 14]]
