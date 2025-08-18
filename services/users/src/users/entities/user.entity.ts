import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  createdAt: Date;
  updatedAt: Date;

  @Prop({ required: true })
  role: string;

  @Prop({ required: true, unique: true })
  matricule: string;

  @Prop({ required: true })
  isVerified: boolean;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: false })
  dateOfBirth: Date;

  @Prop({ required: false })
  sex: string;

  @Prop({ required: false })
  telephone: string;

  @Prop({ required: false })
  emergencyContact: string;

  @Prop({ required: false })
  height: number;

  @Prop({ required: false })
  pound: number;

  @Prop({ required: false })
  bloodGroup: string;

  @Prop({ required: false })
  specialty: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
