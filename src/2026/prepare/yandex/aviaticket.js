/**
 * Для тестирования можно пользоваться моком функции fetchFlights
 *
 * ```
 * const FLIGHTS = {
 *  A: ['B', 'D'],
 *  B: ['C', 'N', 'Z'],
 *  D: ['E', 'F'],
 *  F: ['S']
 * };
 *
 * const fetchFlights = (from) => Promise.resolve(FLIGHTS[from]);
 * ```
 */

// из A в N
/**
 * Для тестирования можно пользоваться моком функции fetchFlights
 *
 * ```
 * const FLIGHTS = {
 *  A: ['B', 'D'],
 *  B: ['C', 'N', 'Z'],
 *  D: ['E', 'F'],
 *  F: ['S']
 * };
 *
 * const fetchFlights = (from) => Promise.resolve(FLIGHTS[from]);
 * ```
 */

/**
 * Для тестирования можно пользоваться моком функции fetchFlights
 *
 * ```
 * const FLIGHTS = {
 *  A: ['B', 'D'],
 *  B: ['C', 'N', 'Z'],
 *  D: ['E', 'F'],
 *  F: ['S']
 * };
 *
 * const fetchFlights = (from) => Promise.resolve(FLIGHTS[from]);
 * ```
 */

export async function findPath(from, to, fetchFlights) {
  if (from === to) return [from];

  const parentMap = new Map(); // Храним только: текущий -> откуда пришли
  const queue = [from];
  parentMap.set(from, null);

  let head = 0; // Используем указатель вместо shift(), чтобы не пересоздавать массив (экономия памяти)

  while (head < queue.length) {
    const current = queue[head++];

    const destinations = await fetchFlights(current);
    if (!destinations) continue;

    for (let i = 0; i < destinations.length; i++) {
      const next = destinations[i];

      if (!parentMap.has(next)) {
        parentMap.set(next, current);

        if (next === to) {
          // Маршрут найден, восстанавливаем его с конца
          const path = [];
          let curr = to;
          while (curr !== null) {
            path.push(curr);
            curr = parentMap.get(curr);
          }
          return path.reverse();
        }

        queue.push(next);
      }
    }

    // Опционально: если дерево очень глубокое, можно ограничивать размер очереди
    // или очищать ссылки, но для 64МБ Map с родителями — самый экономный вариант.
  }

  return [];
}

// {
//   "from": "A",
//   "to": "N",
//   "flights": {
//     "A": [
//       "B",
//       "D"
//     ],
//     "B": [
//       "C",
//       "N",
//       "Z"
//     ],
//     "D": [
//       "E",
//       "F"
//     ],
//     "F": [
//       "S"
//     ]
//   }
// }

// ["A","B","N"]
