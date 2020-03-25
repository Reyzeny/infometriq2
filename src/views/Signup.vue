<template>
    <section>
        <Header/>
        <div v-if="signup_success" class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Registered!</strong> Check your mail to activate your account before you can login.<br>
            <div>
                <router-link to="/">Go home</router-link>
            </div>
        </div>

        <div v-else class="row">
            <div class="col-lg-3"></div>
            <div class="col-lg-6">
                <div class="card ">
                <div class="card-body">
                    <p class="text-center title">CREATE AN ACCOUNT</p>
                    <form role="form">
                        <div class="form-group">
                            <label for="username">Username</label>
                            <input v-model="username" type="name" class="form-control" name="username" placeholder="e.g johndoe"/>
                            <p class="infometriq-url">Your url is Infometriq.com/{{ username }}</p>
                            <div v-if="!username" class="error">{{username_error}}</div>
                        </div>
                        <div class="form-group">
                            <label for="email">E-mail</label>
                            <input v-model="email" type="email" class="form-control" name="email" placeholder="e.g jonny@hotmail.com"/>
                            <div v-if="!email" class="error">{{email_error}}</div>
                        </div>
                        <div class="form-group">
                            <label for="account_type">Account Type</label>
                            <select v-model="account_type" class="form-control" name="account_type">
                                <option disabled selected>Select account type</option>
                                <option value="individual">Individual</option>
                                <option value="company">Company</option>
                            </select>
                            <div v-if="!account_type" class="error">{{account_type_error}}</div>
                        </div>                     
                        
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input v-model="password" type="password" class="form-control" name="password" placeholder="Password"/>
                            <div v-if="!password" class="error">{{password_error}}</div>
                        </div><br>
                        <div v-if="signup_error" class="error text-center">{{signup_error_message}}</div>
                            
                        <button v-if="signup_active" class="btn-signup" type="button" disabled>
                            <span class="spinner-border spinner-border-lg" role="status" aria-hidden="true"></span>
                            <span class="sr-only">Loading...</span>
                        </button>
                        <div @click="onSignup" v-else class="btn btn-signup">SIGN UP</div>
                        
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
            signup_success: false,
            username: '',
            email: '',
            account_type: '',
            password: '',
            signup_active: false,

            username_error: '',
            email_error: '',
            account_type_error: '',
            password_error: '',

            signup_error: false,
            signup_error_message: ''
        }
    },
    methods: {
        inputValidated() {
            if (!this.username) {
                this.showUsernameError("Enter a valid username");
                return false;
            }
            if (!this.email || !this.email.includes("@")) {
                this.showEmailError("Enter a valid email address");
                return false;
            }
            if (!this.account_type) {
                this.showAccountTypeError();
                return false;
            }
            if (!this.password || this.password.length < 7) {
                this.showPasswordError();
                return false;
            }
            return true;
        },
        onSignup() {
            if (!this.inputValidated()) return;
            this.resetErrors()
            this.signup_active = true;
            axios.post('/create-new-user', {
                username: this.username,
                email: this.email,
                password: this.password,
                reg_type: this.account_type
            }).then(response=>{
                this.signup_active = false;
                this.signup_success = true;
            }).catch(error=> {
                this.signup_active = false;
                this.signup_success = false;
                this.signup_error = true;

                if (!error.response) {
                    this.signup_error_message = error;
                    return;
                }
                let message_array = error.response.data.data
                message_array.forEach(element => {
                    this.signup_error_message = `${this.signup_error_message} \n ${element}`;
                });
            })

            return event.preventDefault();
        },
        showUsernameError(errorDetails) {
            this.username_error = errorDetails;
        },
        showEmailError(errorDetails) {
            this.email = '';
            this.email_error = errorDetails;
        },
        showAccountTypeError() {
            this.account_type_error = "Select an account type";
        },
        showPasswordError() {
            this.password = '';
            this.password_error = "Password must be up to 8 characters"
        },
        resetErrors() {
            this.signup_error = false;
            this.signup_error_message = '';
        }
        
    }
}
</script>

<style scoped>
input, select {
    background-image: none !important;
    border: none;
}
.alert {
    margin: 5%;
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
.card-body .title {
    border-bottom: 1px solid grey;
    font-size: 2.5rem;
    padding: 3% 2%;
    color: #6D8AC7;
    border-bottom-color: #E1E1E1;
    font-weight: 600;
}
form {
    padding: 0 5% 0 4%;
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
form select {
    border: 1px solid #E1E1E1;
}
.btn-signup {
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
.infometriq-url {
    font-size: 1.2rem;
    margin-left: 1%;
    color: #6D8AC7;
}
.error {
    color: red;
    font-size: 1.5rem;
}
</style>

