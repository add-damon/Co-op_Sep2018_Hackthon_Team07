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
      };
      console.log(groupInfo);
      addRow(groupInfo);
    });
  }

  function addRow(info) {
    var newRow = $('<tr></tr>');
    $('#groupsInfo').append(newRow);

    var td_name = $('<td></td>');
    td_name.text(info.groupName);
    newRow.append(td_name);

    var td_email = $('<td></td>');
    td_email.text(info.groupEmail);
    newRow.append(td_email);

    var td_location = $('<td></td>');
    td_location.text(info.groupLocation);
    newRow.append(td_location);

    var td_max = $('<td></td>');
    td_max.text(info.groupMax);
    newRow.append(td_max);
  }
});