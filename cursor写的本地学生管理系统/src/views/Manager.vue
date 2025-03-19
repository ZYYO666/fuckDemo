<script setup>
import { ref, onMounted, computed } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Download, Upload, Plus, Delete, Edit, Search } from '@element-plus/icons-vue';
import { useStudentStore } from '../stores/studentStore';
import { defaultStudent, studentRules } from '../models/student';
import { testDataService } from '../services/testDataService';

// 使用 store
const studentStore = useStudentStore();

// 学生信息数据结构
const students = computed(() => studentStore.students);
const loading = computed(() => studentStore.loading);
const drawerVisible = ref(false);
const drawerTitle = ref('新增学生');
const newStudent = ref({ ...defaultStudent });

// 表单规则
const rules = studentRules;

const formRef = ref(null);
const multipleSelection = ref([]);

// 分页相关
const currentPage = ref(1);
const pageSize = ref(20); // 默认每页显示20条

// 定义分页选项
const pageSizes = [20, 50, 100, 200]; // 更大的分页选项

// 搜索条件
const searchForm = ref({
    keyword: '',
    college: '',
    major: '',
    gender: ''
});

// 排序
const sortConfig = ref({
    prop: '',
    order: ''
});

// 提交表单
const submitForm = async () => {
    if (!formRef.value) return;

    try {
        await formRef.value.validate();

        if (!newStudent.value.id) {
            // 添加新学生
            const success = await studentStore.addStudent(newStudent.value);
            if (success) {
                ElMessage.success('学生信息添加成功');
                drawerVisible.value = false;
            }
        } else {
            // 更新学生信息
            const success = await studentStore.updateStudent(newStudent.value);
            if (success) {
                ElMessage.success('学生信息更新成功');
                drawerVisible.value = false;
            }
        }
    } catch (error) {
        console.error('表单验证失败:', error);
    }
};

// 删除学生
const deleteStudent = async (id) => {
    try {
        await ElMessageBox.confirm('确定要删除该学生信息吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        });

        const success = await studentStore.deleteStudent(id);
        if (success) {
            ElMessage.success('学生信息删除成功');
        }
    } catch (error) {
        if (error !== 'cancel') {
            console.error('删除失败:', error);
        }
    }
};

// 批量删除
const handleSelectionChange = (val) => {
    multipleSelection.value = val;
};

const batchDelete = async () => {
    if (multipleSelection.value.length === 0) {
        ElMessage.warning('请选择要删除的学生');
        return;
    }

    try {
        await ElMessageBox.confirm(
            `确定要删除选中的 ${multipleSelection.value.length} 名学生吗？`,
            '提示',
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }
        );

        const ids = multipleSelection.value.map(item => item.id);
        const success = await studentStore.batchDelete(ids);
        if (success) {
            ElMessage.success('批量删除成功');
        }
    } catch (error) {
        if (error !== 'cancel') {
            console.error('批量删除失败:', error);
        }
    }
};

// 打开新增抽屉
const showAddDrawer = () => {
    drawerTitle.value = '新增学生';
    newStudent.value = { ...defaultStudent };
    drawerVisible.value = true;
};

// 编辑学生
const editStudent = (student) => {
    drawerTitle.value = '编辑学生';
    newStudent.value = { ...student };
    drawerVisible.value = true;
};

// 处理排序变化
const handleSortChange = ({ prop, order }) => {
    sortConfig.value = { prop, order };
};

// 搜索学生 - 增强版
const filteredStudents = computed(() => {
    let result = [...students.value];

    // 关键字搜索（学号、姓名、班级、房间号）
    if (searchForm.value.keyword) {
        const keyword = searchForm.value.keyword.toLowerCase();
        result = result.filter(student =>
            student.studentId.toLowerCase().includes(keyword) ||
            student.name.toLowerCase().includes(keyword) ||
            student.class.toLowerCase().includes(keyword) ||
            student.dormitory.toLowerCase().includes(keyword)
        );
    }

    // 书院筛选
    if (searchForm.value.college) {
        result = result.filter(student =>
            student.college === searchForm.value.college
        );
    }

    // 专业筛选
    if (searchForm.value.major) {
        result = result.filter(student =>
            student.major === searchForm.value.major
        );
    }

    // 性别筛选
    if (searchForm.value.gender) {
        result = result.filter(student =>
            student.gender === searchForm.value.gender
        );
    }

    // 排序
    if (sortConfig.value.prop && sortConfig.value.order) {
        const { prop, order } = sortConfig.value;
        result.sort((a, b) => {
            let compareA = a[prop];
            let compareB = b[prop];

            // 数字类型的特殊处理
            if (prop === 'studentId' || prop === 'class' || prop === 'grade') {
                compareA = parseInt(compareA) || 0;
                compareB = parseInt(compareB) || 0;
            }

            if (order === 'ascending') {
                return compareA > compareB ? 1 : -1;
            } else {
                return compareA < compareB ? 1 : -1;
            }
        });
    }

    return result;
});

