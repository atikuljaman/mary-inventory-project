

class AuthService {


    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const isLoggedIn = localStorage.getItem("user_id")
        return isLoggedIn ? true : false
    }





    login(id) {
        // Saves user token to localStorage


        localStorage.setItem('user_id', id);

    }

    logout() {
        // Clear user token and profile data from localStorage

        localStorage.removeItem('user_id');
        // this will reload the page and reset the state of the application

    }
}

export default new AuthService();
