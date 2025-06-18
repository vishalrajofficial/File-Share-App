//Creating token & saving in cookie

const sendToken = (user, statusCode, res)=>{
    const Token = user.getJWT();
    //options for cookie
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRY*24*60*60*1000
        ),
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: 'none'
    };

    res.status(statusCode).cookie("token", Token, options).json({
        success: true,
        user
    });
};

export default sendToken