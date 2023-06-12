/*Функция для проверки длины строки. Она принимает строку, которую нужно проверить, и максимальную длину и возвращает true, если строка меньше или равна указанной длине, и false, если строка длиннее.

Для решения этой задачи вам потребуется объявить функцию с двумя параметрами: строкой и максимальной длиной. В теле функции используйте оператор сравнения меньше или равно (<=), чтобы сравнить длину полученной строки (свойство length) с максимальной длиной. Функция должна вернуть результат этого сравнения.*/


const stringLengthCheck = (string, maxLength) => string.length <= maxLength;

// Cтрока короче 20 символов
stringLengthCheck('проверяемая строка', 20); // true

// Длина строки ровно 18 символов
stringLengthCheck('проверяемая строка', 18); // true

// Строка длиннее 10 символов
stringLengthCheck('проверяемая строка', 10); // false

const checkPalindrome = (string) => {
  const normalizedString = string.toLowerCase().replaceAll(' ', '');
  const lastIndex = normalizedString.length - 1;
  for (let i = 0; i <= normalizedString.length / 2 ; i++) {
    if (normalizedString[i] === normalizedString[lastIndex - i]) {
      return true;
    }
    return false;
  }
};

// Строка является палиндромом
checkPalindrome('топот'); // true
// Несмотря на разный регистр, тоже палиндром
checkPalindrome('ДовОд'); // true
// Это не палиндром
checkPalindrome('Кекс'); // false
