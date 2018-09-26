let getToken = async function () {
    let token = await this.session('token');
    // return user.token;
    return token;
}

let chectStatus = async function (data) {
    if (data.status == 401) {
        await this.session(null);
        return this.redirect("/auth/login");
    } else if (data.status == 404) {
        return this.redirect('/cargogo/404');
    } else if (data.status == 500) {
        return this.redirect('/cargogo/500');
    } else if(data.status==0){
        return true;
    }else {
        return false;
    }

}

module.exports = {
    getToken: getToken,
    chectStatus:chectStatus
}