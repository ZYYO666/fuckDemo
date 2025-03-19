<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { House, User, Expand, Fold, Setting } from '@element-plus/icons-vue';

const router = useRouter();
const activeMenu = ref(router.currentRoute.value.path);
const isCollapse = ref(false);
const currentTime = ref(new Date().toLocaleTimeString());

// 更新时间
setInterval(() => {
  currentTime.value = new Date().toLocaleTimeString();
}, 1000);
</script>

<template>
  <el-container class="app-wrapper">
    <!-- 侧边栏 -->
    <el-aside :width="isCollapse ? '64px' : '200px'" class="sidebar-container">
      <div class="logo-container">
        <img src="/logo.svg" alt="logo" class="logo-img" />
        <span v-show="!isCollapse" class="logo-text">学生管理系统</span>
      </div>

      <el-menu :default-active="activeMenu" :collapse="isCollapse" class="sidebar-menu" :router="true">
        <el-menu-item index="/">
          <el-icon>
            <House />
          </el-icon>
          <template #title>首页</template>
        </el-menu-item>
        <el-menu-item index="/manager">
          <el-icon>
            <User />
          </el-icon>
          <template #title>学生管理</template>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <!-- 主容器 -->
    <el-container class="main-container">
      <!-- 顶部导航栏 -->
      <el-header class="navbar" height="60px">
        <div class="navbar-left">
          <el-icon class="fold-btn" @click="isCollapse = !isCollapse">
            <Expand v-if="isCollapse" />
            <Fold v-else />
          </el-icon>
        </div>

        <div class="navbar-right">
          <span class="current-time">{{ currentTime }}</span>
          <el-dropdown>
            <span class="user-dropdown">
              <el-avatar :size="32" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
              <span class="username">管理员</span>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <el-icon>
                    <Setting />
                  </el-icon>
                  <span>设置</span>
                </el-dropdown-item>
                <el-dropdown-item divided>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <!-- 主要内容区域 -->
      <el-main class="main-content">
        
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.app-wrapper {
  height: 100vh;
  overflow: hidden;
}

.main-container {
  height: 100vh;
  overflow: hidden;
  background-color: #f6f8fa;
}

.navbar {
  height: 60px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  position: relative;
  z-index: 1000;
}

.navbar-left {
  display: flex;
  align-items: center;
}

.fold-btn {
  font-size: 20px;
  cursor: pointer;
  transition: color 0.3s;
}

.fold-btn:hover {
  color: #409EFF;
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.current-time {
  color: #666;
  font-size: 14px;
}

.user-dropdown {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.username {
  font-size: 14px;
  color: #333;
}

.main-content {
  height: calc(100vh - 60px);
  padding: 24px;
  overflow: hidden;
  background-color: #f6f8fa;
}

.sidebar-container {
  background-color: #001529;
  transition: all 0.3s ease;
  overflow: hidden;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.08);
}

.logo-container {
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  background: #002140;
  transition: all 0.3s ease;
}

.logo-img {
  width: 32px;
  height: 32px;
}

.logo-text {
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  margin-left: 12px;
  white-space: nowrap;
}

.sidebar-menu {
  border: none;
  background-color: #001529;
}

.sidebar-menu :deep(.el-menu-item) {
  color: #a6adb4;
  height: 50px;
  line-height: 50px;
  transition: all 0.3s ease;
}

.sidebar-menu :deep(.el-menu-item.is-active) {
  color: #fff;
  background-color: #1890ff;
}

.sidebar-menu :deep(.el-menu-item:hover) {
  color: #fff;
  background-color: #1890ff;
}

:deep(.el-menu--collapse) {
  width: 64px;
}
</style>