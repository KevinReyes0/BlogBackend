import {Schema, model} from "mongoose";

const CategorySchema = Schema({
    nameCategory: {
        type: String,
        required: [true, 'Category name required'],
        maxLength: [35, 'Cant be overcome 35 characters']
    },
    descriptionCategory: {
        type: String,
        required: [true, 'Category description required'],
        maxLength: [100, 'Cant be overcome 100 characters']
    },
    keeperPublication: [{
        type: Schema.Types.ObjectId,
        ref: 'Publication',
        required: false
    }],
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


export default model('Category', CategorySchema)