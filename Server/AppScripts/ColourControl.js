
function HexToComponents(colour_H){
  red_H = colour_H[0] + colour_H[1];
  green_H = colour_H[2] + colour_H[3];
  blue_H = colour_H[4] + colour_H[5];

  red_I = parseInt(red_H, 16);
  green_I = parseInt(green_H, 16);
  blue_I = parseInt(blue_H, 16);

  return [red_I,green_I,blue_I]
}

function ComponentToHex(colour_I){
  var colour_H = colour_I.toString(16)
  return colour_H.length == 1 ? "0" + colour_H : colour_H;
}

function RgbToHex(red_I,green_I,blue_I) {
  return "" + ComponentToHex(red_I) + ComponentToHex(green_I) + ComponentToHex(blue_I);
}

function GetGradient(colour1_H,colour2_H,percentage_IPer) {
  if (percentage_IPer > 100){percentage_IPer = 100};if (percentage_IPer < 0){percentage_IPer = 0}
  
  colour1_I_Ar = HexToComponents(colour1_H);
  colour2_I_Ar = HexToComponents(colour2_H);

  red1_I = colour1_I_Ar[0]
  green1_I = colour1_I_Ar[1]
  blue1_I = colour1_I_Ar[2]
  
  red2_I = colour2_I_Ar[0]
  green2_I = colour2_I_Ar[1]
  blue2_I = colour2_I_Ar[2]
  
  red3_I = Math.round((red1_I * (100-percentage_IPer) + red2_I * percentage_IPer)/100)
  green3_I = Math.round((green1_I * (100-percentage_IPer) + green2_I * percentage_IPer)/100)
  blue3_I = Math.round((blue1_I * (100-percentage_IPer) + blue2_I * percentage_IPer)/100)

  if (red3_I > 255){red3_I = 255};if (red3_I < 0){red3_I = 0}
  if (green3_I > 255){green3_I = 255};if (green3_I < 0){green3_I = 0}
  if (blue3_I > 255){blue3_I = 255};if (blue3_I < 0){blue3_I = 0}
    
  return RgbToHex(red3_I,green3_I,blue3_I)
}

function GetGradientHexArrays(startingCell_GAON,colour1_H,colour2_H,amount){
    
  var sheetName_SN = GetSheetNameFromGAON(startingCell_GAON)
  var startingRowIndex_I = GetRowIndex(startingCell_GAON)
  var startingColumnIndex_I = GetColumnIndex(startingCell_GAON)

  var colour_H_Ar = []
  for (x = 0;x < amount;x++){
    targetCell_AON = GetCellReferenceFromIndex(startingColumnIndex_I,startingRowIndex_I + x)
    targetCell_GAON = CellGlobaliser(sheetName_SN,targetCell_AON);

    var cellValue_IPer =  ss.getRange(targetCell_GAON).getValue();
    console.log(cellValue_IPer);

    var colour_H = GetGradient(colour1_H,colour2_H,cellValue_IPer);
    colour_H_Ar.push(colour_H);

  }
  return colour_H_Ar;
}

function GetBackgroundHexArray(startingCell_GAON,amount){
  var sheetName_SN = GetSheetNameFromGAON(startingCell_GAON)
  var startingRowIndex_I = GetRowIndex(startingCell_GAON)
  var startingColumnIndex_I = GetColumnIndex(startingCell_GAON)

 var colours_H_Ar = []
  for (x = 0;x < amount;x++){
    targetCell_AON = GetCellReferenceFromIndex(startingColumnIndex_I,startingRowIndex_I + x)
    targetCell_GAON = CellGlobaliser(sheetName_SN,targetCell_AON);

    colour_H = ss.getRange(cell_GAON).getBackground().replace("#","")
    colours_H_Ar.push(colour_H);
  }
  return colours_H_Ar;
}

function TestColourControl(){
  console.log(GetGradientHexArrays(BatteriesSortedPercentagesColumnLocation_GAON,"1","1",3))
}


























