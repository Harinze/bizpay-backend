import mongoose from 'mongoose';

export interface IUserProfile extends Document {
  id:string,
  fullName: string;
  email: string;
  businessName: string;
  businessNumber: string;
  industryType: string;
  phoneNumber: string;
  address: string;
  uniqueId: string;
}

const industryTypes = ['Food and Beverages', 'Technology', 'Agriculture', 'Education'];

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: false
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
    type: Number,
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

const UserProfileModel = mongoose.model<IUserProfile>('UserProfile', userSchema);
export default UserProfileModel;
