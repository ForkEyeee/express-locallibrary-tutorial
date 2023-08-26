const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GenreSchema = new Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 100 },
});

// Virtual for author's full name
GenreSchema.virtual("genrename").get(function () {
  // To avoid errors in cases where an genre does not have either a name
  // We want to make sure we handle the exception by returning an empty string for that case
  let name = "";
  if (this.name) {
    name = `${this.name}`;
  }

  return name;
});

// Virtual for genre's URL
GenreSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/genre/${this._id}`;
});

// Export model
module.exports = mongoose.model("Genre", GenreSchema);
