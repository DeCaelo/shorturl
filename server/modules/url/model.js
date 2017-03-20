import mongoose, { Schema } from 'mongoose';
import crypto from 'crypto';

const UrlSchema = new Schema({
  longUrl: { type: String, unique: true, required: true },
  shortUrl: {
    type: String,
    unique: true,
    maxLength: [6, 'Error with the minimum length of 6']
  }
});

/**
 * Function for make short url
 */

const UniqueUrl = len =>
  crypto
    .randomBytes(Math.ceil(len * (3/4)))
    .toString('base64')
    .slice(0, len)
    .replace(/\+/g, '0')
    .replace(/\//g, '0');

UrlSchema.pre('save', function (next, done) {
  this.shortUrl = UniqueUrl(6);

  mongoose.models.Url.findOne({ shortUrl: this.shortUrl })
    .then(
      url => {
        if (url) {
          this.shortUrl = UniqueUrl(6);
        }
      },
      error => done(error)
    );
  next();
});

export default mongoose.model('Url', UrlSchema);
