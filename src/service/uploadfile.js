
const request = require('request-promise');
const apiUrl = require('../common/utils/apiUrl').options;
const fs = require('fs');

let formatErr = function(err) {
    let json = {};
    let code = err.statusCode;
    let error = err.error;
    console.log('请求出错：'+code+' 数据: '+error);
    json = {'status':code,'error':error};
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

export default class extends think.Service{

    async uploadImg(fileName, file,token) {
        let fileType = file.type;
        console.log(apiUrl.imgUpload);
        var options = {
            method: 'POST',
            uri: apiUrl.imgUpload,
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
                console.log('request---------------',body);
                json = interpretData(err,response,body);
                console.log(json);
            });
        } catch(err) {
            console.log('catch---------------',err);
            json = await formatErr(err);
        }
        return json;
    }

    

    
}
