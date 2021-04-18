<template>
  <section>
    <el-dialog v-model="existsError" title="Error" :before-close="handleError">
      <p>{{ error }}</p>
    </el-dialog>

    <el-card
      shadow="always"
      v-loading="isLoading"
      element-loading-text="Comprobando credenciales..."
      element-loading-spinner="el-icon-loading"
    >
      <h1>Iniciar sesión</h1>

      <el-form
        :model="authForm"
        status-icon
        :rules="rules"
        ref="authForm"
        label-width="120px"
        class="authForm"
      >
        <el-form-item label="Usuario" prop="user">
          <el-input v-model="authForm.user"></el-input>
        </el-form-item>

        <el-form-item label="Contraseña" prop="pass">
          <el-input
            type="password"
            v-model="authForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="Confirmar contraseña" prop="checkPass">
          <el-input
            type="password"
            v-model="authForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('authForm')"
            >Iniciar sesión</el-button
          >
          <el-button @click="resetForm('authForm')"
            >Limpiar formulario</el-button
          >
        </el-form-item>
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
    var checkUser = (rule, value, callback) => {
      if (value === "") {
        return callback(
          new Error(
            "Por favor, introduce el usuario con el que desea iniciar sesión"
          )
        );
      }
      setTimeout(() => {
        if (!this.userExists) {
          callback(
            new Error("El usuario debe estar dado de alta en el Ayuntamiento")
          );
        } else {
          callback();
        }
      }, 1000);
    };

    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Por favor, introduce la contraseña"));
      } else {
        if (this.authForm.checkPass !== "") {
          this.$refs.authForm.validateField("checkPass");
        }
        callback();
      }
    };

    var validateConfirmPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Por favor, introduce la contraseña otra vez"));
      } else if (value !== this.authForm.pass) {
        callback(new Error("Las contraseñas introducidas no coinciden"));
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
        user: [{ validator: checkUser, trigger: ["blur", "change"] }],
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
        this.isLoading = false;

        if (valid) {
          try {
            // Check if we are here because an autologout
            const didAutoLogout = this.$store.getters["auth/didAutoLogout"];
            await this.$store.dispatch("auth/login", actionPayload);

            this.notify(
              "Inicio de sesión",
              `Se ha iniciado sesión correctamente. Usuario: ${this.authForm.user}`,
              "success"
            );

            // If we are here because an autologout, just go back after login
            if (didAutoLogout) this.$router.go(-1);
            else {
              // Go to prev path if redirect, or Home by default
              const redirectUrl = this.$route.redirectedFrom
                ? this.$route.redirectedFrom.path
                : "/";

              this.$router.replace(redirectUrl);
            }
          } catch (error) {
            this.error = error || "Error durante la autentificación";
          }
        } else {
          this.notify(
            `Error`,
            "El formulario no es válido. Revisa que todos los campos han sido correctamente completados",
            "error"
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
