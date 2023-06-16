function doGet(event) {//This function Updates a cell or range once a http get is received
  var typeOfTask = event.parameter.type;//=battery

  if (typeOfTask == "battery") {//type=battery

    if (event.parameter.mode == "set") {
      BatteryControl(event);
    }
    if (event.parameter.mode == "get") {
      requestedRange_GAON = BatteryControl(event);
      var valueToReturn = twoToOne(ss.getRange(requestedRange_GAON).getValues()).join(",");

      if (event.parameter.newline == "true") {
        console.log(valueToReturn);
        valueToReturn = ReplaceSecondComma(valueToReturn);
        console.log(valueToReturn);
      }

      if (event.parameter.html == "true") {
        
        var htmlTemplate = HtmlService.createTemplateFromFile('Template');
        var text = ReplaceSecondComma(valueToReturn);
        backgroundColour = event.parameter.backcol; //"#000000" to "#ffffff"
        var style = event.parameter.style
        if (style == "1") {//solid background, solid foreground.
          foregroundColour = event.parameter.textcol; //"#000000" to "#ffffff" 
          htmlTemplate.dataFromServerTemplate = { text: text, colour1: backgroundColour, colour2: foregroundColour, styleType: style };
        }
        if (event.parameter.style == "2") {

          length = TableLength(BatteriesSortedPercentagesColumnLocation_GAON);
          console.log("The length is " + length);
          var textColour_H_Ar = GetBackgroundHexArray(BatteriesSortedPercentagesColumnLocation_GAON, length);
          //return ContentService.createTextOutput(textColour_H_Ar);
          htmlTemplate.dataFromServerTemplate = { text: text, colour1: backgroundColour, colourArray1: textColour_H_Ar, styleType: style };
        }

        if (event.parameter.style == "3") {

          length = TableLength(BatteriesSortedPercentagesColumnLocation_GAON);

          var colour1_H = event.parameter.col1; //"#000000" to "#ffffff" 
          var colour2_H = event.parameter.col2; //"#000000" to "#ffffff" 

          var textColour_H_Ar = GetGradientHexArrays(BatteriesSortedPercentagesColumnLocation_GAON, colour1_H, colour2_H, length)
          //return ContentService.createTextOutput(textColour_H_Ar);
          htmlTemplate.dataFromServerTemplate = { text: text, colour1: backgroundColour, colourArray1: textColour_H_Ar, styleType: style };
        }



        /*
        Ok so, html
        Three methods of getting the colour

        
        1) Fixed
        Required arguments
        colour back
        colour text

        2) Get From the sheet
        Required arguments

        3) Gradient From two fixed colours
        
        
        
        
         */








        var htmlOutput = htmlTemplate.evaluate().setSandboxMode(HtmlService.SandboxMode.IFRAME)
          .setTitle('Batteries');
        return htmlOutput;
      }
      return ContentService.createTextOutput(valueToReturn);

    }
  }
  else if (typeOfTask == "inbox") {//type=inbox

    InboxControl(event);


  }

}

function CheckForButtonPress(e) {

  if (tickboxButtonPress(ss,"Inboxes!I2")) {
    UpdateEmailInboxCount();
  }

  if (tickboxButtonPress(ss,"Test!E10")) {
    ss.getRange("Test!E11").setValue(Math.random());
  }
}





function TestCode() {


}

























