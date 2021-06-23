/**
 * students.js
 * 数据操作文件模块
 * 职责：只操作数据，不关心业务
 */
var fs = require('fs')

const jsdom = require('jsdom')
const { JSDOM } = jsdom
const { document } = (new JSDOM('<!doctype html><html><body></body></html>')).window;
global.document = document
const window = document.defaultView
const $ = require('jquery')(window)

var dbPath = './db.json'
/**
 * 获取所有学生列表
 * return []
 */
exports.find = function (callback) {
    fs.readFile(dbPath, function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students
        $.each(students, function (i) {
            if (students[i].gender == 0) {
                return students[i].gender = '男'
            }
            students[i].gender = '女'
        })
        callback(null, students)
    })

}

/**
 * 根据 id 查询单个学生
 */
exports.findById = function (id, callback) {
    fs.readFile(dbPath, function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students
        // console.log(students)
        var stu = students.find(function (items) {
            return items.id === id
        })
        // console.log(id, stu)
        callback(null, stu)
    })
}

/**
 * 添加保存学生
 */
exports.save = function (student, callback) {
    fs.readFile(dbPath, function (err, data) {
        if (err) {
            return callback(err)
        }
        students = JSON.parse(data).students
        student.id = students.length == 0 ? 1 : students[students.length - 1].id + 1
        student.gender = parseInt(student.gender)
        student.age = parseInt(student.age)
        students.push(student)
        var ret = JSON.stringify({
            students: students
        })
        fs.writeFile(dbPath, ret, function (err) {
            if (err) {
                return callback(err)
            }
            callback(null)
        })
    })
}

/**
 * 更新学生
 */
exports.updateById = function (student, callback) {
    fs.readFile(dbPath, function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students
        // $.each(studetns, function (i) {
        //     if (students[i].id === student.id) {
        //         students[i] = student
        //     }
        // })
        student.id = parseInt(student.id)
        student.age = parseInt(student.age)
        student.gender = parseInt(student.gender)
        var stu = students.find(function (item) {
            console.log(item.id, student.id)
            return item.id === student.id
        })
        console.log('stu:', stu)

        for (var key in student) {
            // console.log('key, stu[key], student[key]', key, stu[key], student[key])
            stu[key] = student[key]
        }

        var ret = JSON.stringify({
            students: students
        })

        fs.writeFile(dbPath, ret, function (err) {
            if (err) {
                return callback(err)
            }
            callback(null)
        })
    })

}

/**
 * 删除学生
 */
exports.delete = function (id, callback) {
    fs.readFile(dbPath, function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students

        // console.log(students)

        // 数据处理： 删除学生
        // var index = -1
        // $.each(students, function (i) {
        //     // console.log('i', i)
        //     console.log('student[i]', students[i])
        //     if (students[i].id === id) {
        //         index = i
        //     }
        // })
        // if (index >= 0) {
        //     students.splice(index, 1)

        // }
        //
        // ES6 
        var deleteId = students.find(function (student) {
            return student.id === id
        })

        students.splice(deleteId, 1)

        // console.log(students)


        var ret = JSON.stringify({
            students: students
        })

        fs.writeFile(dbPath, ret, function (err) {
            if (err) {
                return callback(err)
            }

        })


        return callback(null)
    })

}