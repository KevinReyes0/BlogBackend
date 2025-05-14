import {Schema, model} from "mongoose";

const CommentsSchema = Schema({

    keeperPublication: {
        type: Schema.Types.ObjectId,
        ref: 'Publication',
        required: true
    },
    nameUser: {
        type: String,
        required: [true, 'User name required'],
        maxLength: [35, 'Cant be overcome 35 characters']
    },
    comment: {
        type: String,
        required: true,
        maxLength: [200, 'Cant be overcome 100 characters']
    },
    date: {
        type: Date,
        default: Date.now
    },
    state: {
        type: Boolean,
        default: true,
    }
},
    {
        timestamps: true,
        versionKey: false
    }
);

export default model('Comments', CommentsSchema)