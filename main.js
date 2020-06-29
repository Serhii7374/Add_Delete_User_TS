const getS = selector => document.querySelector(selector);
let regEmail = /^[\w_\.-]{1,}@\w{1,}\.\w{2,7}(\.\w{2,7})?$/;
let BD = [];
let userIndex;
class User {
    constructor(login, password, email) {
        this.login = login;
        this.password = password;
        this.email = email;
    }
}
function addUser() {
    if (!regEmail.test(getS('.email').value)) {
        alert('Your email is incorrect');
    }
    else if (!getS('.password').value || !getS('.login').value) {
        alert('Fill all fields');
    }
    else {
        let user = new User(getS('.login').value, getS('.password').value, getS('.email').value);
        BD.push(user);
        getS('form').reset();
        render();
    }
}
function render() {
    getS('.table').innerHTML = "";
    for (let i = 0; i < BD.length; i++) {
        let div = `<div class="user">
        <div class="index">${i + 1}</div>
        <div class="BD_login">${BD[i].login}</div>
        <div class="BD_password">${BD[i].password}</div>
        <div class="BD_email">${BD[i].email}</div>
        <div class="edit"><input type="button" class="edit${i}" value="Edit" onclick="editUser(${i})"></div>
        <div class="delete"><input type="button" class="delete${i}" value="Delete" onclick="deleteUser(${i})"></div>
        </div>`;
        getS('.table').innerHTML += div;
    }
}
function deleteUser(id) {
    BD.splice(id, 1);
    render();
}
function editUser(id) {
    userIndex = id;
    let { login, password, email } = BD[id];
    getS('.login').value = login;
    getS('.password').value = password;
    getS('.email').value = email;
    getS('.addUser').classList.add('hidden');
    getS('.editUser').classList.remove('hidden');
}
function saveEditUse() {
    if (!regEmail.test(getS('.email').value)) {
        alert('Your email is incorrect');
    }
    else if (!getS('.password').value || !getS('.login').value) {
        alert('Fill all fields');
    }
    else {
        let user = new User(getS('.login').value, getS('.password').value, getS('.email').value);
        BD.splice(userIndex, 1, user);
        getS('form').reset();
        getS('.addUser').classList.remove('hidden');
        getS('.editUser').classList.add('hidden');
        render();
    }
}
