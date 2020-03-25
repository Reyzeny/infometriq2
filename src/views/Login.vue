<template>
    <section>
        <Header/>
        <div class="row">
            <div class="col-lg-3"></div>
            <div class="col-lg-6">
                <div class="card ">
                <div class="card-body">
                    <p class="text-center">LOG IN TO YOUR ACCOUNT</p>
                    <form role="form">
                        <div class="form-group">
                            <label for="email">Username/E-mail</label>
                            <input v-model="username" type="email" class="form-control" name="email" placeholder="e.g john, jonny@hotmail.com"/>
                            <div v-if="!username" class="error">{{username_error}}</div>
                        </div>
                        
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input v-model="password" type="password" class="form-control" name="password" placeholder="Password"/>
                            <div v-if="!password" class="error">{{password_error}}</div>
                        </div>
                        <div v-if="login_error" class="error text-center">{{login_error_message}}</div>
                            
                        <button v-if="login_active" class="btn-login" type="button" disabled>
                            <span class="spinner-border spinner-border-lg" role="status" aria-hidden="true"></span>
                            <span class="sr-only">Loading...</span>
                        </button>
                        <div @click="onLogin" v-else class="btn btn-login">LOG IN</div>
                    </form>
                </div>
                </div>
            </div>
            <div class="col-lg-3"></div>
        </div>
        
    </section>
</template>
<script>
import Header from '../components/Header'
import axios from './../network'
export default {
    components: {
        Header
    },
    data () {
        return {
            username: '',
            password: '',
            login_active: false,

            username_error: '',
            password_error: '',
            login_error: '',
            login_error_message: '',
        }
    },
    methods: {
        inputValidated() {
            if (!this.username) {
                this.showUsernameError("Enter a valid username or email");
                return false;
            }
            if (!this.password) {
                this.showPasswordError();
                return false;
            }
            return true;
        },
        onLogin() {
            console.log("loggin in");
            this.resetErrors();
            if (!this.inputValidated()) return;
            this.login_active = true;
            axios.post('/login', {
                email: this.username,
                password: this.password
            }).then(response=>{
                console.log("responnse is ", response);
                this.login_active = false;
                let userData = {
                    auth_token: response.data.data.auth_token,
                };
                localStorage.setItem("user_data", userData);
                this.$router.push(`/${userData.username}`);
            }).catch(error=> {
                this.login_active = false;
                this.login_error = true;
                if (!error.response) {
                    this.login_error_message = error;
                    return;
                }
                let message_array = error.response.data.data;
                message_array.forEach(message => {
                    this.login_error_message = `${this.login_error_message}\n${message}`;
                });
                this.password='';
                
            })
        },
        showUsernameError(errorDetails) {
            this.username_error = errorDetails;
        },
        showPasswordError() {
            this.password = '';
            this.password_error = "Enter a password"
        },
        resetErrors() {
            this.login_error = false;
            this.login_error_message = '';
        }
    }
}
</script>

<style scoped>
input {
    background-image: none !important;
    border: none;
}
.card {
    margin: 5%;
    background-color: #F6F6F6;
    border-color: #E1E1E1;
    border-radius: 1rem;
}
.card-body {
    margin: 0;
    padding: 0; 
}
.card-body p {
    border-bottom: 1px solid grey;
    font-size: 2.5rem;
    padding: 3% 2%;
    color: #6D8AC7;
    border-bottom-color: #E1E1E1;
    font-weight: 600;
}
form {
    padding: 0 5% 4% 4%;
    /* margin: 2px; */
}
form label {
    color: #6D8AC7;
    font-size: 1.5rem;
    font-weight: 600;
}
form input {
    border: 1px solid #E1E1E1;
    padding: 4% 2%;
}
.btn-login {
    background: #5479b5;
    border: 1px solid #5479b5;
    border-radius: 50px;
    min-width: 200px;
    padding: 12px 0;
    color: #ffffff;
    font-size: 16px;
    text-transform: uppercase;
    margin: 0 auto;
    display: table;
    margin-bottom: 2rem;
}
.error {
    color: red;
    font-size: 1.5rem;
}
</style>

