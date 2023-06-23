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

function parseTime(time) {
  const parts = time.split(':').map(Number);
  const [hours, minutes] = parts;
  const minutesPerHour = 60;

  return hours * minutesPerHour + minutes;
}

const isTime = (startDay, endDay, startMeeting, quantity) => {
  const startDayConverted = parseTime(startDay);
  const endDayConverted = parseTime(endDay);
  const startMeetingConverted = parseTime(startMeeting);
  const endMeeting = startMeetingConverted + quantity;
  return endMeeting <= endDayConverted && startMeetingConverted >= startDayConverted;
};

/*
'8:00' - начало рабочего дня - startDay
'17:30' - конец рабочего дня - endDay
'14:00' - начало встречи - startMeeting
90 - продолжительность встречи в минутах - quantity
*/

window.console.log(isTime('08:00', '17:30', '14:00', 90)); // true
window.console.log(isTime('8:0', '10:0', '8:0', 120)); // true
window.console.log(isTime('08:00', '14:30', '14:00', 90)); // false
window.console.log(isTime('14:00', '17:30', '08:0', 90)); // false
window.console.log(isTime('8:00', '17:30', '08:00', 900)); // false

/*Напишите функцию, которая принимает время начала и конца рабочего дня, а также время старта и продолжительность встречи в минутах и возвращает true, если встреча не выходит за рамки рабочего дня, и false, если выходит.

Время указывается в виде строки в формате часы:минуты. Для указания часов и минут могут использоваться как две цифры, так и одна. Например, 8 часов 5 минут могут быть указаны по-разному: 08:05, 8:5, 08:5 или 8:05.

Продолжительность задаётся числом. Гарантируется, что и рабочий день, и встреча укладываются в одни календарные сутки. */
