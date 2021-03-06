$(function () {
  const database = firebase.database();

  // for every group in firebase, run the getGroupInfo function
  let orderByDateRef = database.ref('groups/').orderByChild('dateForOrder');
  orderByDateRef.once('value').then(function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      let groupName = childSnapshot.key;
      getGroupInfo(groupName);
    });
  });

  // read firebase using the name ref given, create an object using that information
  // initiate addRow function
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
        groupDay: snapshot.child('day').val(),
      };
      addRow(groupInfo);
    });
  }

  // Takes an object info, creates a row and add group information
  function addRow(info) {
    var newRow = $('<tr></tr>');
    $('#groupsInfo').prepend(newRow);

    var td_name = $('<td></td>');
    td_name.text(info.groupName);

    // each row can be clicked to display an overlay with additional group information
    newRow.click(function () {
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
    td_type.addClass('mealType');
    newRow.append(td_type);

    var td_Day = $('<td></td>');
    td_Day.text(info.groupDay);
    newRow.append(td_Day);


    var td_time = $('<td></td>');
    td_time.text(info.groupTime);
    td_time.addClass('timeToMeet');
    newRow.append(td_time);

    var td_max = $('<td></td>');
    td_max.addClass('numberOfPeople');
    td_max.text(info.groupMax);
    newRow.append(td_max);

    var td_button = $('<td></td>');
    td_button.html('<button class="btn btn-primary btn-sm">Request</button>');
    td_button.click(function () {
      window.open('mailto:' + info.groupEmail);
    });
    newRow.append(td_button);
  }

  function turnOnOverlay() {
    document.getElementById('overlay').style.display = 'block';
  }
  
  function turnOffOverlay() {
    document.getElementById('overlay').style.display = 'none';
  }
  
  // for specific group
  // used to read information on a specific group
  // used to update information on overlay
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
  
      document.getElementById('group-name').innerHTML = postInfo.postName;
      document.getElementById('location').innerHTML = postInfo.postLocation;
      document.getElementById('diet-type').innerHTML = postInfo.postDiet;
      document.getElementById('meeting-days').innerHTML = postInfo.postDay + 's';
      document.getElementById('meeting-time').innerHTML = postInfo.postTime;
      document.getElementById('limit').innerHTML = postInfo.postMax;
      document.getElementById('description').innerHTML = postInfo.postDescription;
      document.getElementById('members').innerHTML = ' ';
    });
  }
  
  document.getElementById('overlay').onclick = function () {
    turnOffOverlay();
  };


});




