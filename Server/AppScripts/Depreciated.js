function RemoveLettersFromCellReference(cell_AON){
  var newCell = ""
  for(let i of cell_AON){
      if (i.toUpperCase().charCodeAt(0) <= "9".toUpperCase().charCodeAt(0)){
        newCell += i;
      }
    }
  return newCell
}
function RemoveNumbersFromCellReference(cell_AON){
  var newCell = ""
  for(let i of cell_AON){
      if (i.toUpperCase().charCodeAt(0) > "9".toUpperCase().charCodeAt(0)){
        newCell += i;
      }
    }
  return newCell
}
