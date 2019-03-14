import http from '../../../base/api/public'
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;

//定义方法
//页面列表查询
export const page_list = (page, size, params) => {
    //请求服务端的页面查询接口
    let queryString=querystring.stringify(params);
    return http.requestQuickGet(apiUrl+'/cms/page/list/'+page+'/'+size +'?'+queryString);
}
//新增页面
export const page_add = params => {
    return http.requestPost(apiUrl+'/cms/page/add', params);
}
//根据id查询页面
export const page_get = id => {
    return http.requestQuickGet(apiUrl+"/cms/page/get/"+id);
}
//修改页面提交
export const page_edit = (id, params) => {
    return http.requestPut(apiUrl+'/cms/page/edit/'+id, params);
}
//删除页面
export const page_del = id => {
    return http.requestDelete(apiUrl+'/cms/page/del/'+id);
}