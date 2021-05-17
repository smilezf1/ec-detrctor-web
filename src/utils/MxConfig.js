
let config = window.config || {}
//删除之前缓存的配置文件
localStorage.removeItem("_CONFIG");
if (config && Object.keys(config).length > 0) {
    localStorage.setItem("_CONFIG", JSON.stringify(config))
}
//全局配置对象
const MxConfig = {
    set: function (key, vlaue) {
        localStorage.setItem(key, vlaue)
    },
    get: function (key) {
        let value = localStorage.getItem(key) || config[key];
        if (value == '' || value == undefined) {
            value = process.env[key] || ''
        }
        return value
    },
    //获取BASE_URL
    getBaseUrl: function () {
        if (config['BASE_URL'] && config['BASE_URL'] != '') {
            return config['BASE_URL']
        } else {
            return this.get('BASE_URL')
        }
    },
    //获取WXURL
    getWsUrl: function () {
        if (config["WS_URL"]) {
            return config['WS_URL']
        } else {
            return this.get("WS_URL")
        }
    }
}
export default MxConfig