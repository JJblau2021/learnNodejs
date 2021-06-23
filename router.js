// 路由模块
var fs = require('fs')

var express = require('express')
var router = express.Router()

// 从文件中读取数据
// var students = require('./students')

//  从 MongoDB 中读取
var students = require('./stud')





router
    .get('/', function (req, res) {
        res.redirect('/student')
    })
    .get('/student', function (req, res) {

        students.find(function (err, data) {
            if (err) {
                return res.status(500).send('Server Error!')
            }
            res.render('index.html', {
                students: data
            })
        })
    })
    .get('/student/new', function (req, res) {
        res.render('new.html')
    })
    .post('/student/new', function (req, res) {
        // console.log('new student:', req.body)
        students.save(req.body, function (err) {
            if (err) {
                return res.status(500).send('Server Error!')
            }
            console.log('redirect。。。')
            res.redirect('/student')
        })
    })
    .get('/student/edit', function (req, res) {
        // 1. 在客户端列表页处理链接问题需要有 id参数
        // 获取 学生 id 
        // 获取学生数据
        // console.log(req.query)
        students.findById(req.query.id, function (err, student) {
            if (err) {
                return res.status(500).send('Server Error!')
            }
            // console.log(student)
            res.render('edit.html', {
                student: student
            })

        })
    })
    .post('/student/edit', function (req, res) {
        // 1. 获取表单数据 req.body
        // 2. 更新数据
        // 3. 重定向至首页 req.redirect
        // console.log('get stu:', req.body)
        var student = req.body
        students.updateById(student, function (err) {
            if (err) {
                return res.status(500).send('Server Error!')
            }
            res.redirect('/student')
        })

    })

    .get('/student/delete', function (req, res) {
        // 1. 获取删除对象的 id
        // 2. 删除数据
        // 3. 重定向 

        // console.log(req.query.id)
        students.delete(req.query.id, function (err) {
            if (err) {
                return res.status(500).send('Server Error!')
            }
            res.redirect('/student')
        })

    })


module.exports = router
// 方案1
// module.exports = function (app) {
//     app
//         .get('/', function (req, res) {
//             fs.readFile('./db.json', function (err, data) {
//                 // 第二个参数可添加 'utf8'
//                 if (err) {
//                     return res.status(500).send('Server Error')
//                 }
//                 var students = JSON.parse(data).students
//                 // console.log(students)

//                 $.each(students, function (i) {
//                     if (students[i].gender == 0) {
//                         return students[i].gender = '男'
//                     }
//                     students[i].gender = '女'
//                 })
//                 // console.log(students)
//                 res.render('index.html', {
//                     students: students
//                 })
//             })

//         })
// }



