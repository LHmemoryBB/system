<template>
  <div class="login-container">
    <div class="form-container">
      <div class="title-container">
        <h3 class="title">
          {{ showForm == 1 ? "登录" : showForm == 2 ? "注册" : "密码找回" }}
        </h3>
      </div>
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        auto-complete="on"
        label-position="left"
        v-if="showForm == 1"
      >
        <el-form-item prop="studentid">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="studentid"
            v-model="loginForm.studentid"
            placeholder="请输入学号"
            name="studentid"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="请输入密码"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon
              :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
            />
          </span>
        </el-form-item>
        <div style="text-align: end; margin-bottom: 20px">
          <el-link type="warning" @click="registerUser(3)">忘记密码</el-link>
        </div>
        <el-button
          :loading="loading"
          type="primary"
          style="width: 100%; margin-bottom: 30px"
          @click.native.prevent="handleLogin"
          >登录</el-button
        >
        <div style="float: right">
          <el-button type="text" @click="registerUser(2)"
            >没有账号，前往注册</el-button
          >
        </div>
      </el-form>
      <el-form
        ref="registerForm"
        :model="registerForm"
        :rules="registerRules"
        class="login-form"
        auto-complete="on"
        label-position="left"
        v-else-if="showForm == 2"
      >
        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="username"
            v-model="registerForm.username"
            placeholder="请输入用户名"
          />
        </el-form-item>
        <el-form-item prop="nickname">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="nickname"
            v-model="registerForm.nickname"
            placeholder="请输入姓名"
          />
        </el-form-item>
        <el-form-item prop="studentid">
          <span class="svg-container">
            <svg-icon icon-class="studentId" />
          </span>
          <el-input
            ref="studentid"
            v-model="registerForm.studentid"
            placeholder="请输入学号"
          />
        </el-form-item>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="registerForm.password"
            :type="passwordType"
            placeholder="请输入密码"
            name="password"
            tabindex="2"
            auto-complete="on"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon
              :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
            />
          </span>
        </el-form-item>
        <el-form-item prop="email">
          <span class="svg-container">
            <svg-icon icon-class="email" />
          </span>
          <el-input
            ref="email"
            v-model="registerForm.email"
            placeholder="请输入邮箱"
          />
        </el-form-item>
        <el-form-item prop="major">
          <span class="svg-container">
            <svg-icon icon-class="major" />
          </span>
          <el-input
            ref="major"
            v-model="registerForm.major"
            placeholder="请输入专业"
          />
        </el-form-item>
        <el-form-item prop="classn">
          <span class="svg-container">
            <svg-icon icon-class="class" />
          </span>
          <el-input
            ref="classn"
            v-model="registerForm.classn"
            placeholder="请输入班级"
          />
        </el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          style="width: 100%; margin-bottom: 30px"
          @click="handleRegister"
          >注册</el-button
        >
        <div style="float: right">
          <el-button type="text" @click="registerUser(1)"
            >已有账号，前往登录</el-button
          >
        </div>
      </el-form>
      <el-form
        ref="forgetPaForm"
        :model="forgetPaForm"
        :rules="forgetRules"
        class="login-form"
        auto-complete="on"
        label-position="left"
        v-else-if="showForm == 3"
      >
        <el-form-item prop="studentid">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="studentid"
            v-model="forgetPaForm.studentid"
            placeholder="请输入学号"
          />
        </el-form-item>
        <el-form-item prop="email">
          <span class="svg-container">
            <svg-icon icon-class="email" />
          </span>
          <el-input
            ref="email"
            v-model="forgetPaForm.email"
            placeholder="请输入邮箱"
          >
          </el-input>
        </el-form-item>
        <div style="text-align:right;margin-bottom: 10px;">
          <el-link type="primary" @click="getEmailCode">获取验证码</el-link>
        </div>
        <el-form-item prop="code">
          <span class="svg-container">
            <svg-icon icon-class="studentId" />
          </span>
          <el-input
            ref="code"
            v-model="forgetPaForm.code"
            placeholder="请输入验证码"
          />
        </el-form-item>
        <el-form-item prop="newPassword">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="forgetPaForm.newPassword"
            :type="passwordType"
            placeholder="请输入新密码"
            name="password"
            tabindex="2"
            auto-complete="on"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon
              :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
            />
          </span>
        </el-form-item>

        <el-button
          :loading="loading"
          type="primary"
          style="width: 100%; margin-bottom: 30px"
          @click="handleChangePassword"
          >更改密码</el-button
        >
        <div style="float: right">
          <el-button type="text" @click="registerUser(1)">返回登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { regUser, forgetPassword, changePassword } from "@/api/user";
