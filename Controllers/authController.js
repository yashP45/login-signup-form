const User = require('./../Models/userModel')
const catchAsync = require('./../catchAsync')
const jwt = require('jsonwebtoken')
const AppError = require('./../appError')

exports.signUp = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    })

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES
    })

    res.status(200).redirect('login')
    // res.status(200).json({
    //     status: 'success',
    //     token,
    //     data: {
    //         user: newUser
    //     }
    // })
})
// Logging user in 
exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body
    // 1) Check if email and password exist
    if (!email || !password) {
        return next(new AppError('Please provide email and password!', 400));
    }
    // 2) Check if user exists && password is correct
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email or password', 401));
    }
    // 3) Send JWT token to client (means they are logged in now)

    const token = '';
    res.status(200).redirect('home')
    res.status(200).json({
        status: 'success',
        token,
    })
})

