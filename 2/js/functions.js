function checkingLenght(str,maxLength){
  return str.length <= maxLength;
}

checkingLenght('строка проверки', 15);

function searchPalindrome(row){
  const newRow = row.replaceAll('','').toLowerCase();
  let reversedRow = '';
  for (let i = newRow.length - 1;i >= 0; i--){
    reversedRow += newRow[i];
  }
  return newRow === reversedRow;
}

searchPalindrome('доввод');

function searchNumber(row){
  const inputRow = row.toString();
  let result = '';
  for (let i = 0; i < inputRow.length; i++){
    const char = inputRow[i];
    const num = parseInt(char,10);
    if(!Number.isNaN(num)){
      result += char;
    }
  }
  if (result === ''){
    return NaN;
  }
  return parseInt(result,10);
}

searchNumber('Всем привет2025');
