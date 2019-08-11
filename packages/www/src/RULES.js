module.exports = [

    {
        title: '迅雷链接',
        rule: /^thunder:\/\/[a-zA-Z0-9]+=$/,
        examples: ['thunder://QUEsICdtYWduZXQ6P3h0PXVybjpidGloOjBCQTE0RTUxRkUwNjU1RjE0Qzc4NjE4RjY4NDY0QjZFNTEyNjcyOUMnWlo='],
    },

    {
        title: 'ed2k链接(宽松匹配)',
        rule: /^ed2k:\/\/|file|.+|\/$/,
        examples: ['ed2k://|file|%E5%AF%84%E7%94%9F%E8%99%AB.PARASITE.2019.HD-1080p.X264.AAC-UUMp4(ED2000.COM).mp4|2501554832|C0B93E0879C6071CBED732C20CE577A3|h=5HTKZPQFYRKORN52I3M7GQ4QQCIHFIBV|/'],
    },

    {
        title: '磁力链接(宽松匹配)',
        rule: /^magnet:\?xt=urn:btih:[0-9a-fA-F]{40,}.*$/,
        examples: ['magnet:?xt=urn:btih:40A89A6F4FB1498A98087109D012A9A851FBE0FC'],
    },
    {
        title: '子网掩码',
        rule: /^(?:\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(?:\.(?:\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/,
        examples: ['255.255.255.0', '255.224.0.0']
    },
    {
        title: 'linux"文件夹"路径',
        rule: /^\/(\w+\/?)+$/,
        examples: ['/usr/ad/dd', '/root/']
    },
    {
        title: 'linux"文件"路径',
        rule: /^\/(\w+\/)+\w+\.\w+$/,
        examples: ['/usr/ad/dd/a.js', '/root/b.ts']
    },
    {
        title: 'window下"文件夹"路径',
        rule: /^[a-zA-Z]:\\(?:\w+\\?)*$/,
        examples: ['C:\\Users\\Administrator\\Desktop', 'e:\\m\\']
    },
    {
        title: 'window下"文件"路径',
        rule: /^[a-zA-Z]:\\(?:\w+\\)*\w+\.\w+$/,
        examples: ['C:\\Users\\Administrator\\Desktop\\qq.link', 'e:\\m\\vscode.exe']
    },
    {
        title: 'A股代码',
        rule: /^(s[hz]|S[HZ])(000[\d]{3}|002[\d]{3}|300[\d]{3}|600[\d]{3}|60[\d]{4})$/,
        examples: ['sz000858', 'SZ002136', 'sz300675', 'SH600600', 'sh601155']
    },
    {
        title: '大于等于0, 小于等于150, 支持小数位出现5, 如145.5, 用于判断考卷分数',
        rule: /^150$|^(?:\d|[1-9]\d|1[0-4]\d)(?:.5)?$/,
        examples: [150, 100.5]
    },
    {
        title: 'html注释',
        rule: /^<!--[\s\S]*?-->$/,
        examples: ['<!--<div class="_bubble"></div>-->']
    },
    {
        title: 'md5格式(32位)',
        rule: /^[a-f0-9]{32}$/,
        examples: ['21fe181c5bfc16306a6828c1f7b762e8'],
    },
    {
        title: '版本号格式必须为X.Y.Z',
        rule: /^\d+(\.\d+){2}$/,
        examples: ['16.3.10']
    },
    {
        title: '视频链接地址（视频格式可按需增删）',
        rule: /^https?:\/\/.*?(swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb|mp4)$/i,
        examples: ['http://www.abc.com/video/wc.avi']
    },
    {
        title: '图片链接地址（图片格式可按需增删）',
        rule: /^https?:\/\/.*?(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif)$/i,
        examples: ['https://www.abc.com/logo.png']
    },
    {
        title: '24小时制时间（HH:mm:ss）',
        rule: /^((?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$)/,
        examples: ['23:34:55']
    },
    {
        title: '12小时制时间（hh:mm:ss）',
        rule: /^(1[0-2]|0?[1-9]):[0-5]\d:[0-5]\d$/,
        examples: ['11:34:55'],
        counterExamples: ['23:34:55']
    },
    {
        title: 'base64格式',
        rule: /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@/?%\s]*?)\s*$/i,
        examples: ['data:image/gif;base64,xxxx==']
    },
    {
        title: '数字/货币金额（支持负数、千分位分隔符）',
        rule: /(^[-]?[1-9]\d{0,2}($|(,\d{3})*($|(\.\d{1,2}$))))|((^[0](\.\d{1,2})?)|(^[-][0]\.\d{1,2}))$/,
        examples: [100, -0.99, 3, 234.32, -1, 900, 235.09]
    },
    {
        title: '数字/货币金额 (只支持正数、不支持校验千分位分隔符)',
        rule: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
        examples: [0.99, 8.99, 666]
    },
    {
        title: '银行卡号（16或19位）',
        rule: /^([1-9]{1})(\d{15}|\d{18})$/,
        examples: [6222026006705354217]
    },
    {
        title: '中文姓名',
        rule: /^([\u4e00-\u9fa5·]{2,16})$/,
        examples: ['葛二蛋', '凯文·杜兰特', '德克·维尔纳·诺维茨基']
    },
    {
        title: '英文姓名',
        rule: /(^[a-zA-Z]{1}[a-zA-Z\s]{0,20}[a-zA-Z]{1}$)/,
        examples: ['James', 'Kevin Wayne Durant', 'Dirk Nowitzki']
    },
    {
        title: '新能源车牌号',
        rule: /[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}(([0-9]{5}[DF])|([DF][A-HJ-NP-Z0-9][0-9]{4}))$/,
        examples: ['京AD92035', '甘G23459F'],
    },
    {
        title: '非新能源车牌号',
        rule: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/,
        examples: ['京A00599', '黑D23908']
    },
    {
        title: '车牌号(新能源+非新能源)',
        rule: /^([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}(([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9 挂学警港澳]{1})$/,
        examples: ['京A12345D', '京A00599']
    },
    {
        title: '网址',
        rule: /^((https?|ftp):\/\/)?([\da-z.-]+)\.([a-z.]{2,6})(\/\w\.-]*)*\/?/,
        examples: ['www.qq.com']
    },
    {
        title: '中国手机号(严谨), 根据工信部2019年最新公布的手机号段',
        rule: /^((\+|00)86)?1((3[\d])|(4[5,6,7,9])|(5[0-3,5-9])|(6[5-7])|(7[0-8])|(8[\d])|(9[1,8,9]))\d{8}$/,
        examples: ['18311006933', '17888829981']
    },
    {
        title: '中国手机号(宽松), 只要是13,14,15,16,17,18,19开头即可',
        rule: /^((\+|00)86)?1[3-9]\d{9}$/,
        examples: ['18311006933', '17888829981']
    },
    {
        title: '中国手机号(最宽松), 只要是1开头即可, 如果你的手机号是用来接收短信, 优先建议选择这一条',
        rule: /^((\+|00)86)?1\d{10}$/,
        examples: ['18311006933', '17888829981']
    },
    {
        title: '日期',
        rule: /^\d{4}(-)(1[0-2]|0?\d)\1([0-2]\d|\d|30|31)$/,
        examples: ['1990-12-12', '2020-1-1']
    },
    {
        title: 'email地址',
        rule: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        examples: ['90203918@qq.com', 'nbilly@126.com']
    },
    {
        title: '国内座机电话,如: 0341-86091234',
        rule: /\d{3}-\d{8}|\d{4}-\d{7}/,
        examples: ['0936-4211235']
    },
    {
        title: '一代身份证号(15位数字)',
        rule: /^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$/,
        examples: ['622001790131123']
    },
    {
        title: '二代身份证号(18位数字),最后一位是校验位,可能为数字或字符X',
        rule: /^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$/,
        examples: ['62222319991205131x']
    },
    {
        title: '身份证号, 支持1/2代(15位/18位数字)',
        rule: /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/,
        examples: ['622223199912051311']
    },
    {
        title: '护照（包含香港、澳门）',
        rule: /(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/,
        examples: ['s28233515', '141234567', '159203084', 'MA1234567', 'K25345719']
    },
    {
        title: '帐号是否合法(字母开头，允许5-16字节，允许字母数字下划线组合',
        rule: /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/,
        examples: ['justin', 'justin1989', 'justin_666']
    },
    {
        title: '纯中文/汉字',
        // rule: /^[\u4E00-\u9FA5]+$/,
        rule: /^(?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])+$/,
        examples: ['正则', '前端']
    },
    {
        title: '是否小数',
        rule: /^\d+\.\d+$/,
        examples: ['0.0', '0.09']
    },
    {
        title: '电话(座机)',
        rule: /^0\d{2,3}-\d{7,8}$/,
        examples: ['0936-4211236']
    },
    {
        title: '纯数字',
        rule: /^\d{1,}$/,
        examples: [12345678]
    },
    {
        title: '是否html标签(宽松匹配)',
        rule: /<(.*)>.*<\/\1>|<(.*) \/>/,
        examples: ['<div> </div>']
    },
    {
        title: '是否qq号格式正确',
        rule: /^[1-9][0-9]{4,10}$/,
        examples: [903013545, 9020304]
    },
    {
        title: '是否由数字和字母组成',
        rule: /^[A-Za-z0-9]+$/,
        examples: ['james666', 'haha233hi']
    },
    {
        title: '纯英文字母',
        rule: /^[a-zA-Z]+$/,
        examples: ['Russel']
    },
    {
        title: '纯小写英文字母组成',
        rule: /^[a-z]+$/,
        examples: ['russel']
    },
    {
        title: '纯大写英文字母',
        rule: /^[A-Z]+$/,
        examples: ['ABC', 'KD']
    },
    {
        title: '密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符',
        rule: /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/,
        examples: ['Kd@curry666']
    },
    {
        title: '用户名正则，4到16位（字母，数字，下划线，减号）',
        rule: /^[a-zA-Z0-9_-]{4,16}$/,
        examples: ['xiaohua_qq']
    },
    {
        title: 'ip-v4',
        rule: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
        examples: ['172.16.0.0', '127.0.0.0']
    },
    {
        title: 'ip-v6',
        rule: /^((([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))$/i,
        examples: ['2031:0000:130f:0000:0000:09c0:876a:130b']
    },
    {
        title: '16进制颜色',
        rule: /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/,
        examples: ['#f00', '#F90', '#000', '#fe9de8']
    },
    {
        title: '微信号，6至20位，以字母开头，字母，数字，减号，下划线',
        rule: /^[a-zA-Z][-_a-zA-Z0-9]{5,19}$/,
        examples: ['github666', 'kd_-666']
    },
    {
        title: '中国邮政编码',
        rule: /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/,
        examples: ['734500', '100101']
    },
    {
        title: '只包含中文和数字',
        rule: /^((?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])|(\d))+$/,
        examples: ['哈哈哈', '你好6啊']
    },
    {
        title: '不能包含字母',
        rule: /^[^A-Za-z]*$/,
        examples: ['你好6啊', '@¥()！']
    }
];