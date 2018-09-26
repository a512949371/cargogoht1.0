const request = require('request-promise');
const apiUrl = require('../common/utils/apiUrl').options;

let execGet = async function(url,params) {
    removeProperty(params);
    let options = {
        method: 'GET',
        uri: apiUrl[url],
        qs: params,
        json: true
    }
    let json = {};
    try {
        await request(options, function (err, response, body) {
            json = interpretData(err,response,body);
        });
    } catch(err) {
        json = formatErr(err);
    }
    return json;
}

let execPost = async function(url,params) {
    removeProperty(params);
    let options = {
        method: 'POST',
        uri: apiUrl[url],
        body: params,
        json: true
    };
    let json = {};
    try {
        await request(options, function (err, response, body) {
            json = interpretData(err,response,body);
        });
    } catch(err) {
        json = formatErr(err);
    }

    return json;
}

let execGetWithAuth = async function(url,params,token) {
    removeProperty(params);
    let options = {
        method: 'GET',
        uri: apiUrl[url],
        qs: params,
        headers: {
            'Authorization': 'Bearer '+token
        },
        json: true
    }
    let json = {};
    try {
        await request(options, function (err, response, body) {
            json = interpretData(err,response,body);
        });
    } catch(err) {
        json = formatErr(err);
    }
    
    return json;
}

let execPostWithAuth = async function(url,params,token) {
    removeProperty(params);
    let options = {
        method: 'POST',
        uri: apiUrl[url],
        body: params,
        headers: {
            'Authorization': 'Bearer '+token
        },
        json: true
    };
    let json = {};
    try {
        await request(options, function (err, response, body) {
            json = interpretData(err,response,body);
        });
    } catch(err) {
        json = formatErr(err);
    }
    return json;
}

let execCusReq = async function(options) {
    let json = {};
    try {
        await request(options, function (err, response, body) {
            json = interpretData(err,response,body);
        });
    } catch(err) {
        json = formatErr(err);
    }
    return json;
}

let interpretData = function(err, response, body) {
    let json = {'status':-2,'msg':'未知错误'};
    if(err) {
        json = {'status':-1,'msg':'网络请求错误'};
        console.log('请求出错'+err);
    } 
    if ((/^2/.test('' + response.statusCode))) {
        if(null!=body) {
            if(body.isOk) {
                json = {'status':0,'body':body};
            } else {
            	if(body.code=='10000098') {
            		json = {'status':-100,'msg':body.msg};
            	}else if(body.code=='00100001'){
            		json = {'status':500,'msg':body.msg};
            	} else {
            		json = {'status':-2,'msg':body.msg};
            	}
            }
        }
    }
    return json;
}

let formatErr = function(err) {
    let json = {};
    let code = err.statusCode;
    let error = err.error;
    console.log('请求出错：'+code+' 数据: '+error);
    json = {'status':code,'error':error};
    return json;
}


let removeProperty = function(object){
    for(prop in object){
        if (object[prop]==='') {
            delete object[prop]
        }
    }
}

module.exports = {
    execGet: execGet,
    execGetWithAuth: execGetWithAuth,
    execPost: execPost,
    execPostWithAuth: execPostWithAuth,
    execCusReq: execCusReq
}