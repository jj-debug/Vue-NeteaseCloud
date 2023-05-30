<template>
  <div class="login">
    <div class="back">
      <div class="x" @click="hiddenLogin(false)">
        <i class="vbestui-iconfont icon-close"></i>
      </div>
      <!-- <div class="son">
        <i class="iconfont icon-Phone phone"></i>
      </div> -->
    </div>
    <div class="main">
      <img :src="this.pic" alt="">
      <div class="loginStatus">
        {{ loginStatus }}
      </div>
      <!-- <div>
        <div class="from-item">
          <b-input type="text" name="phone" id="phone" placeholder="请输入手机号" required clearable v-model="phone"
            @blur="phoneVerify()" />
          <p>{{ phoneMessage }}</p>
        </div>
        <div class="from-item">
          <b-input type="password" name="password" id="password" placeholder="请输入密码" show-password v-model="password" />
          <p>{{ pwdMessage }}</p>
        </div>
        <div class="from-item">
          <b-button background="var(--main-color)" color="#fff" class="log" @click="login">登录</b-button>
        </div>
        <div class="from-item">
          <b-button class="register" @click="sent">发送验证码</b-button>
        </div>
      </div> -->
    </div>
  </div>
</template>
<script>
import { _phoneVerify, _login, _sentCode, _codeVerify, _getKey, _getTCode, _checkTCode, _getLoginStatus, _getUserDetail } from "network/user";
export default {
  name: "Login",
  data() {
    return {
      phone: "",
      phoneMessage: "",
      password: "",
      pwdMessage: "",
      pic: '',
      loginStatus: ''
    };
  },
  mounted() {
    this.$bus.$on('erweima', this.erweima)
  },
  methods: {
    // 创建二维码并监听
    async erweima() {
      let nowtime = Date.now();
      let key = await _getKey(nowtime); // 携带时间戳请求唯一key值
      key = key.data.data.unikey
      this.pic = await _getTCode(key) // 携带key值请求二维码
      this.pic = this.pic.data.data.qrimg
      let check = setInterval(async () => { // 开启定时器轮询二维码状态
        let nowtime2 = new Date().getTime();
        let res = await _checkTCode(key, nowtime2)
        console.log(res.data.message, '---')
        this.loginStatus = res.data.message;
        if (res.data.code == 800) {
          this.$Toast.success(res.data.message)
          clearInterval(check)
        }
        if (res.data.code == 803) {
          this.$Toast.success('登录成功')
          clearInterval(check)
          let status = await _getLoginStatus(res.data.cookie, new Date())
          console.log('status', status);
          let uid = status.data.data.account.id
          let detail = await _getUserDetail(uid)
          this.$store.commit("addUser", detail.data);
          localStorage.setItem('cookie', res.data.cookie);
          localStorage.setItem('avatar', detail.data.profile.avatarUrl);
          localStorage.setItem('nickname', detail.data.profile.nickname);
          localStorage.setItem('uid', detail.data.profile.userId)
          this.hiddenLogin(true)
          this.$bus.$emit('successLogin')
        }
      }, 1000)

    },

    // 发送验证码
    sent() {
      _sentCode(this.phone)
    },

    /**登陆 */
    login() {
      _codeVerify(this.phone, this.password).then((res) => {
        if (res.data.code != 200) {
          this.pwdMessage = "验证码错误";
        } else {

          console.log("res", res);
          // this.$store.commit("addUser", res.data);
          // this.$parent.hiddleLogin();
          // localStorage.setItem('cookie',res.data.cookie);
          // localStorage.setItem('avatar',res.data.profile.avatarUrl);
          // localStorage.setItem('uid',res.data.profile.userId)
          // this.$bus.$emit("pullResource", res.data.cookie);

        }
      })
        .catch(err => {
          console.log(err)
        })
    },
    /**手机号码验证 */
    phoneVerify() {
      if (this.phone == "") {
        this.phoneMessage = "请输入手机号";
        return;
      } else {
        /**res.data.exist=1说明有此账号 */
        _phoneVerify(this.phone).then((res) => {
          if (res.data.exist != 1) {
            this.phoneMessage = "手机号错误";
          } else {
            this.phoneMessage = "";
          }
        });
      }
    },
    hiddenLogin(boolean) {
      for (let i = 1; i < 1000; i++) {
        clearInterval(i);
      }
      this.$parent.hiddleLogin(boolean);
      
      this.$bus.$emit('noLogin')
    }
  },
};
</script>
<style scoped lang="less">
.login {
  width: 400px;
  height: 560px;
  position: relative;
  z-index: 999;
  top: 0px;
  background: #fafafa;
}

.back {
  width: 100%;
  height: 20%;
  position: relative;

  .son {
    width: 58px;
    height: 102px;
    position: absolute;
    left: 0;
    right: 20px;
    top: 80px;
    bottom: 0;
    margin: auto;
  }
}

.x {
  width: 26px;
  height: 26px;
  float: right;
  margin-right: 5px;
  margin-top: 5px;
  text-align: center;
  line-height: 26px;
  cursor: pointer;

  .icon-close {
    font-size: 24px;
  }
}

.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 50%;
    height: 50%;
  }
  div{
    margin-top: 20px;
    text-align: center;
  }
}

.from-item {
  width: 60%;
  margin: 0px auto;
  padding: 10px 0px 10px 10px;

  p {
    color: red;
  }
}

.from-item input {
  width: 200px;
  height: 2em;
}

p {
  font-size: 13px;
}

.log {
  outline-style: none;
  background: red;
  color: #fff;
  border: 0;
  height: 40px;
  width: 200px;
  border-radius: 10px;
}

.register {
  color: #333;
  text-align: center;
  margin-right: 35px;
  border: 0;
  height: 40px;
  width: 200px;
  border-radius: 10px;
}

.phone {
  color: var(--main-color);
  font-size: 64px;
}
</style>