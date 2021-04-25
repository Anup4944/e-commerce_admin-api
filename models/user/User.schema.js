
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
    role:{
        type: String,
        required: true,
        default: "guest"
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
    },
    refreshJWT:{
        token :{
        type: String,
        required: true,
        default: ""

        },
        addedAt:{
        type: Date,
        required: true,
        default: Date.now()
        
        }
    }

},
{
    timestamp: true, 
});

 const UsersSchema = mongoose.model("User", UserSchema);
 export default UsersSchema;