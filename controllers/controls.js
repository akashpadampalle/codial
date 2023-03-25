
// testing welcome page
// module.exports.welcome = function(req, res){
//     res.send('<h1>welcome... </h1>');
// }

// login form controller
module.exports.loginForm = function(req, res){
    res.render('login', {
        title: "Codial | login"
    });
}

// signup form controller
module.exports.signupForm = function(req, res){
    res.render('signup', {
        title: "Codial | signup"
    });
}