<template>
  <el-card shadow="always" class="main-card">
    <div class="controls">
      <el-button type="primary" @click="$router.push('/adminpanel/user/create')"
        ><i class="el-icon-circle-plus-outline"></i> {{ $t("create-user") }}</el-button
      >
      <el-button type="secondary" align="right" @click="reload()"
        ><i class="el-icon-refresh"></i> {{$t("update-data")}}</el-button
      >
    </div>
    <h1>{{$t('active-users')}}</h1>

    <el-table
      :data="users"
      :default-sort="{ prop: 'id', order: 'ascending' }"
      style="width: 100%"
      max-height="600"
    >
      <el-table-column :label="$t('user-table-code')" prop="id" sortable></el-table-column>
      <el-table-column
        :label="$t('label-firstname')"
        prop="firstname"
        sortable
      ></el-table-column>
      <el-table-column
        :label="$t('label-lastname')"
        prop="lastname"
        sortable
      ></el-table-column>
      <el-table-column
        :label="$t('user-table-username')"
        prop="username"
        sortable
      ></el-table-column>
      <el-table-column :label="$t('label-rol')" prop="role" sortable></el-table-column>
      <el-table-column :label="$t('label-subrol')" prop="subrole" sortable></el-table-column>
      <el-table-column
        align="right"
        min-width="200"
        :label="$t('actions')"
        #default="scope"
      >
        <el-popconfirm
          @confirm="deleteUser(scope.row.id)"
          :title="$t('pop-confirm-delete-user')"
        >
          <template #reference>
            <el-button type="danger" icon="el-icon-delete" plain
              >{{$t('delete')}}</el-button
            >
          </template>
        </el-popconfirm>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import useNotify from "@/hooks/notify.js";
import { localStorageService } from "../../store/modules/UserStorage/actions";
import { userService } from "../../store/modules/users/actions";

export default {
  setup() {
    const { notify } = useNotify();
    return {
      notify,
    };
  },
  created() {
    localStorageService.currentUser.subscribe((x) => (this.currentUser = x));

    userService.getAllUsers().then((users) => (this.users = users));
  },
  data() {
    return {
      isLoading: false,
      error: null,
      currentUser: null,
      users: [],
      id: null,
    };
  },
  methods: {
    reload() {
      location.reload();
    },
    isAdmin() {
      return (
        this.localStorageService.currentUser &&
        this.localStorageService.role === "Admin"
      );
    },

    deleteUser(id) {
      if (this.currentUser.id == id) {
        this.notify("Error", "No puedes eliminar tu propio usuario", "error");
        return;
      } else {
        userService.deleteUser(id).then((response) => {
          if (response == 200) {
            this.notify(
              "Correcto",
              "Usuario eliminado correctamente",
              "success"
            );

            setTimeout(() => {
              this.reload();
            }, 1000);
          } else {
            this.notify("Error", "Error al eliminar el usuario", "error");
          }
        });
      }
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 2rem;
}

.main-card {
  width: 100%;
  margin: 0 auto;
}

.controls {
  display: flex;
  justify-content: space-between;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
