import mongoose from 'mongoose';

export interface IUserProfile extends Document {
  _id:string,
  fullName: string;
  email: string;
  businessName: string;
  descriptionOfBusiness: string;
  phoneNumber: string;
  address: string;
  password: string;
  image: string
  createdAt: Date;
  updatedAt: Date;
}


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
    required: false
  },
  descriptionOfBusiness: {
    type: String,
    required: false
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: false
  },
   password: {
    type: String,
    required: true
  },
   image: {
    type: String,
    required: false
  }
},
{timestamps: true});

const UserProfileModel = mongoose.model<IUserProfile>('UserProfile', userSchema);
export default UserProfileModel;
