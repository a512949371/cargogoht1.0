//const API_HOST = 'https://api.cargogoclub.com/admin';
const API_HOST = 'http://192.168.54.40:10009/admin';
const API_10007 = API_HOST + ':10007';
 //const API_HOST = 'http://192.168.54.35:8088/backstage';

let options = {
    "login": API_HOST + "/admin/login", //登录
    "getMenusByPid": API_HOST + "/api/menu/getMenusByMid",//根据父id查询菜单
    "addOrUpdateMenu": API_HOST + "/api/menu/addOrUpdate",//新增菜单
    "getMenuById": API_HOST + "/api/menu/selectOne",//根据父id查询菜单
    "deletessMenus": API_HOST + "/api/menu/deletess",//删除菜单
    "roleSelectList": API_HOST + "/api/role/all",//角色列表
    'roleSave': API_HOST+'/api/role/save',  //新增或更新角色
    'roleDelete':API_HOST+'/api/role/delete',     //删除角色
    'roleSelectOne':API_HOST+'/api/role/selectOne',  //更新角色信息
    "staffSelectList": API_HOST + "/carEmployee/selectList",//员工列表
    "staffSelectOne": API_HOST + "/carEmployee/selectOne",//员工列表单条查询
    "staffInsert": API_HOST + "/carEmployee/insert",//员工新增
    "staffUpdate": API_HOST + "/carEmployee/update",//员工编辑
    "designatedList":API_HOST+"/carOrderAssign/select",//待办事项列表
    
    "staffUserList":API_HOST+"/carOrderAssign/selectEmpList",//待办事项员工列表
    "designatedUser":API_HOST+"/carOrderAssign/update",// 指定承办人确认
    "todolistfinish":API_HOST+"/carOrderAssign/finish",// 事项完成


    "caristrationlist":API_HOST+"/carBrand/select",
    "carbrandlist":API_HOST+"/carBrand/page",//车辆品牌列表
    "editcarbrand":API_HOST+"/carBrand/edit",//车辆品牌编辑
    "deletecarbrand":API_HOST+"/carBrand/delete",//删除车辆品牌
    "cardictionlist":API_HOST+"/carVehicleModel/page",//车辆字典列表
    "carinfolist":API_HOST+"/carVehicle/selectList",//车辆信息列表
    "buycarfrequency":API_HOST+"/carBuyConfig/selectList",//车辆信息期数列表
    "insertbuycarfrequency":API_HOST+"/carBuyConfig/insert",//新增车辆信息期数
    "deletebuycarfrequency":API_HOST+"/carBuyConfig/delete",//删除车辆信息期数
    "isbuycarfrequency":API_HOST+"/carBuyConfig/update",//是否显示车辆信息期数
    "carinfodata":API_HOST+"/carVehicle/select",//车辆明细列表
    "updatacarinfo":API_HOST+"/admin/carVehicleInfo/update",//修改车辆明细单条数据
    "lookcarinfo":API_HOST+"/carVehicle/selectOne",//查看车辆信息
    "editcarinfo":API_HOST+"/carVehicle/update",//修改车辆信息
    "deletecarinfo":API_HOST+"/carVehicle/delete",//删除车辆信息
    "carranklist":API_HOST+"/carVehicleRank/selectList",//车辆栏目列表
    "iscarinfoindex":API_HOST+"/carVehicle/view",//车辆是否首页展示
    "brandlist":API_HOST+"/carBrand/getBrandList",//获取车辆品牌列表
    "newcardiclist":API_HOST+"/carVehicleModel/queryModelList",//新增车辆列表
    "addcardiclist":API_HOST+"/carVehicleModel/addVehicleByModel",//添加车辆
    "deletediccar":API_HOST+"/carVehicleModel/delete",//删除字典车辆
    "uploadimg": API_HOST + "/api/imgUpload/upload",//图片上传接口
    "adddiccar": API_HOST + "/carVehicleModel/save",//车辆字典新增
    "getdiccar": API_HOST + "/carVehicleModel/get",//车辆字典详情
    "editdiccar": API_HOST + "/carVehicleModel/edit",//车辆字典编辑
    
    "userSelectList": API_HOST + "/carUserAdmin/selectList",//用户列表
    "userCallList":API_HOST + "/carUserCall/page",//用户呼叫列表
    "userSelectOne": API_HOST + "/carUserAdmin/selectOne",//用户列表单条查询
    "userselectOrder": API_HOST + "/carUserAdmin/selectOrder",//用户订单
    "userUpdate": API_HOST + "/carUserAdmin/update",//冻结/解冻用户接口
    "callFinish":API_HOST+"/carUserCall/edit",//回访完成

    "orderSelectList":API_HOST+"/carOrderAssign/orderList",//订单列表
    "buycarorderList":API_HOST+"/admin/carBuyOrder/orderList",//购车订单列表
    "orderSelectOne":API_HOST+"/admin/carBuyOrder/orderInfo",//订单详情
    "orderAudit":API_HOST+"/admin/carBuyOrder/orderAudit",//修改审核状态
    "vehicleInfo":API_HOST+"/admin/carVehicleInfo/vehicleInfo",//车辆识别码搜索
    "addCarCode":API_HOST+"/admin/carBuyOrder/addCarCode",//订单添加车辆识别号接口
    "cancelOrder":API_HOST+"/admin/carBuyOrder/orderCancel",//取消订单
    "getTrueFaith":API_HOST+"/admin/carBuyOrder/getTrueFaith",//获取征信流水
    "imgUpload":API_HOST+"/api/imgUpload/upload",//图片上传
    "addTrueFaith":API_HOST+"/admin/carBuyOrder/addTrueFaith",//添加订单真信图片

    "escortList":API_HOST+"/carMortgageOrder/selectList",//押车列表
    "escortAdd":API_HOST+"/carMortgageOrder/insert",//新增押车记录
    "escortSelectOne":API_HOST+"/carMortgageOrder/selectOne",//单条押车记录
    "escortUpdate":API_HOST+"/carMortgageOrder/update",//编辑押车记录

    "systemuserlist":API_HOST+"/api/user/selectList",//后台用户管理列表
    "addsystemuserone":API_HOST+"/api/user/addUser",//后台用户添加新用户
    "systemuserone":API_HOST+"/api/user/selectOne",//后台用户信息
    "updatesystemuserone":API_HOST+"/api/user/updateUser",//后台用户信息修改
    "removesystemuserone":API_HOST+"/api/user/remove",//后台用户删除
    "systemrolelist":API_HOST+"/api/role/all",//后台角色列表
    "changeuserone":API_HOST+"/api/user/disableUser",//后台用户状态改变

    "advertisementSelectList":API_HOST+"/carAdvert/selectList",//广告列表
    "advertisementSelectOne": API_HOST + "/carAdvert/selectOne",//广告列表单条查询
    "advertisementInsert": API_HOST + "/carAdvert/insert",//广告新增
    "advertisementUpdate": API_HOST + "/carAdvert/update",//广告编辑
    "advertisementDelete": API_HOST + "/carAdvert/delete",//广告删除

}

module.exports = {
    options: options
}
