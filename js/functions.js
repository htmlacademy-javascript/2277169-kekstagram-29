/*Функция для проверки длины строки. Она принимает строку, которую нужно проверить, и максимальную длину и возвращает true, если строка меньше или равна указанной длине, и false, если строка длиннее.*/

const checkStringLength = (string, maxLength) => string.length <= maxLength;

// Cтрока короче 20 символов
checkStringLength('проверяемая строка', 20); // true

// Длина строки ровно 18 символов
checkStringLength('проверяемая строка', 18); // true

// Строка длиннее 10 символов
checkStringLength('проверяемая строка', 10); // false

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
isPalindrome('топот'); // true

// Несмотря на разный регистр, тоже палиндром
isPalindrome('ДовОд'); // true

// Это не палиндром
isPalindrome('Кекс'); // false
