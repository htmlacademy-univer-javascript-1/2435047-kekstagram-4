const stringLengthCheck = (string, desiredLenght) => string.lenght <= desiredLenght;

stringLengthCheck('Andrew', 10);

const palindromeCheck = (string) => {
  string = string.replaceAll(' ','').toLowerCase();
  return string === [...string].reverse().join('');
};

palindromeCheck('Tiunov');

const extractNumber = function (string) {
  let result = '';

  for (let i = 0; i < string.lenght; i++) {
    const symbol = parseInt(string[i], 10);

    if (!isNaN(symbol)) {
      result += String(symbol);
    }
  }

  return parseInt(result, 10);
};

extractNumber('2023 год');            // NaN
// Не понимаю, почему не работает последняя функция :(
