import User from "../models/user.Model.js";
import generateToken from "../utils/generateToken.js";

const register = async (req, res) => {
    try {
        console.log('Register request received:', req.body);
        const { firstName, lastName, userName, email, password } = req.body

        if(!firstName || !lastName || !userName || !email || !password) {
            console.log('Validation failed: missing fields');
            return res
            .status(400)
            .json({ success:false, message: "Please provide all required fields."})
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(email)){
            return res 
            .status(400)
            .json({ success: false, message: "Invalid email format." })
        }

        const userExists = await User.findOne({
            $or: [{ email }, { userName }],
        });
        if (userExists) {
            const existsBy = userExists.email === email ? "email" : "userName";
            console.log(`User already exists by ${existsBy}:`, email, userName);
            return res
                .status(400)
                .json({ message: `User already exists with this ${existsBy}.` });
        }

        const user = await User.create({
            firstName,
            lastName,
            userName,
            email,
            password,
        })
        console.log('User created successfully:', user._id);
        return res
        .status(201)
        .json({ message: "User registered successfully.", userId: user._id })
    } catch (error) {
        console.error('Register error:', error);
        if (error?.code === 11000) {
            const field = Object.keys(error.keyValue || {})[0] || "field";
            return res
                .status(400)
                .json({ message: `Duplicate ${field}. Please use another.` });
        }
        return res.status(500).json({ message: "Server Error", error: error.message }) 
    }
}

const login = async (req,res ) => {
    try {
        console.log('Login request received:', req.body);
        const { email, password } = req.body;

        if(!email || !password) {
            console.log('Login validation failed: missing fields');
            return res
            .status(400)
            .json({ message: "please provide all required fields"})
        }

        const user = await User.findOne({ email }).select("+password")
        console.log('User found:', !!user);

        if (!user) {
            console.log('User not found');
            return res
            .status(400)
            .json({ message: "Invalid credentials"})
        }

        const isPasswordValid = await user.comparePassword(password)
        console.log('Password valid:', isPasswordValid);

        if(!isPasswordValid) {
            console.log('Invalid password');
            return res
            .status(400)
            .json({ message: "invalid credentials" })
        }

        const token = generateToken(user)
        console.log('Token generated');
        return res
        .status(200)
        .json({ message: "Login successful", token })
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: "Server Error" })
    }
}


export { register,
            login

 };
