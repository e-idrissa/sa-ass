import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOneByRole(role: string) {
    const admin = await this.userModel
      .findOne({ role })
      .select('-passwordHash')
      .exec();

    if (!admin) {
      return {
        code: 404,
        message: 'User not found',
        result: null,
      };
    }
    return {
      code: 200,
      message: 'User fetched successfully',
      result: admin,
    };
  }

  async create(createUserDto: CreateUserDto) {
    const existing = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (existing) {
      return {
        code: 409,
        message: 'Email already in use',
        result: null,
      };
    }

    try {
      const count = await this.userModel.countDocuments();
      const matriculeNumber = (count + 1).toString().padStart(3, '0');
      const matriculeValue = `DOCT-${matriculeNumber}`;

      const user = new this.userModel({
        role: createUserDto.role,
        isVerified: false,
        matricule: matriculeValue,
        email: createUserDto.email,
        passwordHash: createUserDto.passwordHash,
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        dateOfBirth: createUserDto.dateOfBirth || new Date(),
        sex: createUserDto.sex || '',
        telephone: createUserDto.telephone || '',
        emergencyContact: createUserDto.emergencyContact || '',
        height: createUserDto.height || 0,
        pound: createUserDto.pound || 0,
        bloodGroup: createUserDto.bloodGroup || '',
        specialty: createUserDto.specialty || '',
      });
      const savedUser = user.save();

      return {
        code: 201,
        message: 'User created successfully',
        result: savedUser,
      };
    } catch (error) {
      console.log('USER CREATION ERROR', error);

      return {
        code: 500,
        message: 'Failed to create user',
        result: null,
      };
    }
  }

  async findAll() {
    try {
      const users = await this.userModel.find().select('-passwordHash').exec();
      return {
        code: 200,
        message: 'Users fetched successfully',
        result: users,
      };
    } catch (error) {
      console.log('USERS FETCHING ERROR', error);

      return {
        code: 500,
        message: 'Failed to fetch users',
        result: null,
      };
    }
  }

  async findById(id: string) {
    try {
      const user = await this.userModel
        .findById(id)
        .select('-passwordHash')
        .exec();
      return {
        code: 200,
        message: 'User fetched successfully',
        result: user,
      };
    } catch (error) {
      console.log('USER FETCHING ERROR', error);

      return {
        code: 500,
        message: 'Failed to fetch user',
        result: null,
      };
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await this.userModel
        .findOne({ email })
        .select('-passwordHash')
        .exec();
      return {
        code: 200,
        message: 'User fetched successfully',
        result: user,
      };
    } catch (error) {
      console.log('USER FETCHING ERROR', error);

      return {
        code: 500,
        message: 'Failed to fetch user',
        result: null,
      };
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const existing = await this.userModel.findOne({
      _id: id,
    });
    if (!existing) {
      return {
        code: 404,
        message: 'User not found',
        result: null,
      };
    }
    try {
      const updatedUser = await this.userModel
        .findByIdAndUpdate(id, updateUserDto, { new: true })
        .select('-passwordHash')
        .exec();
      return {
        code: 200,
        message: 'User updated successfully',
        result: updatedUser,
      };
    } catch (error) {
      console.log('USER UPDATING ERROR', error);

      return {
        code: 500,
        message: 'Failed to update user',
        result: null,
      };
    }
  }

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const existing = await this.userModel.findOne({
      _id: id,
    });
    if (!existing) {
      return {
        code: 404,
        message: 'User not found',
        result: null,
      };
    }

    try {
      const user = await this.userModel
        .findByIdAndUpdate(
          id,
          { hashPassword: updatePasswordDto.newPassword },
          { new: true },
        )
        .select('-passwordHash')
        .exec();
      return {
        code: 200,
        message: 'Password updated successfully',
        result: user,
      };
    } catch (error) {
      console.log('PASSWORD UPDATING ERROR', error);

      return {
        code: 500,
        message: 'Failed to update password',
        result: null,
      };
    }
  }

  async remove(id: string) {
    try {
      const user = await this.userModel.findByIdAndDelete(id).exec();
      return {
        code: 200,
        message: 'User deleted successfully',
        result: user,
      };
    } catch (error) {
      console.log('USER DELETING ERROR', error);

      return {
        code: 500,
        message: 'Failed to delete user',
        result: null,
      };
    }
  }
}
