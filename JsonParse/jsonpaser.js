const js = require("@eslint/js")

function Json(string, _index = 0) {
    let index = _index
    let json = string.trim()
    let jsonparse = json.split('')
    let prevAttr = ''
    let isArray = false
    let isFirst = true
    const result = {}



    //通用的处理，调用其他处理器
    function parse() {
        skip()
        if (jsonparse[index] == '{') {
            return parseDakuohao1()
        } else if (jsonparse[index] == ':') {
            return parseMaohao()
        } else if (jsonparse[index] == '"') {
            return parseString()
        } else if (jsonparse[index] == ',') {
            return parseDouhao()
        } else if (/\d/.test(jsonparse[index]) || jsonparse[index] == '-') {
            return parseNum()
        } else if (json.slice(index, index + 4) === 'true') {
            return parseTrue()
        } else if (json.slice(index, index + 5) === 'false') {
            return parseFalse()
        } else if (json.slice(index, index + 4) === 'null') {
            return parseNull()
        } else if (jsonparse[index] == '}') {
            return parseDakuohao2()
        } else if (jsonparse[index] == '[') {
            return parseArray1()
        } else if (jsonparse[index] == ']') {
            return parseArray2()
        } else if (index == jsonparse.length) {
            throw new Error('标签未闭合')
        } else {
            console.log(result);
            throw new Error('未知字符' + jsonparse[index])
        }
    }
    function skip() {
        while (jsonparse[index] == ' ' || jsonparse[index] == '\n') {
            index++
        }
    }
    function parseMaohao() {
        index++
        return parse()
    }
    function parseArray1() {
        index++
        if (prevAttr == '') {
            throw new Error('[]不能用作属性')
        }
        result[prevAttr] = []
        isArray = true
        return parse()
    }
    function parseArray2() {
        index++
        prevAttr = ''
        isArray = false
        return parse()
    }
    function parseTrue() {
        index += 4
        if (prevAttr == '') {
            throw new Error('True不能用作属性')
        }
        if (isArray) {
            result[prevAttr].push(true)
        } else {
            result[prevAttr] = true
            prevAttr = ''
        }
        return parse()
    }
    function parseFalse() {
        index += 5
        if (prevAttr == '') {
            throw new Error('False不能用作属性')
        }
        if (isArray) {
            result[prevAttr].push(false)
        } else {
            result[prevAttr] = false
            prevAttr = ''
        }
        return parse()
    }
    function parseNull() {
        index += 4
        if (prevAttr == '') {
            throw new Error('null不能用作属性')
        }
        if (isArray) {
            result[prevAttr].push(null)
        } else {
            result[prevAttr] = null
            prevAttr = ''
        }
        return parse()
    }
    function parseNum() {

        let num = ''
        while (jsonparse[index] !== '}' && jsonparse[index] !== ',' && jsonparse[index] !== ']') {
            num += jsonparse[index]
            index++
        }
        if (typeof num !== 'number' && isNaN(num)) {
            throw new Error('数字格式错误')
        }
        if (prevAttr == '') {
            throw new Error('json格式错误')
        }
        num = Number(num)
        if (isArray) {
            result[prevAttr].push(num)
        } else {
            result[prevAttr] = num
            prevAttr = ''
        }
        return parse()

    }

    function parseDakuohao1() {
        if (isFirst == true) {
            index++
            isFirst = false

        } else {
            const res = Json(json, index)
            index = res.index

            if (prevAttr == '') {
                throw new Error('错误')
            }
            if (isArray) {
                result[prevAttr].push(res.object)
            } else {
                result[prevAttr] = res.object
                prevAttr = ''
            }
        }
        return parse()
    }
    function parseDakuohao2() {
        return {
            object: result,
            index: ++index
        }
    }
    function parseDouhao() {
        index++
        return parse()
    }
    function parseString() {
        let str = ''
        index++ //第一个双引号
        while (jsonparse[index] !== '"') {
            str += jsonparse[index]
            index++
        }
        index++ //第二个双引号

        if (prevAttr == '') {
            prevAttr = str
            result[str] = undefined;
            return parse()
        }

        if (isArray) {
            result[prevAttr].push(str)
        } else {
            result[prevAttr] = str

            prevAttr = ''
        }
        return parse()
    }
    return parse()


}

const json1 = {
    id: [1, {
        a: 1,
        b: {
            a: 1,
            b: 2
        }

    }, "zyyo", 3, 4, 5],
    name: "Example Object",
    isActive: true,
    details: {
        description: "This is a complex object for testing purposes.",
        metadata: {
            version: -2.5,
            createdBy: "admin",
            isVerified: false,
            history: {
                firstCreated: "2023-01-01",
                lastUpdated: "2023-10-01",
                updates: {
                    total: 5,
                    recent: {
                        date: "2023-09-15",
                        changes: {
                            added: 3,
                            removed: 1,
                            modified: 2
                        }
                    }
                }
            }
        }
    },
    settings: {
        preferences: {
            theme: "dark",
            notifications: {
                email: true,
                sms: false,
                push: true
            }
        },
        limits: {
            maxConnections: 10,
            timeout: 30000
        }
    },
    tags: {
        category: "test",
        priority: "high",
        attributes: {
            security: "confidential",
            scope: "internal"
        }
    }
};

const testjson = JSON.stringify(json1);



try {
    console.time("json")
    for (let i = 0; i < 10000; i++) {
       Json(testjson).object;
    }
    console.timeEnd("json")
    console.time("jsonpaser")
    for (let i = 0; i < 10000; i++) {
         JSON.parse(testjson)
    }
    console.timeEnd("jsonpaser")
} catch (error) {
    console.log(error.message)
}


