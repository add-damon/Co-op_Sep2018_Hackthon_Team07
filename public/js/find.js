$(function () {
  const database = firebase.database();

  let orderByDateRef = database.ref('groups/').orderByChild('dateForOrder');
  orderByDateRef.once('value').then(function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      let groupName = childSnapshot.key;
      getGroupInfo(groupName);
    });
  });

  function getGroupInfo(name) {
    database.ref('groups/' + name).once('value').then(function (snapshot) {
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
    $('#groupsInfo').prepend(newRow);

    var td_name = $('<td></td>');
    td_name.text(info.groupName);

    td_name.click(function () {
      window.sessionStorage.setItem("groupPost", td_name.id)
      let postName = window.sessionStorage.getItem("groupPost").replace('\n', '');

      readPostFirebaseInfo(postName);

      setTimeout(function () { turnOnOverlay(); }, 200);

    });

    td_name.id = info.groupName;
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

    var td_button = $('<td></td>');
    td_button.html('<button class="btn btn-primary btn-sm">Request</button>');
    td_button.click(function () {
      window.open('mailto:' + info.groupEmail);
    });
    newRow.append(td_button);
  }

  $('#sign-out').click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    firebase.auth().signOut();
    window.location.href = "./landing.html";
  });
});



function turnOnOverlay() {
  document.getElementById('overlay').style.display = 'block';
}

function turnOffOverlay() {
  document.getElementById('overlay').style.display = 'none';
}

// for specific group
function readPostFirebaseInfo(name) {

  //console.log('groups/' + name);
  firebase.database().ref('groups/' + name).on('value', function (snapshot) {
    let postInfo = {
      postName: name,
      postEmail: snapshot.child('email').val(),
      postLocation: snapshot.child('location').val(),
      postMax: snapshot.child('max').val(),
      postType: snapshot.child('type').val(),
      postTime: snapshot.child('time').val(),
      postDay: snapshot.child('day').val(),
      postDiet: snapshot.child('type').val(),
      postDescription: snapshot.child('description').val(),
    };

    document.getElementById('group-name').innerHTML = 'Group Name: ' + postInfo.postName;
    document.getElementById('location').innerHTML = 'Location: ' + postInfo.postLocation;
    document.getElementById('meeting-time').innerHTML = 'Meeting Time (24H Time): ' + postInfo.postDay + ' ' + postInfo.postTime;
    document.getElementById('diet-type').innerHTML = 'Diet Type: ' + postInfo.postDiet;
    document.getElementById('description').innerHTML = 'Description: ' + postInfo.postDescription;
    document.getElementById('members').innerHTML = 'Members:'
  });

}

document.getElementById('overlay').onclick = function () {
  turnOffOverlay();
}


