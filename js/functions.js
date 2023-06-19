/*Функция для проверки длины строки. Она принимает строку, которую нужно проверить, и максимальную длину и возвращает true, если строка меньше или равна указанной длине, и false, если строка длиннее.

Для решения этой задачи вам потребуется объявить функцию с двумя параметрами: строкой и максимальной длиной. В теле функции используйте оператор сравнения меньше или равно (<=), чтобы сравнить длину полученной строки (свойство length) с максимальной длиной. Функция должна вернуть результат этого сравнения.*/


const checkStringLength = (string, maxLength) => string.length <= maxLength;

// Cтрока короче 20 символов
window.console.log(checkStringLength('проверяемая строка', 20));
// true

// Длина строки ровно 18 символов
window.console.log(checkStringLength('проверяемая строка', 18));
// true

// Строка длиннее 10 символов
window.console.log(checkStringLength('проверяемая строка', 10));
// false

const isPalindrome = (string) => {
  const normalizedString = string.toLowerCase().replaceAll(' ', '');
  const lastIndex = normalizedString.length - 1;
  for (let i = 0; i <= normalizedString.length / 2; i++) {
    if (normalizedString[i] === normalizedString[lastIndex - i]) {
      return true;
    }
    return false;
  }
};

// Строка является палиндромом
window.console.log(isPalindrome('топот'));
// true
// Несмотря на разный регистр, тоже палиндром
window.console.log(isPalindrome('ДовОд'));
// true
// Это не палиндром
window.console.log(isPalindrome('Кекс'));
// false
