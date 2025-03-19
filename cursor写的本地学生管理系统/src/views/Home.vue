<script setup>
import { ref } from 'vue';

const statistics = ref({
  totalStudents: localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')).length : 0,
  lastUpdate: localStorage.getItem('lastUpdate') || '暂无更新'
});
</script>

<template>
  <div class="home-container">
    <div class="welcome-section">
      <h1>欢迎使用学生信息管理系统</h1>
      <p class="subtitle">一个简单高效的学生信息管理平台</p>
    </div>

    <div class="stats-container">
      <el-card class="stat-card" :body-style="{ padding: '0px' }">
        <div class="stat-card-content">
          <div class="stat-icon">
            <el-icon><User /></el-icon>
          </div>
          <div class="stat-info">
            <div class="stat-value">{{ statistics.totalStudents }}</div>
            <div class="stat-label">学生总数</div>
          </div>
        </div>
      </el-card>

      <el-card class="stat-card" :body-style="{ padding: '0px' }">
        <div class="stat-card-content">
          <div class="stat-icon" style="background: #67C23A;">
            <el-icon><Timer /></el-icon>
          </div>
          <div class="stat-info">
            <div class="stat-value">{{ statistics.lastUpdate }}</div>
            <div class="stat-label">最后更新</div>
          </div>
        </div>
      </el-card>

      <el-card class="feature-card">
        <template #header>
          <div class="card-header">
            <span>系统功能</span>
          </div>
        </template>
        <div class="feature-list">
          <div class="feature-item">
            <el-icon><Document /></el-icon>
            <span>学生信息管理</span>
          </div>
          <div class="feature-item">
            <el-icon><Search /></el-icon>
            <span>快速搜索</span>
          </div>
          <div class="feature-item">
            <el-icon><Upload /></el-icon>
            <span>数据导入导出</span>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  padding: 20px;
}

.welcome-section {
  text-align: center;
  margin-bottom: 40px;
}

.welcome-section h1 {
  font-size: 2.5em;
  color: #2c3e50;
  margin-bottom: 10px;
}

.subtitle {
  color: #666;
  font-size: 1.2em;
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.stat-card, .feature-card {
  height: 100%;
}

.card-header {
  font-weight: bold;
  color: #2c3e50;
}

.stat-card {
  border-radius: 8px;
  overflow: hidden;
}

.stat-card-content {
  display: flex;
  align-items: center;
  padding: 20px;
}

.stat-icon {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  background: #409EFF;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
}

.stat-icon :deep(.el-icon) {
  font-size: 40px;
  color: white;
}

.stat-info {
  flex: 1;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 14px;
  color: #909399;
}

.feature-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  padding: 10px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 8px;
  background-color: #f5f7fa;
  transition: all 0.3s;
}

.feature-item:hover {
  transform: translateY(-2px);
  background-color: #ecf5ff;
}

.feature-item .el-icon {
  color: #409EFF;
  font-size: 1.2em;
}
</style>
