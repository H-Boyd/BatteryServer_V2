function AddToTable(startOfTable_GAON, rowHeader, value, valueColumnOffset = 1) {
  //This function adds a value to a table just based on the name.
  //This will allow for other services to send values to the table without the need to know exactly where to put them.
  //The next step is to remove the need to know the location of the table.
  //StartOfTable: this is the cell location top of the Column, the cell 1 space above the first entry.
  //rowHeader: the name of the entry you are trying to update.
  //value the value being added to the cell
  //valueColumnOffset, the place to put the value, relative to the name

  var sheetName_SN = GetSheetNameFromGAON(startOfTable_GAON)
  var columnIndex_I = GetColumnIndex(startOfTable_GAON);
  var rowIndex_I = GetRowIndex(startOfTable_GAON);

  var targetSheet = ss.getSheetByName(sheetName_SN);

  var searchingElement_I = 0;
  while (1) {
    var cellToPutData_AON;
    var targetCell_AON = GetCellReferenceFromIndex(columnIndex_I, rowIndex_I + searchingElement_I);
    var targetCell = targetSheet.getRange(targetCell_AON);
    if (!targetCell.isBlank()) {
      var lowerCaseCellContents = targetCell.getValue().toLowerCase();
      if (lowerCaseCellContents == rowHeader.toLowerCase()) {
        cellToPutData_AON = GetCellReferenceFromIndex(columnIndex_I + valueColumnOffset, rowIndex_I + searchingElement_I);
        targetSheet.getRange(cellToPutData_AON).setValue(value);
        break;
      }
    }
    else {
      targetCell.setValue(rowHeader);
      cellToPutData_AON = GetCellReferenceFromIndex(columnIndex_I + valueColumnOffset, rowIndex_I + searchingElement_I);
      targetSheet.getRange(cellToPutData_AON).setValue(value);
      break;
    }
    searchingElement_I += 1;
  }
}

function GetTableRange(startOfTable_GAON, width_I, depth_I) {
  var sheet_SN = GetSheetNameFromGAON(startOfTable_GAON);
  var columnIndex_I = GetColumnIndex(startOfTable_GAON);
  var rowIndex_I = GetRowIndex(startOfTable_GAON);

  startCell_AON = GetCellReferenceFromIndex(columnIndex_I, rowIndex_I);
  endCell_AON = GetCellReferenceFromIndex(columnIndex_I - 1 + width_I, rowIndex_I - 1 + depth_I);
  requestedRange_GAON = sheet_SN + "!" + startCell_AON + ":" + endCell_AON

  return (requestedRange_GAON);
}

function TableLength(startOfColumn_GAON) {
  var sheet_SN = ss.getRange(startOfColumn_GAON).getSheet().getName();

  var startingColumnIndex_I = GetColumnIndex(startOfColumn_GAON)
  var startingRowIndex_I = GetRowIndex(startOfColumn_GAON)
  var length_I = 0;

  while(1){
    var targetCell_AON = GetCellReferenceFromIndex(startingColumnIndex_I, startingRowIndex_I + length_I);
    var targetCell_GAON = CellGlobaliser(sheet_SN,targetCell_AON);
    if (ss.getRange(targetCell_GAON).isBlank())
      break

    length_I += 1;
  }
  return length_I;
}

function CellGlobaliser(sheet_SN,cell_AON){
  cell_GAON = sheet_SN + "!" + cell_AON;
  return cell_GAON;
}

function TestTableControl(){
  AddToTable(BatteriesTableLocation_GAON, "Gamer", 99, 1);
}

























































