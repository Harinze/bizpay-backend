import mongoose from 'mongoose';

const industryTypes = ['Food and Beverages', 'Technology', 'Agriculture', 'Education'];

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  businessName: {
    type: String,
    required: true
  },
  businessNumber: {
    type: String,
    required: true
  },
  industryType: {
    type: String,
    enum: industryTypes,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  uniqueId: {
    type: String,
    unique: true
  }
});

const UserProfileModel = mongoose.model('UserProfileModel', userSchema);

export default UserProfileModel;
