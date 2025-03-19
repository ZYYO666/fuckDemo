import { defineStore } from 'pinia';
import { ref } from 'vue';
import { studentService } from '../services/studentService';

export const useStudentStore = defineStore('student', () => {
    const students = ref([]);
    const loading = ref(false);

    // 获取学生列表
    const fetchStudents = async () => {
        loading.value = true;
        try {
            students.value = await studentService.getStudents();
        } finally {
            loading.value = false;
        }
    };

    // 添加学生
    const addStudent = async (student) => {
        const result = await studentService.addStudent(student);
        if (result) {
            await fetchStudents();
            return true;
        }
        return false;
    };

    // 更新学生
    const updateStudent = async (student) => {
        const result = await studentService.updateStudent(student);
        if (result) {
            await fetchStudents();
            return true;
        }
        return false;
    };

    // 删除学生
    const deleteStudent = async (id) => {
        const result = await studentService.deleteStudent(id);
        if (result) {
            await fetchStudents();
            return true;
        }
        return false;
    };

    // 批量删除
    const batchDelete = async (ids) => {
        const result = await studentService.batchDeleteStudents(ids);
        if (result) {
            await fetchStudents();
            return true;
        }
        return false;
    };

    // 导入学生数据
    const importStudents = async (newStudents) => {
        const result = await studentService.importStudents(newStudents);
        if (result.success > 0) {
            await fetchStudents();
        }
        return result;
    };

    // 导出数据
    const exportToCSV = async () => {
        return await studentService.exportToCSV();
    };

    return {
        students,
        loading,
        fetchStudents,
        addStudent,
        updateStudent,
        deleteStudent,
        batchDelete,
        importStudents,
        exportToCSV
    };
}); 