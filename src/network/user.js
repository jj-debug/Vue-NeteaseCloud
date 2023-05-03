import {request} from 'network/request'

// 验证手机号码是否存在
export function _phoneVerify(phone){
    return request({
        url:'/cellphone/existence/check',
        params:{
            phone:phone
        }
    })
}

export function _login(phone,password){
    return request({
        url:'/login/cellphone',
        params:{
            phone:phone,
            password:password
        }
    })
}

// 发送验证码
export function _sentCode(phone){
    return request({
        url: '/captcha/sent',
        params: {
            phone
        }
    })
}

// 验证验证码
export function _codeVerify(phone, captcha){
    return request({
        url: '/captcha/verify',
        params: {
            phone,
            captcha
        }
    })
}


export function _getKey(timestamp){
    return request({
        url: '/login/qr/key',
        params: {
            timestamp
        }
    })
}

// 生成二维码
export function _getTCode(key){
    let pic = request({
        url: '/login/qr/create',
        params:{
            key,
            qrimg: true
        }
    })
    return pic
}

// 监视二维码状态
export function _checkTCode(key,timestamp){
    return request({
        url: '/login/qr/check',
        params: {
            key,
            timestamp
        }
    })
}

// 获取登录状态
export function _getLoginStatus(cookie, timestamp){
    return request({
        url: '/login/status',
        params: {
            cookie, 
            timestamp
        }
    })
}

// 获取用户详细信息
export function _getUserDetail(uid) {
    return request({
        url: '/user/detail',
        params: {
            uid
        }
    })
}

/**获取用户歌单 */
export function _getSongList(id){
    return request({
        url:'/user/playlist',
        params:{
            uid:id
        }
    })
}

// 退出登录
export function _logout(){
    return request({
        url: '/logout'
    })
}

export class PlayList{
    constructor(playlist){
        this.name=playlist.name;//为了方便menu使用
        this.id=playlist.id;
        this.cover=playlist.coverImgUrl;
    }
}