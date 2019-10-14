const {
    Rule,
    LinValidator
} = require('../../core/lin-validator-v2')

const {Admin} = require('../models/admin')
const {LoginType} = require('../lib/enum')

class RegisterValidator extends LinValidator {
    constructor() {
        super();
        this.username = [new Rule("isLength", "用户名不能为空", {min: 1})];
        this.password1 = [
            // 用户密码指定范围
            new Rule('isLength', '密码至少6个字符，最多22个字符', {
                min: 6,
                max: 22
            }),
            new Rule(
                'matches',
                '密码长度必须在6~22位之间，包含字符、数字和 _ ',
                '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]'
            )
        ]
        this.password2 = this.password1
        this.nickname = [
            new Rule('isLength', '昵称长度必须在2~16之间', {
                min: 2,
                max: 16
            }),
        ]
    }

    validatePassword(vals) {
        const psw1 = vals.body.password1
        const psw2 = vals.body.password2
        if (psw1 !== psw2) {
            throw new Error('两次输入的密码不一致，请重新输入')
        }
    }

    async validateusername(vals) {
        const username = vals.body.username
        const admin = await Admin.findOne({
            where: {
                username: username
            }
        })
        if (admin) {
            throw new Error('用户名已被注册，请重新输入')
        }
    }
}


class AdminLoginValidator extends LinValidator {
    constructor() {
        super();
        this.username = [new Rule("isLength", "用户名不能为空", {min: 1})];
        this.password = [
            // 用户密码指定范围
            new Rule('isLength', '密码至少6个字符，最多22个字符', {
                min: 6,
                max: 22
            }),
            new Rule(
                'matches',
                '密码长度必须在6~22位之间，包含字符、数字和 _ ',
                '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]'
            )
        ]
    }
}

class AdminWxLoginValidator extends LinValidator {
    constructor() {
        super();
        this.code = [
            new Rule('isLength', '微信验证码不能为空', {min: 1})
        ]
    }
}

class TokenNotEmptyValidator extends LinValidator {
    constructor() {
        super()
        this.token = [
            new Rule('isLength', '不允许为空', {min: 1})
        ]
    }
}


module.exports = {
    RegisterValidator,
    AdminLoginValidator,
    TokenNotEmptyValidator,
    AdminWxLoginValidator
}
