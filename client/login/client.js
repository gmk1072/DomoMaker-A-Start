const handleLogin = (e) => {
    e.preventDefault();
    $("#bookmarkMessage").animate({width:'hide'},350);
    if($("#user").val() == '' || $("#pass").val() == '') {
        handleError("username or password is empty");
        return false;
    }

    console.log($("input[name=_csrf]").val());

    sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);
    return false;
};

const handleSignup = (e) => {
    e.preventDefault();

    $("#bookmarkMessage").animate({width:'hide'},350);

    if($("#user").val() =='' || $("#pass").val() =='' || $("#pass2").val() == '') {
        handleError("all fields are required");
        return false
    }

    if($("#pass").val() !== $("#pass2").val()) {
        handleError("passwords do not match");
        return false;
    }

    sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);
    return false;
};

const LoginWindow = (props) => {
    return (
        <form id="loginForm" name="loginForm" onSubmit={handleLogin} action="/login" method="POST" className="mainForm" >
        <div className="input-group">
        <div className="input-group-prepend col-3">
        <span className="input-group-text bg-secondary text-light w-100" id="username-addon">Username:</span>
        </div>
        <input className="form-control" id="user" type="text" name="username" placeholder="password" aria-describedby="username-addon"/>
        </div>

        <div className="input-group">
        <div className="input-group-prepend col-3">
        <span className="input-group-text bg-secondary text-light w-100" id="password-addon">Password:</span>
        </div>
        <input className="form-control" id="pass" type="password" name="pass" placeholder="password" aria-describedby="password-addon"/>
        </div>
        <input type="hidden" name="_csrf" value={props.csrf}/>
        <br/>
        <button className="formSubmit btn btn-success offset-md-10 col-2" type="submit" value="Sign in">Enter</button>
        </form>
    );
};
const SignupWindow = (props) => {
    return (
        <form id="signupForm" name="signupForm" onSubmit={handleSignup} action="/signup" method="POST" className="mainForm">
        <div className="input-group">
        <div className="input-group-prepend col-3">
        <span className="input-group-text bg-secondary text-light w-100" id="username-addon">Username:</span>
        </div>
        <input className="form-control" id="user" type="text" name="username" placeholder="password" aria-describedby="username-addon"/>
        </div>
        <div className="input-group">
        <div className="input-group-prepend col-3">
        <span className="input-group-text bg-secondary text-light w-100" id="password-addon">Password:</span>
        </div>
        <input className="form-control" id="pass" type="password" name="pass" placeholder="password" aria-describedby="password-addon"/>
        </div>
        <div className="input-group">
        <div className="input-group-prepend col-3">
        <span className="input-group-text bg-secondary text-light w-100" id="password2-addon">Password:</span>
        </div>
        <input className="form-control" id="pass2" type="password" name="pass2" placeholder="password" aria-describedby="password-addon"/>
        </div>
        <input type="hidden" name="_csrf" value={props.csrf} />
        <br/>
        <button className="formSubmit btn btn-success offset-md-10 col-2" type="submit" value="Sign Up">Sign Up</button>
        </form>

        /*<form id="signupForm" name="signupForm" onSubmit={handleSignup} action="/signup" method="POST" className="mainForm">
        <label htmlFor="username">Username: </label>
        <input id="user" type="text" name="username" placeholder="username" />
        <label htmlFor="pass">Password: </label>
        <input id="pass" type="password" name="pass" placeholder="password" />
        <label htmlFor="pass2">Password: </label>
        <input id="pass2" type="password" name="pass2" placeholder="retype password" />
        <input type="hidden" name="_csrf" value={props.csrf} />
        <input className="formSubmit" type="submit" value="Sign Up" />
        </form>*/
    );
};

const createLoginWindow = (csrf) => {
    ReactDOM.render(
        <LoginWindow csrf={csrf} />,
        document.querySelector("#content")
    );
};

const createSignupWindow = (csrf) => {
    ReactDOM.render(
        <SignupWindow csrf={csrf} />,
        document.querySelector("#content")
    );
};

const setup = (csrf) => {
    const loginButton = document.querySelector("#loginButton");
    const signupButton = document.querySelector("#signupButton");
    signupButton.addEventListener("click", (e) => {
        e.preventDefault();
        createSignupWindow(csrf);
        return false;
    });
    console.log(csrf);
    loginButton.addEventListener("click", (e) => {
        e.preventDefault();
        createLoginWindow(csrf);
        return false;
    });
    createLoginWindow(csrf);
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});
