// src/admin.seeder.ts
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { hashPassword } from '../utils/bcrypt';

@Injectable()
export class AdminSeeder {
  constructor(private readonly usersService: UsersService) {}

  async seedAdminUser(): Promise<void> {
    const req = await this.usersService.findOneByRole('admin');

    const adminPassword = '1234@Admin';

    if (req.result) {
      console.log('✅ Admin user already exists. Users loaded successfully.');
    } else {
      console.log('⚠️ No admin user found. Creating a new admin user...');
      const adminData: CreateUserDto = {
        role: 'admin',
        isVerified: true,
        matricule: 'DOCT-001',
        email: 'admin@econsult.co',
        passwordHash: await hashPassword(adminPassword),
        firstName: 'Admin',
        lastName: 'Mitchell',
        sex: 'male',
        dateOfBirth: new Date('2000-01-01'),
        telephone: '+243993546785',
        emergencyContact: '+243993111785',
        height: 180,
        pound: 70.5,
        bloodGroup: 'a+',
        specialty: 'surgery',
      };
      await this.usersService.create(adminData);
      console.log('✨ Admin user created successfully.');
    }
  }
}
