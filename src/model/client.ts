import mongoose, { Schema, Document } from 'mongoose';

interface ClientProfile extends Document {
    _id: string,
  fullName: string;
  email: string;
  businessName: string;
  businessNumber: string;
  address: string;
  phoneNumber: number;
  uniqueId: string;
  amount: number;
  date: Date;
  status: boolean;
  invoiceName: string;
  invoiceDate: Date;
  invoiceNumber: string;
  paymentConfirmation: boolean;
  totalOverduePayment: number;
  profile: string;
  createdAt: Date;
  updatedAt: Date;
}

const ClientProfileSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true},
  businessName: { type: String, required: true },
  businessNumber: { type: String, required: true},
  address: { type: String, required: true },
  phoneNumber: {type: Number, required: true},
  uniqueId: { type: String, required: true},
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  status: { type: Boolean, required: false },
  invoiceName: { type: String, required: false },
  invoiceDate: { type: Date, required: false  },
  invoiceNumber: { type: String, required: false },
  paymentConfirmation: { type: Boolean, required: false  },
  totalOverduePayment: { type: Number, required: false  },
  profile: { type: String, required: false },
  
},
{timestamps: true}
);

const ClientProfileModel = mongoose.model<ClientProfile>('ClientProfile', ClientProfileSchema);

export default ClientProfileModel;
