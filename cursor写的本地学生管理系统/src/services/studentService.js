import { ElMessage } from 'element-plus';
import { uniqueFields, exportHeaders } from '../models/student';

// 模拟后端数据存储
class StudentService {
    constructor() {
        this.storageKey = 'students';
        this.lastUpdateKey = 'lastUpdate';
    }

    // 获取所有学生
    async getStudents() {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('获取学生数据失败:', error);
            ElMessage.error('获取学生数据失败');
            return [];
        }
    }

    // 添加学生
    async addStudent(student) {
        try {
            const students = await this.getStudents();
            const newStudent = {
                ...student,
                id: Date.now().toString()
            };

            // 检查唯一性
            if (!await this.checkUniqueFields(newStudent)) {
                return false;
            }

            students.push(newStudent);
            this.saveData(students);
            return newStudent;
        } catch (error) {
            console.error('添加学生失败:', error);
            ElMessage.error('添加学生失败');
            return false;
        }
    }

    // 更新学生
    async updateStudent(student) {
        try {
            const students = await this.getStudents();
            // 检查唯一性（排除当前学生）
            if (!await this.checkUniqueFields(student, student.id)) {
                return false;
            }

            const index = students.findIndex(s => s.id === student.id);
            if (index !== -1) {
                students[index] = student;
                this.saveData(students);
                return true;
            }
            return false;
        } catch (error) {
            console.error('更新学生失败:', error);
            ElMessage.error('更新学生失败');
            return false;
        }
    }

    // 删除学生
    async deleteStudent(id) {
        try {
            const students = await this.getStudents();
            const newStudents = students.filter(student => student.id !== id);
            this.saveData(newStudents);
            return true;
        } catch (error) {
            console.error('删除学生失败:', error);
            ElMessage.error('删除学生失败');
            return false;
        }
    }

    // 批量删除学生
    async batchDeleteStudents(ids) {
        try {
            const students = await this.getStudents();
            const newStudents = students.filter(student => !ids.includes(student.id));
            this.saveData(newStudents);
            return true;
        } catch (error) {
            console.error('批量删除失败:', error);
            ElMessage.error('批量删除失败');
            return false;
        }
    }

    // 导入学生数据
    async importStudents(newStudents) {
        try {
            const students = await this.getStudents();
            const validStudents = [];
            const errors = [];

            for (const student of newStudents) {
                if (await this.checkUniqueFields(student)) {
                    validStudents.push({
                        ...student,
                        id: Date.now().toString() + Math.random()
                    });
                } else {
                    errors.push(student.studentId);
                }
            }

            if (validStudents.length > 0) {
                this.saveData([...students, ...validStudents]);
            }

            return {
                success: validStudents.length,
                errors
            };
        } catch (error) {
            console.error('导入数据失败:', error);
            ElMessage.error('导入数据失败');
            return { success: 0, errors: [] };
        }
    }

    // 导出数据为CSV
    async exportToCSV() {
        try {
            const students = await this.getStudents();
            const headers = exportHeaders.map(h => h.label);
            const data = students.map(student =>
                exportHeaders.map(header => {
                    const value = student[header.field];
                    return header.transform ? header.transform(value) : value;
                })
            );

            const csvContent = [headers, ...data].map(row => row.join(',')).join('\n');
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `students_${new Date().toISOString().split('T')[0]}.csv`;
            link.click();
            return true;
        } catch (error) {
            console.error('导出数据失败:', error);
            ElMessage.error('导出数据失败');
            return false;
        }
    }

    // 检查字段唯一性
    async checkUniqueFields(student, excludeId = '') {
        const students = await this.getStudents();

        for (const { field, label } of uniqueFields) {
            if (student[field] && this.isFieldDuplicate(students, field, student[field], excludeId)) {
                ElMessage.error(`${label}已存在，请重新输入`);
                return false;
            }
        }
        return true;
    }

    // 检查单个字段是否重复
    isFieldDuplicate(students, field, value, excludeId = '') {
        return students.some(s =>
            s[field] &&
            s[field].toString().toLowerCase() === value.toString().toLowerCase() &&
            s.id !== excludeId
        );
    }

    // 保存数据到localStorage
    saveData(students) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(students));
            localStorage.setItem(this.lastUpdateKey, new Date().toLocaleString());
        } catch (error) {
            console.error('保存数据失败:', error);
            ElMessage.error('保存数据失败');
        }
    }
}

export const studentService = new StudentService(); 