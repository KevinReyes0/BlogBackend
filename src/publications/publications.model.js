import {Schema, model} from "mongoose";

const PublicationSchema = Schema({

    keeperCategory: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    namePublication: {
        type: String,
        required: [true, 'Publication name required'],
        maxLength: [40, 'Cant be overcome 35 characters']
    },
    descriptionPublication: {
        type: String,
        required: [true, 'Publication description required'],
        maxLength: [500, 'Cant be overcome 100 characters']
    },
    keeperComment: [{
        type: Schema.Types.ObjectId,
        ref: 'Comments',
        required: false
    }],
    date : {
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

export default model('Publication', PublicationSchema)