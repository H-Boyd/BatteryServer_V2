function BatteryControl(event) {
  /*modes = ;
  set: update the battery table with the charge of a specific device
  get: gets the table with the lowest charged percentages
  */

  mode = event.parameter.mode;
  if (mode == "set") {
    var deviceToUpdate = event.parameter.device;
    var deviceCharge = event.parameter.charge;
    AddToTable(BatteriesTableLocation_GAON, deviceToUpdate, deviceCharge, 1);
  }
  if (mode == "get") {//returns a 2*x csv of the sorted battery percentages
    var amount = event.parameter.amount;
    if (amount == "all")
      {amount = TableLength(BatteriesSortedPercentagesColumnLocation_GAON);}
    else{amount = parseInt(amount)}
    var valuesToReturn_GAON = GetTableRange(BatteriesSortedTableLocation_GAON, 2, amount);
    return valuesToReturn_GAON;

    //type=battery&mode=get&amount=*

  }
}
