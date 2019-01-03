$(function() {
  const database = firebase.database();

  database.ref('groups/').once('value').then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      let groupName = childSnapshot.key;
      displayGroupInfo(groupName);
    });
  });

  function displayGroupInfo(name) {
    database.ref('groups/' + name).once('value').then(function(snapshot) {
      let groupInfo = {
        groupName: name,
        groupEmail: snapshot.child('email').val(),
        groupLocation: snapshot.child('location').val(),
        groupMax: snapshot.child('max').val(),
        groupType: snapshot.child('type').val(),
        groupTime: snapshot.child('time').val(),
        groupDate: snapshot.child('date').val(),
      };
      addRow(groupInfo);
    });
  }

  function addRow(info) {
    var newRow = $('<tr></tr>');
    $('#groupsInfo').append(newRow);

    var td_name = $('<td></td>');
    td_name.text(info.groupName);
    newRow.append(td_name);

    var td_location = $('<td></td>');
    td_location.text(info.groupLocation);
    newRow.append(td_location);

    var td_type = $('<td></td>');
    td_type.text(info.groupType);
    newRow.append(td_type);

    var td_max = $('<td></td>');
    td_max.text(info.groupMax);
    newRow.append(td_max);

    var td_time = $('<td></td>');
    td_time.text(info.groupTime);
    newRow.append(td_time);

    var td_date = $('<td></td>');
    td_date.text(info.groupDate);
    newRow.append(td_date);

    // var td_email = $('<td></td>');
    // td_email.text(info.groupEmail);
    // newRow.append(td_email);

    var td_button = $('<td></td>');
    td_button.html('<button>Request</button>');
    newRow.append(td_button);

  }

  
});