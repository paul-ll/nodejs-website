const {
    Rule,
    LinValidator
} = require('../../core/lin-validator-v2')

class websiteHeader extends LinValidator {
    constructor() {
        super();
        this.name = [new Rule("isLength", "网站名称不能为空", {min: 1})];
        this.logo1 = [new Rule("isLength", "必须上传默认Logo", {min: 1})];
        this.logo2 = [new Rule("isLength", "必须上传浮动Logo", {min: 1})];
    }
}

class advantageHeader extends LinValidator {
    constructor() {
        super();
        this.type = [new Rule("isLength", "板块ID不能为空", {min: 1})];
        this.title = [new Rule("isLength", "板块标题不能为空", {min: 1})];
        //this.intro = [new Rule("isLength", "板块简介不能为空", {min: 1})];
    }
}

class PositiveIdParamsValidator extends LinValidator {
    constructor() {
        super();
        this.type = [new Rule("isLength", "板块ID不能为空", {min: 1})];
    }
}

class PositiveIdParamsValidatorNumber extends LinValidator {
    constructor() {
        super();
        this.id = [
            new Rule('isInt', '分类ID需要正整数', {min: 1})
        ]
    }
}

class websiteFooter extends LinValidator {
    constructor() {
        super();
        this.jiajie = [new Rule("isLength", "网站简介不能为空", {min: 1})];
        this.copys = [new Rule("isLength", "版权说明不能为空", {min: 1})];
        this.icps = [new Rule("isLength", "备案信息不能为空", {min: 1})];
        this.foo_logo = [new Rule("isLength", "必须上传底部Logo", {min: 1})];
    }
}

class advantageList extends LinValidator {
    constructor() {
        super();
        this.title = [new Rule("isLength", "特点标题不能为空", {min: 1})];
        this.intro = [new Rule("isLength", "特点说明不能为空", {min: 1})];
        this.icon = [new Rule("isLength", "必须上传Icon图标", {min: 1})];
        //this.image = [new Rule("isLength", "必须上传特点图片", {min: 1})];
    }
}

module.exports = {
    websiteHeader,
    websiteFooter,
    advantageHeader,
    PositiveIdParamsValidator,
    PositiveIdParamsValidatorNumber,
    advantageList
}
