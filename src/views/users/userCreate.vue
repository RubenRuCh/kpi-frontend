<template>
  <el-card shadow="always" class="create">
    <h1>{{ $t("new-user") }}</h1>
    <br />
    <span class="info_title">{{ $t("user-info") }}</span>
    <br />
    <hr />
    <br />
    <el-form
      label-position="left"
      label-width="150px"
      :model="form"
      :rules="rules"
      @submit.prevent="createUser"
      ref="form"
    >
      <el-form-item :label="$t('label-username')" prop="username">
        <el-input
          prefix-icon="fas fa-user-tag"
          v-model="form.username"
        ></el-input>
      </el-form-item>

      <el-form-item :label="$t('label-rol')" prop="rol">
        <el-select v-model="form.rol" prop="rol">
          <el-option
            v-for="(rol, index) in roles"
            :key="index"
            :label="rol.role"
            :value="rol.role"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('label-subrol')" prop="subrol">
        <el-select
          prop="subrol"
          v-model="form.subrol"
          :disabled="disableSubRol()"
        >
          <el-option
            v-for="(subrol, index) in subroles"
            :key="index"
            :label="subrol.service"
            :value="subrol.service"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <br />
      <span class="info_title">{{ $t("personal-info") }}</span>
      <br />
      <hr />
      <br />

      <el-form-item :label="$t('label-firstname')" prop="firstname">
        <el-input
          prefix-icon="el-icon-user"
          v-model="form.firstname"
        ></el-input>
      </el-form-item>

      <el-form-item :label="$t('label-lastname')" prop="lastname">
        <el-input prefix-icon="el-icon-user" v-model="form.lastname"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button
          class="modify"
          @click="createUser()"
          type="primary"
          icon="el-icon-check"
          >{{ $t("create-user") }}</el-button
        >
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import useNotify from "@/hooks/notify.js";
import { localStorageService } from "@/store/modules/UserStorage/actions";
import { userService } from "@/store/modules/users/actions";
import { roleService } from "@/store/modules/roles/actions";
import router from "../../router";

export default {
  setup() {
    const { notify } = useNotify();
    return {
      notify,
    };
  },
  data() {
    return {
      currentUser: null,
      roles: [],
      subroles: [],
      form: {
        username: "",
        firstname: "",
        lastname: "",
        rol: "",
        subrol: "",
      },
      rules: {
        username: [
          {
            required: true,
            message: this.$t('user-username-needed'),
            trigger: "blur",
          },
        ],
        firstname: [
          {
            required: true,
            message: this.$t('user-firstname-needed'),
            trigger: "blur",
          },
        ],
        lastname: [
          {
            required: true,
            message: this.$t('user-lastname-needed'),
            trigger: "blur",
          },
        ],
        rol: [
          {
            required: true,
            message: this.$t('user-rol-needed'),
            trigger: "change",
          },
        ],
        subrol: [
          {
            required: true,
            message: this.$t('user-subrole-needed'),
            trigger: "change",
          },
        ],
      },
    };
  },
  created() {
    localStorageService.currentUser.subscribe((x) => (this.currentUser = x));
    this.getRoles();
    this.getSubroles();
  },

  methods: {
    disableSubRol() {
      if (this.form.rol == "Admin") {
        this.form.subrol = "--";
        return true;
      } else {
        this.form.subrol = this.subroles[Math.floor(Math.random() * this.subroles.length)];
        
        return false;
      }
    },

    async getRoles() {
      roleService.getAllRoles().then((roles) => (this.roles = roles));
    },

    async getSubroles() {
      roleService
        .getAllSubroles()
        .then((subroles) => (this.subroles = subroles));
    },

    async createUser() {

      let params = {
        username: this.form.username,
        firstname: this.form.firstname,
        lastname: this.form.lastname,
        role:  this.form.rol,
        subrol: this.form.subrol,
      };

      let valid = await this.$refs.form.validate();

      if (!valid) {
        return;
      }

      let response = await userService.createUser(params);

      if (response.status == 200) {
        this.notify(
          this.$t('user-add-title'),
          this.$t('user-add-body'),
          "success"
        );

        setTimeout(() => {
          router.push("/adminpanel/user/list");
        }, 1000);
      } else {
        this.notify(
          this.$t('error-user-add-title'),
          this.$t('error-user-add-body'),
          "error"
          
        )
      }
    },

    isAdmin() {
      return this.currentUser && this.currentUser.role === "Admin";
    },
  },
};
</script>

<style scoped>

span.info_title {
  font-weight: bolder;
}
h1 {
  font-size: 2rem;
}
span {
  color: #606266;
}

.modify {
  float: right;
}

label {
  color: #909399;
}
.el-card {
  width: 100%;
  margin: 0 auto;
}

.tag-group {
  display: flex;
}

.info_title {
  float: left;
}

#rol {
  text-transform: capitalize;
}

.el-select {
  width: 100%;
}
</style>