// 重置搜索
const resetSearch = () => {
    searchForm.value = {
        keyword: '',
        college: '',
        major: '',
        gender: ''
    };
    currentPage.value = 1;
};

// 获取所有书院列表（去重）
const collegeOptions = computed(() => {
    const colleges = new Set(students.value.map(s => s.college));
    return Array.from(colleges).filter(Boolean).sort();
});

// 获取所有专业列表（去重）
const majorOptions = computed(() => {
    const majors = new Set(students.value.map(s => s.major));
    return Array.from(majors).filter(Boolean).sort();
});

// 分页学生数据
const paginatedStudents = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return filteredStudents.value.slice(start, end);
});

// 导出数据为 CSV
const exportToCSV = async () => {
    await studentStore.exportToCSV();
};

// 导入数据
const importFromCSV = async (file) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
        const content = e.target.result;
        const rows = content.split('\n').map(row => row.split(','));
        const importedStudents = rows.slice(1).map(row => ({
            studentId: row[0],
            name: row[1],
            idCard: row[2],
            college: row[3],
            major: row[4],
            grade: row[5],
            class: row[6],
            dormitory: row[7],
            gender: row[8] === '男' ? 'male' : 'female',
            phone: row[9],
            email: row[10]
        }));

        const result = await studentStore.importStudents(importedStudents);

        if (result.errors.length > 0) {
            ElMessage.warning(`以下学号的数据因重复未导入：${result.errors.join(', ')}`);
        }
        if (result.success > 0) {
            ElMessage.success(`成功导入 ${result.success} 条数据`);
        }
    };
    reader.readAsText(file);
    return false; // 阻止自动上传
};

// 生成测试数据
const generateTestData = async () => {
    try {
        await ElMessageBox.confirm(
            '这将生成1000条测试数据，确定要继续吗？',
            '提示',
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }
        );

        await testDataService.generateTestData();
    } catch (error) {
        if (error !== 'cancel') {
            console.error('生成测试数据失败:', error);
            ElMessage.error('生成测试数据失败');
        }
    }
};

// 组件挂载时加载数据
onMounted(async () => {
    try {
        await studentStore.fetchStudents();
    } catch (error) {
        console.error('加载数据失败:', error);
        ElMessage.error('加载数据失败');
    }
});
</script>

