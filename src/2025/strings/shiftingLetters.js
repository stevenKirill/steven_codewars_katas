// Задача:  (https://leetcode.com/problems/minimum-size-subarray-sum/)848. Shifting Letters (https://leetcode.com/problems/shifting-letters/description/)
// Сложность: medium

// Вам дана строка s из строчных букв английского алфавита и целочисленный массив shifts такой же длины.

// Назовем shift() буквы следующей буквой в алфавите (с переходом так, что 'z' становится 'a').
// Например, shift('a') = 'b', shift('t') = 'u', и shift('z') = 'a'.
// Теперь для каждого shifts[i] = x мы хотим сдвинуть первые i + 1 букв строки s на x раз.

// Верните итоговую строку после применения всех таких сдвигов к s.

// Пример:
// Input: s = "abc", shifts = [3,5,9]
// Output: "rpl"
// Explanation: We start with "abc".
// After shifting the first 1 letters of s by 3, we have "dbc".
// After shifting the first 2 letters of s by 5, we have "igc".
// After shifting the first 3 letters of s by 9, we have "rpl", the answer.

// TODO

const shiftingLetters = (s, shifts) => {

};




// 👨‍💻 Алгоритм:

// 1⃣Вычислите общее количество сдвигов для всех символов строки, используя массив shifts.

// 2⃣Пройдите по строке s и примените вычисленные сдвиги к каждому символу, начиная с первого и уменьшая количество сдвигов на текущем шаге.

// 3⃣Постройте и верните итоговую строку после всех сдвигов.

// 😎 Решение:
// var shiftingLetters = function(s, shifts) {
//     let totalShifts = shifts.reduce((sum, shift) => (sum + shift) % 26, 0);
//     const sArray = s.split('');

//     for (let i = 0; i < sArray.length; i++) {
//         let newCharValue = (sArray[i].charCodeAt(0) - 'a'.charCodeAt(0) + totalShifts) % 26;
//         sArray[i] = String.fromCharCode(newCharValue + 'a'.charCodeAt(0));
//         totalShifts = (totalShifts - shifts[i] + 26) % 26;
//     }

//     return sArray.join('');
// };

// Ставь 👍 (https://t.me/eo_test_task_bot) и забирай 📚 (https://t.me/eo_test_task_bot) Базу знаний (https://t.me/easy_frontend_task/399)



