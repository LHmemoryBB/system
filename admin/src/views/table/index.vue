<template>
  <div class="app-container">
    <el-table border :data="list" style="width: 100%" height="80vh">
      <el-table-column prop="username" label="账号"> </el-table-column>
      <el-table-column prop="nickname" label="用户名"> </el-table-column>
      <el-table-column prop="studentid" label="用户学号"> </el-table-column>
      <el-table-column prop="major" label="用户专业"> </el-table-column>
      <el-table-column prop="class" label="用户班级"> </el-table-column>
      <el-table-column prop="email" label="用户邮箱"> </el-table-column>
      <el-table-column label="用户管理">
        <template slot-scope="scope">
          <el-button
            @click="handleClick1(scope.row)"
            type="success"
            style="margin-right: 30px"
            size="small"
            >修改信息</el-button
          >
          <el-button @click="handleClick2(scope.row)" type="danger" size="small"
            >删除用户</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="修改个人信息"
      :visible.sync="isShow"
      :close-on-click-modal="false"
      width="30%"
    >
      <div class="form_box">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="80px"
        >
          <el-form-item label="姓名" prop="nickname">
            <el-input v-model="ruleForm.nickname"></el-input>
          </el-form-item>
          <el-form-item label="学号" prop="studentid">
            <el-input v-model="ruleForm.studentid"></el-input>
          </el-form-item>
          <el-form-item label="专业" prop="major">
            <el-input v-model="ruleForm.major"></el-input>
          </el-form-item>
          <el-form-item label="班级" prop="class">
            <el-input v-model="ruleForm.class"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="ruleForm.email"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="handleEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getInfo,
  setUser,
  setPassword,
  getUser,
  delUser,
  getList,
} from "@/api/user";

export default {
  data() {
    const validateQQEmail = (rule, value, callback) => {
      // QQ邮箱正则表达式
      const qqEmailPattern = /^[a-zA-Z0-9._%+-]+@qq\.com$/;
      if (!value) {
        return callback(new Error("请输入邮箱地址"));
      }
      if (!qqEmailPattern.test(value)) {
        return callback(new Error("请输入正确的QQ邮箱地址"));
      }
      callback();
    };
    return {
      list: [],
      isShow: false,
      isShow2: false,
      info: {},
      ruleForm: {},
      ruleForm2: {
        oldPwd: "",
        newPwd: "",
      },
      rules: {
        nickname: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        studentid: [{ required: true, message: "请输入学号", trigger: "blur" }],
        major: [{ required: true, message: "请输入专业", trigger: "blur" }],
        class: [{ required: true, message: "请输入班级", trigger: "blur" }],
        email: [
          {
            required: true,
            validator: validateQQEmail,
            trigger: "blur",
            message: "请检查邮箱格式",
          },
        ],
        oldPwd: [{ required: true, message: "请输入旧密码", trigger: "blur" }],
        newPwd: [{ required: true, message: "请输入新密码", trigger: "blur" }],
      },
    };
  },
  async created() {
    this.getUserList();
  },
  methods: {
    async getUserList() {
      const { data } = await getUser();
      this.list = data;
    },
    handleClick1(row) {
      this.ruleForm = JSON.parse(JSON.stringify(row));
      this.isShow = true;
    },
    handleClick2(row) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delUser({ id: row.id }).then((res) => {
            if (res.status == 0) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.getUserList();
            } else {
              this.$message.error(res.message);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleEdit2() {
      this.$refs["ruleForm2"].validate(async (valid) => {
        if (valid) {
          const { message } = await setPassword(this.ruleForm2);
          this.$message.success(message);
          this.isShow2 = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleEdit() {
      this.$refs["ruleForm"].validate(async (valid) => {
        if (valid) {
          setUser(this.ruleForm).then((res) => {
            if (res.status == 0) {
              this.$message.success("修改成功");
              this.isShow = false;
              this.getUserList();
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.app-container {
  display: flex;
}

.btn_div {
  margin-left: 30px;
}

.info_div {
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: bold;
}
</style>
