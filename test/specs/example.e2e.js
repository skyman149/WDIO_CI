// const LoginPage = require('../pageobjects/login.page');
// const SecurePage = require('../pageobjects/secure.page');

import LoginPage from '../pageobjects/login.page';
import ProfilePage from '../pageobjects/profile.page';

describe('My Login application', () => {
    let credentials = [
        {
            username: "fapecep930@ahhtee.com",
            password: "qwerty123"
        },
        // {
        //     username: "fapecep930@ahhtee.com",
        //     password: "qwerty123"
        // }
    ];

    beforeEach(() => {
        LoginPage.open();
    })

    for (const iteration of credentials) {
        it('should login with valid credentials', () => {
            LoginPage.login(iteration.username, iteration.password);
            expect(ProfilePage.userIcon).toBeExisting();
        });
    }

    it('submit button should be disabled if input fields are empty', () => {
       expect(LoginPage.btnSubmit).not.toBeClickable(); // correct one
        //expect(LoginPage.btnSubmit).toBeClickable(); // to test if screenshot is working
    });

    it('auth fails if wrong credentials provided', () => {
        LoginPage.setUsername('example@example.com');
        LoginPage.setPassword('123456');
        LoginPage.clickSubmit();
        expect(LoginPage.notification).toHaveText("Auth failed");
    });

    it('email format validation', () => {
        LoginPage.setUsername('123');
        expect(LoginPage.usernameValidation).toHaveText("'email' is not a valid email");
    })

    it('email required validation', () => {
        LoginPage.setUsername('123');
        LoginPage.clearUsername();
        expect(LoginPage.usernameValidation).toHaveText('Required');
    })
});


