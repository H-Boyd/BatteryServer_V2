function GetCellReferenceFromIndex(column_I,row_I){
  var firstHalfOfColumn = Letters[Math.floor((column_I - 1) / 26)];
  var secondHalfOfColumn = Letters[((column_I - 1) % 26)+1];
  cell_AON = (firstHalfOfColumn + secondHalfOfColumn + row_I);
  return cell_AON;
}

function GetRowIndex(cell_AON){
  return ss.getRange(cell_AON).getRow();
}

function GetColumnIndex(cell_AON){
  return ss.getRange(cell_AON).getColumn();
}

function GetSheetNameFromGAON(cell_GAON){
  sheet_SN = ss.getRange(cell_GAON).getSheet().getName();;
  return sheet_SN;


}


function TestCellReferenceControl(){
  var cell_AON = "ae69" 
  console.log(GetRowIndex(cell_AON));
  console.log(GetColumnIndex(cell_AON));
  console.log(GetCellReferenceFromIndex(GetColumnIndex(cell_AON),GetRowIndex(cell_AON)));
}








