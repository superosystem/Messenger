<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="registrtration-form">
        <div class="logo-wrapper">
          <img class="logo" src="/static/images/logo.png" alt="Task Agile Logo">
          <div class="tagline">Open Source Task Management Tool</div>
        </div>

        <form @submit.prevent="submitForm">
          <div class="alert alert-danger failed" v-show="errorMessage">{{ errorMessage }}</div>
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" class="form-control" id="username" v-model="form.username" placeholder="Your username">
            <div class="field-error" v-if="v$.form.username.$dirty">
              <div class="error" v-if="!v$.form.username.required">Username is required</div>
              <div class="error" v-if="!v$.form.username.minLength">Username must have at least
                {{ v$.form.username.$params.minLength.min }} characters.</div>
              <div class="error" v-if="!v$.form.username.maxLength">Username is too long. It can contains maximium
                {{ v$.form.username.$params.maxLength.max }} characters.</div>
              <div class="error" v-if="!v$.form.username.alphaNum">Username can only contain letters and numbers</div>
            </div>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" id="email" v-model="form.email" placeholder="Your email">
            <div class="field-error" v-if="v$.form.email.$dirty">
              <div class="error" v-if="!v$.form.email.required">Email is required</div>
              <div class="error" v-if="!v$.form.email.email">Email is not valid.</div>
              <div class="error" v-if="!v$.form.email.maxLength">Email is too long. It can contains maximium
                {{ v$.form.email.$params.maxLength.max }} characters.</div>
            </div>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" v-model="form.password"
              placeholder="Your password">
            <div class="field-error" v-if="v$.form.password.$dirty">
              <div class="error" v-if="!v$.form.password.required">Password is required</div>
              <div class="error" v-if="!v$.form.password.minLength">Password must have at least
                {{ v$.form.password.$params.minLength.min }} characters.</div>
              <div class="error" v-if="!v$.form.username.maxLength">Password is too long. It can contains maximium
                {{ v$.form.password.$params.maxLength.max }} characters.</div>
            </div>
          </div>

          <button text="submit" class="btn btn-primary btn-block mt-3" id="submit">Create Account</button>
          <p class="accept-terms text-muted">By clicking "Create account", you agree to our <a href="#">terms of
              service</a> and <a href="#">privacy policy</a>.</p>
          <p class="text-center text-muted">Already have an account? <a href="/login">Sign In</a></p>
        </form>

      </div>
    </div>

    <footer class="footer">
      <span class="copyright">&copy; 2022 TaskAgile</span>
      <ul class="footer-links list-inline float-right">
        <li class="list-inline-item"><a href="#">About</a></li>
        <li class="list-inline-item"><a href="#">Terms of Service</a></li>
        <li class="list-inline-item"><a href="#">Privacy Policy</a></li>
        <li class="list-inline-item"><a href="https://github.com/gusrylmubarok/task-agile-web">Github</a></li>
      </ul>
    </footer>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import registrationService from '@/services/registration'
import { required, email, minLength, maxLength, alphaNum } from '@vuelidate/validators'

export default {
  name: 'RegistrationPage',
  setup: () => ({
    v$: useVuelidate()
  }),
  data: function () {
    return {
      form: {
        username: '',
        email: '',
        password: ''
      },
      errorMessage: ''
    }
  },
  validations: {
    form: {
      username: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(50),
        alphaNum
      },
      email: {
        required,
        email,
        maxLength: maxLength(100)
      },
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(30)
      }
    }
  },
  methods: {
    submitForm() {
      this.v$.$touch()
      if (this.v$.$invalid) {
        return
      }

      registrationService.registration(this.form).then(() => {
        this.$router.push({ name: 'LoginPage' })
      }).catch((error) => {
        this.errorMessage = 'Failed to register user. ' + error.message
      })
    }
  }
}
</script>


<style lang="scss" scoped>
.container {
  max-width: 900px;
}

.registrtration-form {
  .form-group label {
    font-weight: bold;
    color: #555;
    margin-top: 10px;
  }

  .accept-terms {
    margin: 20px 0 40px 0;
  }
}

.logo-wrapper {
  text-align: center;
  margin-bottom: 40px;

  .tagline {
    line-height: 180%;
    color: #666666;
  }

  .logo {
    max-width: 150px;
    margin: 0 auto;
  }
}

.footer {
  width: 100%;
  font-size: 13px;
  color: #666;
  line-height: 40px;
  border-top: 1px solid #ddd;
  margin-top: 50px;

  .list-inline-item {
    margin-right: 10px;
  }

  a {
    color: #666;
  }
}
</style>
