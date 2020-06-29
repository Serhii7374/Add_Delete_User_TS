const getS = selector => document.querySelector(selector);
// регулярка для валідації емейлу
let regEmail = /^[\w_\.-]{1,}@\w{1,}\.\w{2,7}(\.\w{2,7})?$/;
let BD: Array<any> = [];     // масив наших обєктів юзерів
let userIndex: number;       // змінна з id юзера, використовуватиметься при редагуванні юзера

// інтерфейс нашого юзера
interface IUser {
    login: string;
    password: any;
    email: string;
}

// створюємо класс юзера за типом нашого інтерфейсу
class User implements IUser {
    constructor(public login: string, public password: any, public email: string) { }
}

// створюємо обєкт юзер відповідно до данних з інпутів
function addUser(): void {
    if (!regEmail.test(getS('.email').value)) {
        alert('Your email is incorrect')
    } else if (!getS('.password').value || !getS('.login').value) {
        alert('Fill all fields')
    } else {
        let user: IUser = new User(getS('.login').value, getS('.password').value, getS('.email').value);
        // добавляємо обєкт в массив
        BD.push(user);
        // чистимо форму
        getS('form').reset();
        // перегенерорвуєм таблицю з юзерами згідно оновлення нашого массиву
        render();
    }

}

// створення таблички з юзерами згідно данних массиву
function render(): void {
    getS('.table').innerHTML = "";
    for (let i = 0; i < BD.length; i++) {
        let div: string = `<div class="user">
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

// видалення юзера 
function deleteUser(id: number): void {
    BD.splice(id, 1);
    // перегенерорвуєм таблицю з юзерами згідно оновлення нашого массиву
    render();
}

// редагування юзера
function editUser(id: number): void {
    userIndex = id; // змінна з id юзера, використовуватиметься у функції saveEditUse() при збережі відредагованого юзера
    let { login, password, email }: any = BD[id];  // розпарсуєм обєкт на 3 змінні згідно ключів
    // і вертаєм данні в інпути для редагування
    getS('.login').value = login;
    getS('.password').value = password;
    getS('.email').value = email;
    // міняєм кнопки
    getS('.addUser').classList.add('hidden');
    getS('.editUser').classList.remove('hidden');
}

// зберігання юзера, шляхом створення нового обєкта і заміни ним старого обєкта
function saveEditUse(): void {
    if (!regEmail.test(getS('.email').value)) {
        alert('Your email is incorrect')
    } else if (!getS('.password').value || !getS('.login').value) {
        alert('Fill all fields')
    } else {
        let user: IUser = new User(getS('.login').value, getS('.password').value, getS('.email').value);
        BD.splice(userIndex, 1, user);
        getS('form').reset();
        getS('.addUser').classList.remove('hidden');
        getS('.editUser').classList.add('hidden');
        // перегенеровуєм таблицю з юзерами згідно оновлення нашого массиву
        render();
    }
}