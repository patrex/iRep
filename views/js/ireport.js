//handle logins and signins
//Sign in using local account

var users = require('../../users');

function localSignIn(localUser){
    let thisUser = users.filter((user) => localUser.username);
}

//sign in using Google account
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

//signout a Google account
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
    console.log('User signed out.');
    });
}

//create a user
//create a local account
function createUser(user){
    //no matter the method of getting user data ie through Google or local create an object and embed user data
    //hence we use only this function to create all accounts for this app
}

//get geoLocation
function getGeolocation(){
    let loc = prompt('Enter location: ', '0,0');
    let [lat, long] = loc.split(',');
    
    alert('Your location: ' + lat + 'latitude' + ' ' + long + 'longitude');
}