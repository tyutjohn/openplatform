<template>
  <el-header class="header theme-bg-blue">
    <router-link to="/index">
      <div class="logo" :class="{'logo-hide': !openNav && !minScreen}">
        <img src="../../assets/logo.png" class="image" />
        <span class="text">Open Mutual Platform</span>
      </div>
    </router-link>
    <div class="content">
      <i class="fa fa-outdent toggle" @click="navOpenToggle" :title="$t('header.toggleNav')" v-show="openNav"></i>
      <i class="fa fa-indent toggle" @click="navOpenToggle" :title="$t('header.toggleNav')" v-show="!openNav"></i>
    </div>
    <div class="right" v-if="!minScreen">
      <div class="right-item">
        {{ $t('header.themeChange') }}
        <theme-picker></theme-picker>
      </div>
      <div class="right-item" @click="clickLangue">
        <el-dropdown trigger="click" @command="changeLanguage" id="langDropDown">
          <p class="user-info">
            {{ $t('header.languageSelect') }}
            <i class="el-icon-arrow-down el-icon--right drop-icon" id="langDropIcon"></i>
          </p>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="zh-cn" :disabled="this.lang==='zh-cn'">
              {{$t('header.langZh')}}
            </el-dropdown-item>
            <el-dropdown-item command="en" :disabled="this.lang==='en'">
              {{$t('header.langEn')}}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="right-item">
        <el-dropdown trigger="click">
          <p class="user-info">
            {{ user_name }}<i class="fa fa-user-o" style="margin-left: 10px"></i>
          </p>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <router-link to="/user/password">{{$t('header.modifyPass')}}</router-link>
            </el-dropdown-item>
            <el-dropdown-item divided @click.native="logout()">
              {{$t('header.logout')}}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div v-if="minScreen" class="right">
      <el-dropdown trigger="click" :hide-on-click="false">
        <p class="user-info">
          <i class="fa fa-user-o"></i>
        </p>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            {{ user_name }}
          </el-dropdown-item>
          <el-dropdown-item divided>
            {{ $t('header.themeChange') }}
            <theme-picker></theme-picker>
          </el-dropdown-item>
          <el-dropdown-item>
            <el-dropdown trigger="click" @command="changeLanguage" placement="left">
              <p class="user-info">
                {{ $t('header.languageSelect') }}
                <i class="el-icon-arrow-down el-icon--right drop-icon"></i>
              </p>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="zh-cn" :disabled="this.lang==='zh-cn'">
                  {{$t('header.langZh')}}
                </el-dropdown-item>
                <el-dropdown-item command="en" :disabled="this.lang==='en'">
                  {{$t('header.langEn')}}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout()">
            {{$t('header.logout')}}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script>
  import ThemePicker from '@/components/ThemePicker'
  import {
    requestLogout
  } from '@/api/user'

  export default {
    name: 'TheLayoutHeader',
    props: ['openNav'],
    components: {
      ThemePicker
    },
    data() {
      const user_info = JSON.parse(sessionStorage.getItem('user-info'))
      const user_name = user_info['name']
      const lang = localStorage.getItem('user-language') || 'zh-cn'
      let min_screen = window.innerWidth < 768
      return {
        user_name: user_name,
        langDrop: false,
        lang: lang,
        minScreen: min_screen
      }
    },
    methods: {
      navOpenToggle() {
        this.$emit('toggle-open')
      },
      logout() {
        const user_info = JSON.parse(sessionStorage.getItem('user-info'))
        requestLogout({
          'userId': user_info['id']
        }).then(data => {
          this.$message({
            message: this.$t('header.logoutSuccess'),
            type: 'success'
          })
          this.$router.push('/login')
        })
      },
      changeLanguage(language) {
        localStorage.setItem('user-language', language)
        this.$i18n.locale = language
        this.lang = language
      },
      clickLangue() {
        let langDropIcon = document.getElementById('langDropIcon')
        if (this.langDrop) {
          langDropIcon.style.transform = 'rotate(0deg)'
        } else {
          langDropIcon.style.transform = 'rotate(-180deg)'
        }
        this.langDrop = !this.langDrop
      }
    }
  }

</script>

<style scoped lang="scss">
  .header {
    color: #ffffff;
    line-height: 60px;
    user-select: none;

    div {
      display: inline-block;
    }

    .logo {
      width: 240px;
      border-right: 1px solid #C0C4CC;
      margin-left: -20px;
      text-align: center;
      font-size: 25px;
      cursor: pointer;

      .image {
        width: 40px;
        height: 40px;
        vertical-align: middle;
      }

      .text{
        font-size: 14px
      }
    }

    .logo-hide {
      width: 65px;

      .text {
        display: none;
      }
    }

    .content {
      padding: 0 20px;

      .toggle {
        font-size: 14px;
        cursor: pointer;
      }
    }

    .right {
      float: right;

      .right-item {
        display: inline-block;
        padding: 0 10px;
        min-width: 60px;
        text-align: center;
        font-size: 14px;
        cursor: pointer;

        .drop-icon {
          transition: transform 0.2s;
        }
      }

      .right-item:hover {
        background-color: rgba(255, 255, 255, 0.3);
      }

      .user-info {
        color: #ffffff;
      }
    }
  }

  @media (max-width: 768px) {
    .header {
      .logo {
        border: none;
      }

      .content {
        float: left;
        margin-left: -20px;
      }
    }
  }

</style>
