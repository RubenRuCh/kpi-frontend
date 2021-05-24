<template>
  <el-card shadow="always" class="profile">
    <h1>{{ $t("user-profile") }}</h1>

    <div class="tag-group">
      <el-button
        type="success"
        id="rol"
        icon="el-icon-info"
        round
        @click="open()"
        >{{ currentUser.role }}</el-button
      >
    </div>
    <br />
    <span class="info_title">{{ $t("user-info") }}</span>
    <br />
    <hr />
    <br />
    <el-form label-position="left" label-width="150px" :model="form">
      <el-form-item :label="$t('label-username')">
        <el-input
          disabled
          prefix-icon="el-icon-user"
          v-model="form.username"
        ></el-input>
      </el-form-item>

      <el-form-item
        :label="$t('label-rol')"
        prop="rol"
      >
        <el-select v-model="selected" disabled>
          <el-option :label="form.rol" :value="form.rol"> </el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('label-subrol')" prop="subrol">
        <el-select v-model="subselected" disabled>
          <el-option :label="form.subrol" :value="form.subrol"> </el-option>
        </el-select>
      </el-form-item>

      <br />
      <span class="info_title">{{ $t("personal-info") }}</span>
      <br />
      <hr />
      <br />

      <el-form-item :label="$t('label-firstname')">
        <el-input
          prefix-icon="el-icon-user"
          v-model="form.firstname"
        ></el-input>
      </el-form-item>

      <el-form-item :label="$t('label-lastname')">
        <el-input prefix-icon="el-icon-user" v-model="form.lastname"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button
          class="modify"
          @click="updateFields(currentUser.id)"
          type="primary"
          icon="el-icon-edit"
          >{{ $t("modify-user") }}</el-button
        >
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import useNotify from "@/hooks/notify.js";
import { localStorageService } from "@/store/modules/UserStorage/actions";
import { userService } from "@/store/modules/users/actions";

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
      selected: "",
      subselected: "",
      form: {
        username: "",
        firstname: "",
        lastname: "",
        rol: "",
        subrol: "",
      },
    };
  },
  created() {
    localStorageService.currentUser.subscribe((x) => (this.currentUser = x));
    this.loadData();
  },

  methods: {
    async loadData() {
      let datos = await userService
        .getById(this.currentUser.id)
        .then((user) => (this.userDataDB = user));

      this.form.username = datos.username;
      this.form.firstname = datos.firstname;
      this.form.lastname = datos.lastname;
      this.form.rol = datos.role;
      this.form.subrol = datos.service;
      this.selected = this.form.rol;
      this.subselected = this.form.subrol;
    },

    async updateFields(id) {
      let params = {
        username: this.form.username,
        firstname: this.form.firstname,
        lastname: this.form.lastname,
        role: this.selected,
        subrol: this.subselected,
      };

      let response = await userService.updateUser(id, params);

      let currentUser = JSON.stringify(response.body);

      if (response["status"] == 200) {
        localStorage.setItem("currentUser", currentUser);

        this.notify(
          this.$t("user-update-title"),
          this.$t("user-update-body"),
          "success"
        );

        setTimeout(() => {
          location.reload();
        }, 1000);
      } else {
        this.notify(
          this.$t("error-user-update-title"),
          this.$t("error-user-update-body"),
          "error"
        );
      }
    },

    open() {
      if (this.isAdmin()) {
        this.$alert(
          `${this.currentUser.role}: ${this.$t("admin-info-body")}`,
          this.$t("info-title"),
          {
            confirmButtonText: "OK",
          }
        );
      } else {
        this.$alert(
          `${this.currentUser.role}: ${this.$t("service-info-body")}`,
          this.$t("info-title"),
          {
            confirmButtonText: "OK",
          }
        );
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