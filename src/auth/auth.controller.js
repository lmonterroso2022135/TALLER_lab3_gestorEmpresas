import bcryptjs from 'bcryptjs';
import User from '../users/user.model.js';
import { generateJWT } from '../helpers/generate-jwt.js';

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user){
            return res.status(400).json({
                msg: "incorrect credentials or email doesnt exist in the database"
            })
        }

        if (!user.state){
            return res.status(400).json({
                msg: "User doesnt exists in the database"
            });
        }

        const validatePassword = bcryptjs.compareSync(password, user.password);
        if (!validatePassword) {
            return res.status(400).json({
                msg: "Incorrect password"
            });
        }

        const token = await generateJWT (user.id);

        res.status(200).json({
            msg: 'Welcome!!',
            user,
            token
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
        msg: "Contact the administrator",
    });
    }
}