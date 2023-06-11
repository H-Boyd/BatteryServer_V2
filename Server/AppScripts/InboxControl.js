function getInboxCount(targetUrl) {
  var response = UrlFetchApp.fetch(targetUrl);
  var content = response.getContentText();

  return content;


}



function InboxControl(event) {
  /*modes = ;
  set: update the inbox table with the count of a specific inbox
  */

  mode = event.parameter.mode;
  if (mode == "set") {
    var inbox = event.parameter.inbox;
    var count = event.parameter.count;
    AddToTable(InboxesTableLocation_GAON, inbox, count, 1);
  }
}

// Update the Cells on the Inboxes page to reflect the number of email in each of my inboxes.
function UpdateEmailInboxCount() {
  AddToTable(InboxesTableLocation_GAON, "HBOYDEMAIL", getInboxCount(HBOYDEMAIL), 1);
  AddToTable(InboxesTableLocation_GAON, "HBOYD255", getInboxCount(HBOYD255), 1);
  AddToTable(InboxesTableLocation_GAON, "HB1518", getInboxCount(HB1518), 1);
  AddToTable(InboxesTableLocation_GAON, "HARRYAPPLEGREEN", getInboxCount(HARRYAPPLEGREEN), 1);

}

function TestInboxControl() {

  UpdateEmailInboxCount();

  // if (1) {
  //   var inbox = "ee";
  //   var count = "69"
  //   AddToTable(InboxesTableLocation_GAON, inbox, count, 1);
  // }

  // Logger.log(getInboxCount(HBOYDEMAIL));
  // Logger.log(getInboxCount(HBOYD255));
  // Logger.log(getInboxCount(HB1518));
  // Logger.log(getInboxCount(HARRYAPPLEGREEN));



}





















