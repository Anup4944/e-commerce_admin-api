
import mongoose  from "mongoose";

export const UserSchema = mongoose.Schema({
    fname:{
        type: String,
        required: true,
        default: ""
    },
    lname:{
        type: String,
        required: true,
        default: ""
    },
    email:{
        type: String,
        required: true,
        default: ""
    },
    password:{
        type: String,
        required: true,
        default: ""
    }

},
{
    timestamp: true, 
});

 const AdminUsersSchema = mongoose.model("Admin_user", UserSchema);
 export default AdminUsersSchema;