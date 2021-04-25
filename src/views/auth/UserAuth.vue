<template>
  <section>
    <el-dialog v-model="existsError" :title="$t('error')" :before-close="handleError">
      <p>{{ error }}</p>
    </el-dialog>

    <el-card
      shadow="always"
      v-loading="isLoading"
      :element-loading-text="$t('checking-credentials')"
      element-loading-spinner="el-icon-loading"
    >
      <h1>{{ $t('login') }}</h1>

      <el-form
        :model="authForm"
        status-icon
        :rules="rules"
        ref="authForm"
        label-width="120px"
        class="authForm"
      >
        <el-form-item :label="$t('user')" prop="user">
          <el-input v-model="authForm.user"></el-input>
        </el-form-item>

        <el-form-item :label="$t('password')" prop="pass">
          <el-input
            type="password"
            v-model="authForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item :label="$t('confirm-password')" prop="checkPass">
          <el-input
            type="password"
            v-model="authForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('authForm')"
            >{{ $t('login') }}</el-button
          >
          <el-button @click="resetForm('authForm')"
            >{{ $t('clean-form') }}</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </section>
</template>

<script>
import useNotify from '@/hooks/notify.js';

export default {
  setup() {
    const { notify } = useNotify();

    return { notify };
  },
  data() {
    var checkUser = (rule, value, callback) => {
      if (value === '') {
        return callback(
          new Error(
            this.$t('user-needed')
          )
        );
      }
      setTimeout(() => {
        if (!this.userExists) {
          callback(
            new Error('El usuario debe estar dado de alta en el Ayuntamiento')
          );
        } else {
          callback();
        }
      }, 1000);
    };

    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('password-needed')));
      } else {
        if (this.authForm.checkPass !== '') {
          this.$refs.authForm.validateField('checkPass');
        }
        callback();
      }
    };

    var validateConfirmPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('confirm-password-needed')));
      } else if (value !== this.authForm.pass) {
        callback(new Error(this.$t('password-need-match')));
      } else {
        callback();
      }
    };

    return {
      error: null,
      existsError: false,
      isLoading: false,
      userExists: true,
      authForm: {
        user: '',
        pass: '',
        checkPass: '',
      },
      rules: {
        user: [{ validator: checkUser, trigger: ['blur', 'change'] }],
        pass: [{ validator: validatePass, trigger: ['blur', 'change'] }],
        checkPass: [
          { validator: validateConfirmPass, trigger: ['blur', 'change'] },
        ],
      },
    };
  },
  watch: {
    error(newError) {
      if (newError == null) this.existsError = false;
      else this.existsError = true;
    },
  },
  methods: {
    submitForm(formName) {
      this.isLoading = true;

      const actionPayload = {
        user: this.authForm.user,
        password: this.authForm.pass,
      };

      this.$refs[formName].validate(async (valid) => {
        this.isLoading = false;

        if (valid) {
          try {
            // Login
            await this.$store.dispatch('auth/login', actionPayload);

            this.notify(
              this.$t('auth-completed-title'),
              `${this.$t('auth-completed-message')} ${this.authForm.user}`,
              'success'
            );

            // Go to prev path if redirect, or Home by default
            const redirectUrl = this.$route.redirectedFrom
              ? this.$route.redirectedFrom.path
              : '/';

            this.$router.replace(redirectUrl);
          } catch (error) {
            this.error = error || this.$t('auth-error');
          }
        } else {
          this.notify(
            this.$t('error'),
            this.$t('form-not-valid'),
            'error'
          );

          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}
</style>
