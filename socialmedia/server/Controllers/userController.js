import userModel from "../Models/userModel.js";
import bcrypt from 'bcrypt';

const getUser = async(req, res) => {
    const id = req.params.id;
    try {
        const user = await userModel.findById(id);
        if(user){
            const {password, ...otherDetails} = user._doc
            res.status(200).json(otherDetails);
        } else {
            res.status(404).json("user does not exist")
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

const updateUser = async (req,res) => {
    const id = req.params.id;
    const { currentUserId, currenUserAdminStatus, password } = req.body;
    if(id === currentUserId || currenUserAdminStatus){
        try {
            if(password){
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(password, salt)
            }
            const user = await userModel.findByIdAndUpdate(id, req.body, {new: true})
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);  
        }
        
    } else {
        res.status(403).json("Access Denied! you can only update your own profile");
    }
}

const deleteUser = async (req, res) => {
    const id = req.params.id;

    const { currentUserId, currenUserAdminStatus } = req.body;
    if(currentUserId === id || currenUserAdminStatus){
        try {
            await userModel.findByIdAndDelete(id);
            res.status(200).json("User Deleted ")
        } catch (error) {
            res.status(500).json(error);  
        }
    }
}

export { getUser, updateUser, deleteUser };
