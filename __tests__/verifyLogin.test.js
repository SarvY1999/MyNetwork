const axios = require('axios');

const url = `http://localhost:5000/api/v1`
// Positive Test
test('POST / Test login if correct credentials are provided', async () => {
    try {
        // post request
        const userData = {
            email: "test@mail.com",
            password: "secret"
        }
        const response = await axios.post(`${url}/users/login`, userData)
        console.log(response.data);
        expect(response.status).toBe(200)
        expect(response.data.msg).toBe("Welcome User test");

    } catch (error) {
        throw error;
    }
});

// Negative Test
test('POST / Test login if wrong credentials are provided', async () => {
    try {
        // post request
        const userData = {
            "email": "user1@gmail.com",
            "password": "test123"
        }
        const response = await axios.post(`${url}/users/login`, userData)
        console.log(response.data);
        expect(response.status).toBe(400)
        expect(response.data.msg).toBe("No user found with email user1@gmail.com, Please register");

    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('Axios Error:', error.message);
        } else {
            throw error;
        }
    }
})