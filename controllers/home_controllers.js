
module.exports.homepage = function(req, res){
    res.render('home');
}

module.exports.login = function(req, res){
    res.render('login_form');
}


module.exports.signup = function(req, res){
    res.render('signup_form');
}