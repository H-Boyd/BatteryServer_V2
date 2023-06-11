function ReplaceSecondComma(text) {
  var odd_B = true;
  text = text.replace(/,/g, (newline)=>{
    odd_B = !odd_B;
    return !odd_B ? newline : '\n';
  });
  return text;
}

function twoToOne(TwoDArray){
  arr = [];
  for (row of TwoDArray) for (e of row) arr.push(e);
  return arr;
}

