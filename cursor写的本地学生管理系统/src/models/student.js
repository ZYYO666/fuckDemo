// 学生数据结构默认值
export const defaultStudent = {
    id: '',
    studentId: '',     // 学号
    name: '',          // 姓名
    idCard: '',        // 身份证号
    college: '',       // 书院
    major: '',         // 专业
    grade: '',         // 年级
    class: '',         // 班级
    dormitory: '',     // 房间号
    gender: 'male',    // 性别
    phone: '',         // 联系电话
    email: ''          // 邮箱
};

// 表单验证规则
export const studentRules = {
    studentId: [
        { required: true, message: '请输入学号', trigger: 'blur' },
        { pattern: /^\d+$/, message: '学号必须为数字', trigger: 'blur' }
    ],
    name: [
        { required: true, message: '请输入姓名', trigger: 'blur' }
    ],
    idCard: [
        { required: true, message: '请输入身份证号', trigger: 'blur' },
        { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请输入正确的身份证号', trigger: 'blur' }
    ],
    college: [
        { required: true, message: '请输入书院', trigger: 'blur' }
    ],
    major: [
        { required: true, message: '请输入专业', trigger: 'blur' }
    ],
    grade: [
        { required: true, message: '请输入年级', trigger: 'blur' },
        { pattern: /^20\d{2}$/, message: '请输入正确的年级（如：2024）', trigger: 'blur' },
        {
            validator: (rule, value, callback) => {
                if (!value) {
                    return callback();
                }
                const year = parseInt(value);
                const currentYear = new Date().getFullYear();
                if (year > currentYear || year < currentYear - 4) {
                    return callback(new Error(`年级应在 ${currentYear - 4} - ${currentYear} 之间`));
                }
                return callback();
            },
            trigger: 'blur'
        }
    ],
    class: [
        { required: true, message: '请输入班级', trigger: 'blur' }
    ],
    dormitory: [
        { required: true, message: '请输入房间号', trigger: 'blur' },
        {
            pattern: /^[A-H][1-6][0-9]{2}$/,
            message: '房间号格式：楼号(A-H)+楼层(1-6)+房间号(01-99)',
            trigger: 'blur'
        }
    ],
    phone: [
        { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
    ],
    email: [
        { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
    ]
};

// 唯一字段配置
export const uniqueFields = [
    { field: 'studentId', label: '学号' },
    { field: 'idCard', label: '身份证号' },
    { field: 'email', label: '邮箱' },
    { field: 'phone', label: '手机号' }
];

// 导出数据时的表头配置
export const exportHeaders = [
    { field: 'studentId', label: '学号' },
    { field: 'name', label: '姓名' },
    { field: 'idCard', label: '身份证号' },
    { field: 'college', label: '书院' },
    { field: 'major', label: '专业' },
    { field: 'grade', label: '年级' },
    { field: 'class', label: '班级' },
    { field: 'dormitory', label: '房间号' },
    { field: 'gender', label: '性别', transform: value => value === 'male' ? '男' : '女' },
    { field: 'phone', label: '联系电话' },
    { field: 'email', label: '邮箱' }
]; 