<template>
  <div class="app-container">
    <el-card style="width: 500px;height: 800px;">
      <div class="info_div">
        姓名：{{info.nickname}}
      </div>
      <div class="info_div">
        学号：{{info.studentId}}
      </div>
      <div class="info_div">
        专业：{{info.major}}
      </div>
      <div class="info_div">
        班级：{{info.class}}
      </div>
    </el-card>
    <div class="btn_div">
      <el-button type="primary" @click="isShow = true">修改个人信息</el-button>
      <el-button type="warning">重置密码</el-button>
      <el-button type="danger">修改个人信息</el-button>
    </div>
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
          <el-form-item
            label="姓名"
            prop="nickname"
          >
            <el-input v-model="ruleForm.nickname"></el-input>
          </el-form-item>
          <el-form-item
            label="学号"
            prop="studentId"
          >
            <el-input v-model="ruleForm.studentId"></el-input>
          </el-form-item>
          <el-form-item
            label="专业"
            prop="major"
          >
            <el-input v-model="ruleForm.major"></el-input>
          </el-form-item>
          <el-form-item
            label="班级"
            prop="class"
          >
            <el-input v-model="ruleForm.class"></el-input>
          </el-form-item>
          <el-form-item
            label="邮箱"
            prop="email"
          >
            <el-input v-model="ruleForm.email"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="isShow = false">取 消</el-button>
        <el-button
          type="primary"
          @click="handleEdit"
        >确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改个人信息"
      :visible.sync="isShow2"
      :close-on-click-modal="false"
      width="30%"
    >
      <div class="form_box">
        <el-form
          :model="ruleForm2"
          :rules="rules"
          ref="ruleForm2"
          label-width="80px"
        >
          <el-form-item
            label="旧密码"
            prop="oldPwd"
          >
            <el-input v-model="ruleForm2.oldPwd"></el-input>
          </el-form-item>
          <el-form-item
            label="新密码"
            prop="newPwd"
          >
            <el-input v-model="ruleForm2.newPwd"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="isShow2 = false">取 消</el-button>
        <el-button
          type="primary"
          @click="handleEdit2"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getInfo, setUser, setPassword } from "@/api/user"

export default {
  data () {
    return {
      isShow: false,
      isShow2: false,
      info: {},
      ruleForm: {},
      ruleForm2: {
        oldPwd: "",
        newPwd: "",
      },
      rules: {
        nickname: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        studentId: [
          { required: true, message: '请输入学号', trigger: 'blur' }
        ],
        major: [
          { required: true, message: '请输入专业', trigger: 'blur' }
        ],
        class: [
          { required: true, message: '请输入班级', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        oldPwd: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        newPwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
      }
    }
  },
  async created () {
    const { data } = await getInfo()
    this.info = data
    this.ruleForm = JSON.parse(JSON.stringify(this.info))
  },
  methods: {
    handleEdit2 () {
      this.$refs['ruleForm2'].validate(async (valid) => {
        if (valid) {
          const { message } = await setPassword(this.ruleForm2)
          this.$message.success(message)
          this.isShow2 = false
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleEdit () {
      this.$refs['ruleForm'].validate(async (valid) => {
        if (valid) {
          const { message } = await setUser(this.ruleForm)
          this.$message.success(message)
          this.isShow = false
          const { data } = await getInfo()
          this.info = data
          this.ruleForm = JSON.parse(JSON.stringify(this.info))

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
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
