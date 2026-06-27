import mongoose, { Document, Schema } from 'mongoose';

export interface IOrgDocument extends Document {
  name: string;
  slug: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const OrgSchema: Schema = new Schema<IOrgDocument>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const OrgModel = mongoose.model<IOrgDocument>('Org', OrgSchema);
