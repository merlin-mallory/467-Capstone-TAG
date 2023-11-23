import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const sitewideVarsSchema = new Schema({
    currentMaxGameId: {
        type: Number
    }
}, {
    collection: 'sitewidevars' // Explicitly specifying the collection name
});

const sitewidevars = model('sitewidevars', sitewideVarsSchema);

export default sitewidevars;
