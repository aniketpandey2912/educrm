import mongoose, { Document, Schema, Types } from 'mongoose';

export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  COUNSELOR = 'counselor',
  SUPPORT_STAFF = 'support_staff',
  STUDENT = 'student',
}

export interface IUserDocument extends Document {
  firstName: string;
  lastName: string;
  email: string; // login identifier
  passwordHash: string;
  role: UserRole; // drives RBAC + discriminator
  org_id: Types.ObjectId | null; // null for super_admin only
  isActive: boolean; // account suspension flag
  isEmailVerified: boolean; // gated login
  lastLoginAt: Date | null; // activity tracking
  deletedAt: Date | null; // soft delete
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema<IUserDocument>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: Object.values(UserRole), required: true },
    org_id: { type: Schema.Types.ObjectId, ref: 'Org', default: null },
    isActive: { type: Boolean, default: true },
    isEmailVerified: { type: Boolean, default: false },
    lastLoginAt: { type: Date, default: null },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true, discriminatorKey: '__t' },
);

export const UserModel = mongoose.model<IUserDocument>('User', UserSchema);
