function onSignIn(googleUser) {
    let profile = googleUser.getBasicProfile();

    //console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    //console.log('Name: ' + profile.getName());
    //console.log('Image URL: ' + profile.getImageUrl());
    //console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    const name = profile.getName();
    const email = profile.getEmail();

    // TODO: construct a user object and conduct sign in
}

function signInLocal(){

    const username = document.getElementById('username').value;
    const password = document.getElementById('pwd').value;

    //  make object and request sign in
}

function makeUser(){
    const name = document.getElementById().value;
    const lname = document.getElementById().value;
    const onames = document.getElementById().value;
    const phone = document.getElementById().value;
    const password = document.getElementById().value;

    // TODO: make an object and call the API to create user
}