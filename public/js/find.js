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
        groupEmail: snapshot.child('email').val(),
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

    var td_email = $('<td></td>');
    td_email.text(info.groupEmail);
    newRow.append(td_email);

    var td_location = $('<td></td>');
    td_location.text(info.groupLocation);
    newRow.append(td_location);

    var td_type = $('<td></td>');
    td_type.text(info.groupType);
    newRow.append(td_type);

    var td_max = $('<td></td>');
    td_max.text(info.groupMax);
    newRow.append(td_max);

    var td_category = $('<td></td>');
    td_category.text(info.groupCategory);
    newRow.append(td_max);

    var td_button = $('<td></td>');
    td_button.html('<button>Request</button>');
    td_button.click(function () {
      window.open('mailto:' + info.groupEmail);
    });
    newRow.append(td_button);

    // newRow.click(function() {
    //   turnOnOverlay();
    // })
  }
  
});

function turnOnOverlay() {
  document.getElementById('overlay').style.display = 'block';
}

function turnOffOverlay() {
  document.getElementById('overlay').style.display = 'none';
}

document.getElementById('overlay').onclick = function () {
  turnOffOverlay();
}