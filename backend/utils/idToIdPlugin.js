/**
 * @name idToIdPlugin
 * @description remove '_id' and replace it with 'id' attribute
 * @param {Object} schema mongoose schema
 */
const idToIdPlugin = (schema) => {
    // Modify the toJSON and toObject transformation options
    schema.set('toJSON', {
        virtuals: true,
        versionKey: false,
        transform: (doc, ret) => {
            ret.id = ret._id; // Assign _id to id
            delete ret._id;   // Delete _id
            delete ret?.deletedAt;   // Delete deletedAt
        }
    });

    schema.set('toObject', {
        virtuals: true,
        versionKey: false,
        transform: (doc, ret) => {
            ret.id = ret._id; // Assign _id to id
            delete ret._id;   // Delete _id
            delete ret?.deletedAt;   // Delete deletedAt
        }
    });
}

export default idToIdPlugin;