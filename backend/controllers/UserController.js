const User = require('../models/User');
const bcrypt = require('bcrypt');
const createToken = require('../helpers/token');

module.exports = class UserController {
    static async register(req, res) {
        const  {name, email, phone, password, confirmPassword} = req.body;

        if(!name) {
            return res.status(422).json({message: "Name is required"});
        }

        if(!email) {
            return res.status(422).json({message: "Email is required"});
        }

        if(!phone) {
            return res.status(422).json({message: "Phone is required"});
        }

        if(!password) {
            return res.status(422).json({message: "Password is required"});
        }

        if(!confirmPassword) {
            return res.status(422).json({message: "Confirm password is required"});
        }

        if(password !== confirmPassword) {
            return res.status(422).json({message: "Passwords do not match"});
        }

        const userExists = await User.findOne({email: email});

        if(userExists) {
            return res.status(422).json({message: "User already exists"});
        }

        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        const user = new User({
            name: name,
            email: email,
            phone: phone,
            password: passwordHash,
        });

        try {
            const newUser = await user.save();
            await createToken(newUser, req, res);

        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    }

    static async login(req, res) {
        const{email, password} = req.body;

        if(!email) {
            return res.status(422).json({message: "Email is required"});
        }

        if(!password) {
            return res.status(422).json({message: "Password is required"});
        }

        const user = await User.findOne({email: email});

        if(!user) {
            return res.status(422).json({message: "There is no user with this email"});
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!passwordMatch) {
            return res.status(422).json({message: "Invalid password"});
        }

        await createToken(user, req, res);
    }
}