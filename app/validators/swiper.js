const {
    Rule,
    LinValidator
} = require('../../core/lin-validator-v2')

class addSwiperBanner extends LinValidator {
    constructor() {
        super();
        this.title = [new Rule("isLength", "广告标题不能为空", {min: 1})];
        this.intro = [new Rule("isLength", "简介文字不能为空", {min: 1})];
        this.bgimg = [new Rule("isLength", "必须上传背景图片", {min: 1})];
    }
}

class addSwiperMenu extends LinValidator {
    constructor() {
        super();
        this.title = [new Rule("isLength", "菜单标题不能为空", {min: 1})];
        this.intro = [new Rule("isLength", "菜单介绍不能为空", {min: 1})];
        this.links = [new Rule("isLength", "跳转链接不能为空", {min: 1})];
    }
}

class PositiveIdParamsValidator extends LinValidator {
    constructor() {
        super();
        this.id = [
            new Rule('isInt', '分类ID需要正整数', {min: 1})
        ]
    }
}

module.exports = {
    addSwiperBanner,
    addSwiperMenu,
    PositiveIdParamsValidator
}
