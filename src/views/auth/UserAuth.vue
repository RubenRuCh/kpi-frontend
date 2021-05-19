<template>
  <section>
    <el-dialog
      v-model="existsError"
      :title="$t('error')"
      :before-close="handleError"
    >
      <i class="fas fa-exclamation-triangle fa-3x" style="color: #e84e38"></i
      ><br /><br />
      <p class="error">{{ error }}</p>
    </el-dialog>

    <el-card
      shadow="always"
      v-loading="isLoading"
      :element-loading-text="$t('checking-credentials')"
      element-loading-spinner="el-icon-loading"
    >
      <h1>{{ $t("login") }}</h1>

      <el-form
        :model="authForm"
        status-icon
        :rules="rules"
        ref="authForm"
        class="authForm"
      >
        <section class="form-input">
          <el-form-item prop="user">
            <el-input
              prefix-icon="fas fa-user"
              v-model="authForm.user"
              :placeholder="$t('user')"
            ></el-input>
          </el-form-item>

          <el-form-item prop="pass">
            <el-input
              prefix-icon="fas fa-lock"
              :placeholder="$t('password')"
              type="password"
              v-model="authForm.pass"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item prop="checkPass">
            <el-input
              prefix-icon="fas fa-lock"
              :placeholder="$t('confirm-password')"
              type="password"
              v-model="authForm.checkPass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </section>

        <section class="buttons">
          <el-button type="primary" @click="submitForm('authForm')">{{
            $t("login")
          }}</el-button>
          <el-button type="danger" @click="resetForm('authForm')">{{
            $t("clean-form")
          }}</el-button>
        </section>
      </el-form>
    </el-card>
  </section>
</template>

<script>
import useNotify from "@/hooks/notify.js";

export default {
  setup() {
    const { notify } = useNotify();

    return { notify };
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("password-needed")));
      } else {
        if (this.authForm.checkPass !== "") {
          this.$refs.authForm.validateField("checkPass");
        }
        callback();
      }
    };

    var validateConfirmPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("confirm-password-needed")));
      } else if (value !== this.authForm.pass) {
        callback(new Error(this.$t("password-need-match")));
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
        user: "",
        pass: "",
        checkPass: "",
      },
      rules: {
        user: [{ trigger: ["blur", "change"] }],
        pass: [{ validator: validatePass, trigger: ["blur", "change"] }],
        checkPass: [
          { validator: validateConfirmPass, trigger: ["blur", "change"] },
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
        if (valid) {
          try {
            // Login
            await this.$store.dispatch("auth/login", actionPayload);

            this.notify(
              this.$t("auth-completed-title"),
              `${this.$t("auth-completed-message")} ${this.authForm.user}`,
              "success"
            );

            // Go to prev path if redirect, or Home by default
            window.location.href = "/";

            // Refresh Vuex data
            this.$store.dispatch("kpis/loadKpis", {
              forceRefresh: true,
            });

            this.$store.dispatch("fields/loadFields", {
              forceRefresh: true,
            });
          } catch (error) {
            this.error = this.$t("auth-error") || error;
          }
        } else {
          this.notify(this.$t("error"), this.$t("form-not-valid"), "error");
        }

        this.isLoading = false;
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

<style>
div.el-dialog {
  width: 450px !important;
}
div.el-dialog div.el-dialog__header {
  background-color: #e84e38 !important;
}

div.el-dialog div.el-dialog__header span,
div.el-dialog div.el-dialog__header i {
  color: white;
}

div.el-dialog div.el-dialog__body p.error {
  font-size: 1rem;
}
.el-card {
  width: 400px;
  margin: 5% auto;
}
form {
  width: 100%;
  margin: 1rem auto;
  padding: 1rem;
}

form .form-input {
  margin: 1rem auto;
}

h1 {
  font-size: 2rem;
}

form .buttons {
  padding-top: 1rem;
}

form .buttons .el-button {
  padding: 1rem auto;
  margin: 0 0.2rem;
}
</style>