export default {
  name: "Login",
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
      loginForm: {
        // username: "1204",
        // password: "123456",
      },
      forgetPaForm: {},
      registerForm: {},
      loginRules: {
        studentid: [
          { required: true, trigger: "blur", message: "请输入学号" },
        ],
        password: [{ required: true, trigger: "blur", message: "请输入密码" }],
      },
      registerRules: {
        username: [
          { required: true, trigger: "blur", message: "请输入用户名" },
        ],
        nickname: [{ required: true, trigger: "blur", message: "请输入姓名" }],
        password: [{ required: true, trigger: "blur", message: "请输入密码" }],
        studentid: [{ required: true, trigger: "blur", message: "请输入学号" }],
        email: [
          {
            required: true,
            validator: validateQQEmail,
            trigger: "blur",
            message: "请检查邮箱格式",
          },
        ],
        classn: [{ required: true, trigger: "blur", message: "请输入班级" }],
        major: [{ required: true, trigger: "blur", message: "请输入专业" }],
      },
      forgetRules: {
        newPassword: [{ required: true, trigger: "blur", message: "请输入密码" }],
        code: [{ required: true, trigger: "blur", message: "请输入验证码" }],
        studentid: [{ required: true, trigger: "blur", message: "请输入学号" }],
        email: [
          {
            required: true,
            validator: validateQQEmail,
            trigger: "blur",
            message: "请检查邮箱格式",
          },
        ],
         
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
      showForm: true,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      console.log(2222);
      this.$refs.loginForm.validate((valid) => {
        console.log(valid);
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || "/" });
              this.$message.success("登录成功");
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          this.loading = false;
          return false;
        }
      });
    },
    async handleRegister() {
      this.$refs.registerForm.validate((valid) => {
        console.log(valid, "校验");
        if (valid) {
          this.loading = true;
          regUser(this.registerForm).then((res) => {
            if (res.success) {
              this.$message.success("注册成功");
              this.loginForm.studentid = this.registerForm.studentid;
              this.loginForm.password = this.registerForm.password;
              this.loading = false;
              setTimeout(() => {
                this.showForm = true;
              }, 1500);
            }
          });
        } else {
          console.log("error submit!!");
          this.loading = false;
          return false;
        }
      });
    },
    async handleChangePassword() {
      this.$refs.forgetPaForm.validate((valid) => {
        if (valid) {
          changePassword(this.forgetPaForm).then(res =>{
            if (res.status == 0) {
              this.$message.success('密码修改成功！')
            }else{
              this.$message.error('修改密码失败，请联系管理员')
            }
          })
        } else {
          console.log("error submit!!");
          this.loading = false;
          return false;
        }
      });
    },
    registerUser(val) {
      this.showForm = val;
    },
    getEmailCode(){
      const promises = [
        new Promise((resolve, reject) => {
          this.$refs.forgetPaForm.validateField('email', (error) => {
            if (error) reject(error);
            else resolve();
          });
        }),
        new Promise((resolve, reject) => {
          this.$refs.forgetPaForm.validateField('studentid', (error) => {
            if (error) reject(error);
            else resolve();
          });
        })
        
      ];
      Promise.all(promises)
        .then(() => {
          const obj = {
            email: this.forgetPaForm.email,
            studentid: this.forgetPaForm.studentid
          }
          forgetPassword(obj).then(res =>{
            if (res.status == 0) {
              this.$message.success(res.message)
            }else{
              this.$message.error(res.message)
            }
          })
        })
        .catch((error) => {
          console.log('校验不通过', error);
        });
    }
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-image: url("../../assets/img/login-background.jpg");
  background-size: 100%;
  .form-container {
    background: #020202d4;
    padding: 20px 30px;
    border-radius: 15px;
  }
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;

      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
