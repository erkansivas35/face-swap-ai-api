module.exports = function mongooseTransformPlugin(schema) {
  schema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
      // Move `id` to the top
      ret = { id: ret._id, ...ret }; // Add `id` at the top
      delete ret._id; // Remove `_id`
      return ret;
    },
  });

  schema.set("toObject", {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
      // Move `id` to the top
      ret = { id: ret._id, ...ret }; // Add `id` at the top
      delete ret._id; // Remove `_id`
      return ret;
    },
  });
};