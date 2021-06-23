var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/itcast', { useNewUrlParser: true, useUnifiedTopology: true })

var Schema = mongoose.Schema

var Comment = mongoose.model('Comment', new Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: Number,
        enum: [0, 1], // 枚举 0 or 1
        default: 0, // init. 0
        required: true
    },
    age: {
        type: Number,
        // required:
    },
    hobbies: {
        type: String
    }
}))

/**
 * 获取所有学生列表
 * return []
 */
exports.find = function (callback) {
    Comment.find(function (err, studs) {
        if (err) {
            return callback(err)
        }
        callback(null, studs)
    })
}

/**
 * 根据 id 查询单个学生
 */
exports.findById = function (id, callback) {
    Comment.findById(id, function (err, stud) {
        if (err) {
            return callback(err)
        }
        // var stud = JSON.parse(data).students
        callback(null, stud)
    })
}

/**
 * 添加保存学生
 */
exports.save = function (student, callback) {
    new Comment(student).save(function (err, ret) {
        if (err) {
            return callback(err)
        }
        console.log(ret)
        return callback(null)
    })
}

/**
 * 更新学生
 */
exports.updateById = function (student, callback) {
    student.age = parseInt(student.age)
    student.gender = parseInt(student.gender)
    // console.log(student)
    Comment.findByIdAndUpdate(student.id, student, function (err, ret) {
        if (err) {
            return callback(err)
        }
        callback(null)
    })
}

/**
 * 删除学生
 */
exports.delete = function (id, callback) {
    console.log(id)
    Comment.findByIdAndRemove(id, function (err, ret) {
        if (err) {
            return callback(err)
        }
        return callback(null)
    })
}