<template>
    <div class="manager-page">
        <el-card class="manager-card">
            <!-- 工具栏 -->
            <div class="toolbar">
                <!-- 搜索区域 -->
                <div class="search-area">
                    <el-input v-model="searchForm.keyword" placeholder="搜索学号/姓名/班级/房间号" class="search-input" clearable>
                        <template #prefix>
                            <el-icon>
                                <Search />
                            </el-icon>
                        </template>
                    </el-input>

                    <el-select v-model="searchForm.college" placeholder="选择书院" clearable>
                        <el-option v-for="item in collegeOptions" :key="item" :label="item" :value="item" />
                    </el-select>

                    <el-select v-model="searchForm.major" placeholder="选择专业" clearable>
                        <el-option v-for="item in majorOptions" :key="item" :label="item" :value="item" />
                    </el-select>

                    <el-select v-model="searchForm.gender" placeholder="选择性别" clearable>
                        <el-option label="男" value="male" />
                        <el-option label="女" value="female" />
                    </el-select>

                    <el-button @click="resetSearch">重置</el-button>
                </div>
                <!-- 操作区域 -->
                <div class="operation-area">
                    <el-button type="primary" @click="showAddDrawer" :icon="Plus">
                        新增学生
                    </el-button>
                    <el-button type="danger" @click="batchDelete" :icon="Delete" :disabled="!multipleSelection.length">
                        批量删除
                    </el-button>
                    <el-button type="success" @click="exportToCSV" :icon="Download">
                        导出数据
                    </el-button>
                    <el-upload :show-file-list="false" :before-upload="importFromCSV" accept=".csv">
                        <el-button type="warning" :icon="Upload">
                            导入数据
                        </el-button>
                    </el-upload>
                    <el-button type="info" @click="generateTestData">
                        生成测试数据
                    </el-button>
                </div>
            </div>

            <!-- 表格区域 -->
            <div class="table-container">
                <el-table :data="paginatedStudents" style="width: 100%" @selection-change="handleSelectionChange"
                    @sort-change="handleSortChange" v-loading="loading" border height="100%">
                    <el-table-column type="selection" width="55" fixed="left" />
                    <el-table-column prop="studentId" label="学号" sortable="custom" min-width="120" />
                    <el-table-column prop="name" label="姓名" sortable="custom" min-width="100" />
                    <el-table-column prop="idCard" label="身份证号" min-width="180" show-overflow-tooltip />
                    <el-table-column prop="college" label="书院" min-width="120" />
                    <el-table-column prop="major" label="专业" min-width="160" show-overflow-tooltip />
                    <el-table-column prop="grade" label="年级" min-width="100">
                        <template #default="{ row }">
                            {{ row.grade ? `${row.grade}级` : '-' }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="class" label="班级" min-width="100" />
                    <el-table-column prop="dormitory" label="房间号" min-width="100" />
                    <el-table-column prop="gender" label="性别" min-width="80">
                        <template #default="{ row }">
                            <el-tag :type="row.gender === 'male' ? 'primary' : 'success'">
                                {{ row.gender === 'male' ? '男' : '女' }}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="phone" label="联系电话" min-width="140" />
                    <el-table-column prop="email" label="邮箱" min-width="200" show-overflow-tooltip />
                    <el-table-column label="操作" min-width="150" fixed="right">
                        <template #default="{ row }">

                            <el-button type="primary" link class="action-btn edit-btn" @click="editStudent(row)">
                                <el-icon>
                                    <Edit />
                                </el-icon>
                                编辑
                            </el-button>
                            <el-button type="danger" link class="action-btn delete-btn" @click="deleteStudent(row.id)">
                                <el-icon>
                                    <Delete />
                                </el-icon>
                                删除
                            </el-button>

                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <!-- 分页器 -->
            <div class="pagination-container">
                <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="pageSizes"
                    :total="filteredStudents.length" layout="total, sizes, prev, pager, next, jumper" :pager-count="7"
                    background />
            </div>
        </el-card>

        <!-- 抽屉表单 -->
        <el-drawer v-model="drawerVisible" :title="drawerTitle" size="600px" :destroy-on-close="true">
            <el-form ref="formRef" :model="newStudent" :rules="rules" label-width="100px" class="drawer-form">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="学号" prop="studentId">
                            <el-input v-model="newStudent.studentId" placeholder="请输入学号" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="姓名" prop="name">
                            <el-input v-model="newStudent.name" placeholder="请输入姓名" />
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-form-item label="身份证号" prop="idCard">
                    <el-input v-model="newStudent.idCard" placeholder="请输入身份证号" />
                </el-form-item>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="书院" prop="college">
                            <el-input v-model="newStudent.college" placeholder="请输入书院" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="专业" prop="major">
                            <el-input v-model="newStudent.major" placeholder="请输入专业" />
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="年级" prop="grade">
                            <el-input v-model="newStudent.grade" placeholder="请输入年级（如：2024）" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="班级" prop="class">
                            <el-input v-model="newStudent.class" placeholder="请输入班级" />
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="房间号" prop="dormitory">
                            <el-input v-model="newStudent.dormitory" placeholder="如：A101"
                                style="text-transform: uppercase">
                                <template #prefix>
                                    <span class="input-prefix-text">楼号：A-H</span>
                                </template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="性别" prop="gender">
                            <el-radio-group v-model="newStudent.gender">
                                <el-radio label="male">男</el-radio>
                                <el-radio label="female">女</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="联系电话" prop="phone">
                            <el-input v-model="newStudent.phone" placeholder="请输入手机号" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="newStudent.email" placeholder="请输入邮箱" />
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <template #footer>
                <div class="drawer-footer">
                    <el-button @click="drawerVisible = false">取消</el-button>
                    <el-button type="primary" @click="submitForm">确定</el-button>
                </div>
            </template>
        </el-drawer>
    </div>
</template>

<style scoped>
.manager-page {
    height: 100%;
    overflow: hidden;
}

.manager-card {
    height: 100%;
    display: flex;
    flex-direction: column;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
    border-radius: 8px;
}

:deep(.el-card__body) {
    height: 100%;
    padding: 0;
    display: flex;
    flex-direction: column;
}

.toolbar {
    padding: 20px 24px;
    border-bottom: 1px solid #eef0f5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    background-color: #fff;
    border-radius: 8px 8px 0 0;
}

.search-area {
    display: flex;
    align-items: center;
    gap: 12px;
}

.operation-area {
    display: flex;
    align-items: center;
    gap: 12px;
}

.table-container {
    flex: 1;
    padding: 24px 24px 0;
    overflow: hidden;
    background-color: #fff;
    min-height: 0;
}

/* 表格基础样式 */
:deep(.el-table) {
    height: 100% !important;
}

/* 修改表格单元格对齐方式 */
:deep(.el-table .cell) {
    display: inline-flex;
    align-items: center;
    white-space: nowrap;
}

/* 不同列的对齐方式 */
:deep(.el-table td.el-table__cell) {
    padding: 8px 0;
}

:deep(.el-table .cell.el-tooltip) {
    justify-content: flex-start;
    /* 默认左对齐 */
}

/* 某些列居中对齐 */
:deep(.el-table td.el-table__cell:nth-child(7)) .cell,
:deep(.el-table td.el-table__cell:nth-child(8)) .cell,
:deep(.el-table td.el-table__cell:nth-child(9)) .cell {
    /* 添加性别列的居中对齐 */
    justify-content: center;
}


.action-btn {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 8px;
    height: 28px;
    font-size: 13px;
    border-radius: 4px;
    transition: all 0.2s ease;
}

.action-btn:hover {
    background-color: rgba(0, 0, 0, 0.04);
}

.edit-btn {
    color: #1890ff;
}

.edit-btn:hover {
    color: #40a9ff;
    background-color: #e6f7ff;
}

.delete-btn {
    color: #ff4d4f;
}

.delete-btn:hover {
    color: #ff7875;
    background-color: #fff1f0;
}

/* 表格滚动条样式优化 */
:deep(.el-table__body-wrapper::-webkit-scrollbar) {
    width: 6px;
    height: 6px;
}

:deep(.el-table__body-wrapper::-webkit-scrollbar-thumb) {
    border-radius: 3px;
    background: #ddd;
}

:deep(.el-table__body-wrapper::-webkit-scrollbar-track) {
    border-radius: 3px;
    background: #f5f5f5;
}

/* 表格hover效果优化 */
:deep(.el-table__row) {
    transition: background-color 0.2s ease;
}

:deep(.el-table__row:hover) {
    background-color: #f5f7fa !important;
}

/* 表格固定列样式优化 */
:deep(.el-table__fixed-right-patch) {
    background-color: #f8f9fb;
}

:deep(.el-table__fixed-right) {
    height: 100% !important;
    box-shadow: -6px 0 6px -4px rgba(0, 0, 0, 0.08);
}

/* 确保抽屉内的表单不会溢出 */
:deep(.el-drawer__body) {
    overflow-y: auto;
}

.drawer-form {
    padding: 24px;
    height: calc(100% - 108px);
    /* 减去头部和底部的高度 */
    overflow-y: auto;
}

/* 优化表格内标签的样式 */
:deep(.el-tag) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 24px;
    padding: 0 8px;
}

/* 分页器样式 */
.pagination-container {
    padding: 16px 24px;
    background-color: #fff;
    border-top: 1px solid #eef0f5;
    border-radius: 0 0 8px 8px;
}

:deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {
    background-color: #1890ff;
    border-radius: 4px;
}

/* 表单元素样式 */
:deep(.el-input__inner) {
    border-radius: 4px;
}

:deep(.el-select .el-input__inner:focus) {
    border-color: #1890ff;
}

/* 搜索区域组件样式 */
.search-input {
    width: 240px;
}

:deep(.el-select) {
    width: 140px;
}

/* 抽屉表单间距 */
:deep(.el-form-item) {
    margin-bottom: 24px;
}

/* 响应式布局优化 */
@media (max-width: 1200px) {
    .search-input {
        width: 180px;
    }

    :deep(.el-select) {
        width: 120px;
    }
}

/* 添加输入框前缀文字样式 */
.input-prefix-text {
    color: #909399;
    font-size: 12px;
}

/* 确保输入框内容大写 */
:deep(.el-input__inner) {
    text-transform: uppercase;
}
</style>