const request = require('request-promise');
const qiniu = require('qiniu');
const apiUrl = require('../common/utils/apiUrl').options;
const fs = require('fs');

const bucket = 'createwealth';

const accessKey = 'S5BDvyqGzoe3EST99Zo5Ztl8rjcObwNX4hFNw85J';
const secretKey = 'ZXhYjuV9wq83yXrrpvnaVXvxSxPVLp_IHEIM0Mcy';
const basePath = "http://p6n65j0vx.bkt.clouddn.com/";
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

let config = new qiniu.conf.Config();
let formUploader = new qiniu.form_up.FormUploader(config);
let putExtra = new qiniu.form_up.PutExtra();

let options = {
    scope: bucket,
    expires: 7200
  };
let putPolicy = new qiniu.rs.PutPolicy(options);

function uploadByQN(key, localFile) {
    let uploadToken=putPolicy.uploadToken(mac);
    // 文件上传
    return new Promise((resolved, reject) => {
        formUploader.putFile(uploadToken, key, localFile, putExtra, function(respErr,
            respBody, respInfo) {
            if (respErr) {
                reject(respErr);
            }
            if (respInfo.statusCode == 200) {
                console.log(respBody);
                respBody.error = 0;
                respBody.basePath = basePath;
                resolved(respBody);
            } else {
            console.log(respInfo.statusCode);
            console.log(respBody);
            respBody.error = 1;
            resolved(respBody);
            }
        });
    })
}


let interpretData = function(err, response, body) {
    let json = {'status':-2,'msg':'未知错误'};
    if(err) {
        json = {'status':-1,'msg':'网络请求错误'};
        console.log('请求出错'+err);
    } 
    if ((/^2/.test('' + response.statusCode))) {
        if(null!=body) {
            body = JSON.parse(body);
            if(body.isOK==true) {
                json = {'status':0,'body':body.data};
            } else {
                json = {'status':-2,'msg':body.msg};
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

module.exports = class extends think.Service {
    async exec(fileName, file,token) {
        let fileType = file.type;
        console.log(fileType);
        var options = {
            method: 'POST',
            uri: apiUrl.uploadimg,
            headers: {
                'Authorization': 'Bearer '+token
            },
            formData: {
                name: fileName,
                file: {
                    value: fs.createReadStream(file.path),
                    options: {
                        filename: fileName,
                        contentType: fileType
                    }
                }
            }
        };
        let json = {};
        try {
            await request(options, function (err, response, body) {
                json = interpretData(err,response,body);
                console.log(json);
            });
        } catch(err) {
            json = await formatErr(err);
        }
        return json;
    }

    async uploadFile(key, localFile) {
        let result = await uploadByQN(key, localFile);
        return result;
    }
}