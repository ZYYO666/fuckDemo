import { ElMessage } from 'element-plus';
import { studentService } from './studentService';

class TestDataService {
    // 随机数据生成辅助函数
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    getRandomItem(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    // 测试数据配置
    colleges = ['致远书院', '致理书院', '致新书院', '致德书院', '致仁书院'];
    majors = ['计算机科学与技术', '软件工程', '人工智能', '数据科学', '网络工程', '信息安全'];

    // 生成随机姓名
    firstNames = '赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨朱秦尤许何吕施张孔曹严华金魏陶姜';
    lastNames = '伟芳娜秀娟英华明志建国玲芬斌军萍红娥琳静晶越洋';

    getRandomName() {
        const firstName = this.firstNames[this.getRandomInt(0, this.firstNames.length - 1)];
        const lastName = this.lastNames[this.getRandomInt(0, this.lastNames.length - 1)] +
            (Math.random() > 0.5 ? this.lastNames[this.getRandomInt(0, this.lastNames.length - 1)] : '');
        return firstName + lastName;
    }

    // 生成随机手机号
    getRandomPhone() {
        const prefixes = ['133', '138', '135', '136', '137', '139', '150', '151', '152', '157', '158', '159', '182', '183', '187', '188', '185', '186'];
        return this.getRandomItem(prefixes) + Array.from({ length: 8 }, () => this.getRandomInt(0, 9)).join('');
    }

    // 生成随机身份证号
    getRandomIdCard() {
        const areaCode = this.getRandomInt(110000, 659000).toString();
        const birthYear = this.getRandomInt(1990, 2005).toString();
        const birthMonth = this.getRandomInt(1, 12).toString().padStart(2, '0');
        const birthDay = this.getRandomInt(1, 28).toString().padStart(2, '0');
        const sequence = this.getRandomInt(100, 999).toString();
        const checkCode = '0123456789X'[this.getRandomInt(0, 10)];
        return areaCode + birthYear + birthMonth + birthDay + sequence + checkCode;
    }

    // 生成随机学号（基于年级）
    getRandomStudentId(grade) {
        const yearPrefix = grade.slice(2); // 取年份后两位
        const sequence = this.getRandomInt(1000, 9999).toString();
        return yearPrefix + sequence;
    }

    // 生成随机邮箱
    getRandomEmail(name, studentId) {
        const domains = ['gmail.com', 'outlook.com', 'qq.com', '163.com'];
        return `${name}_${studentId}@${this.getRandomItem(domains)}`;
    }

    // 生成测试数据
    async generateTestData(count = 1000) {
        try {
            const currentYear = new Date().getFullYear();
            const grades = [
                currentYear.toString(),
                (currentYear - 1).toString(),
                (currentYear - 2).toString(),
                (currentYear - 3).toString()
            ];

            const testData = [];
            const usedStudentIds = new Set();
            const usedPhones = new Set();
            const usedIdCards = new Set();
            const usedEmails = new Set();

            for (let i = 0; i < count; i++) {
                const grade = this.getRandomItem(grades);
                let studentId, phone, idCard, email, name;

                // 确保学号唯一
                do {
                    studentId = this.getRandomStudentId(grade);
                } while (usedStudentIds.has(studentId));
                usedStudentIds.add(studentId);

                // 确保手机号唯一
                do {
                    phone = this.getRandomPhone();
                } while (usedPhones.has(phone));
                usedPhones.add(phone);

                // 确保身份证号唯一
                do {
                    idCard = this.getRandomIdCard();
                } while (usedIdCards.has(idCard));
                usedIdCards.add(idCard);

                name = this.getRandomName();

                // 确保邮箱唯一
                do {
                    email = this.getRandomEmail(name, studentId);
                } while (usedEmails.has(email));
                usedEmails.add(email);

                testData.push({
                    studentId,
                    name,
                    idCard,
                    college: this.getRandomItem(this.colleges),
                    major: this.getRandomItem(this.majors),
                    grade,
                    class: this.getRandomInt(1, 6).toString(),
                    dormitory: `${String.fromCharCode(65 + this.getRandomInt(0, 7))}${this.getRandomInt(1, 6)}${this.getRandomInt(0, 9)}${this.getRandomInt(0, 9)}`,
                    gender: Math.random() > 0.5 ? 'male' : 'female',
                    phone,
                    email
                });
            }

            // 使用 studentService 保存数据
            const result = await studentService.importStudents(testData);
            
            if (result.success > 0) {
                ElMessage.success(`成功生成 ${result.success} 条测试数据`);
                return true;
            }
            return false;
        } catch (error) {
            console.error('生成测试数据失败:', error);
            ElMessage.error('生成测试数据失败');
            return false;
        }
    }
}

export const testDataService = new TestDataService(); 