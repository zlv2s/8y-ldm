<template>
  <div class="login-wrapper">
    <a-form
      id="components-form-demo-normal-login"
      :form="form"
      class="login-form"
      @submit="handleSubmit"
    >
      <a-form-item>
        <a-input
          v-decorator="[
            'username',
            {
              rules: [
                { required: true, message: 'Please input your username!' }
              ]
            }
          ]"
          placeholder="Username"
        >
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
            'password',
            {
              rules: [
                { required: true, message: 'Please input your Password!' }
              ]
            }
          ]"
          type="password"
          placeholder="Password"
        >
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          class="login-form-button"
          :loading="loading"
        >
          Log in
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'normal_login' })
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    ...mapActions(['global/setLoginShow', 'authentication/login']),
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.loading = true
          this['authentication/login']({
            username: values.username,
            password: values.password
          })
            .then(res => {
              this['global/setLoginShow'](false)
              this.form.resetFields()
            })
            .catch(err => {
              this.$message.error(err.message)
            })
            .finally(() => {
              this.loading = false
              // console.log('final')
            })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-wrapper {
  margin-top: 30px;
}

#components-form-demo-normal-login {
  .login-form {
    max-width: 200px;
  }
  .login-form-button {
    width: 100%;
  }
}
</style>