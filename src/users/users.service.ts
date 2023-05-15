import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService
  ) { }

  async create(createUserDto: CreateUserDto) {
    const userDTO: CreateUserDto = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };
    const newuser = this.userRepository.create(userDTO);
    return this.userRepository.save(newuser);
  }

  findAll() {
    return this.userRepository.find({
      where: {
        delete: 0,
      },
    });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (user) {
      const { created_at, updated_at, password, deleted_at, ...userResponse } = user;
      return userResponse;
    }
    return new HttpException('user not found', 401);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (user) {
      user.user_state = 0;
      user.delete = 1;
      user.deleted_at = new Date();
      await this.userRepository.save(user);
      return { sucess: true, data: 'user has deleted' };
    }

    return new HttpException('user not found', 401);
  }

  async login(loginUserDto: LoginUserDto) {
    const userByUsername = await this.userRepository.findOne({
      where: { username: loginUserDto.username },
    });

    if (userByUsername) {
      const isMatch = await bcrypt.compare(
        loginUserDto.password,
        userByUsername.password,
      );

      if (isMatch) {
        const { created_at, updated_at, password, ...userToken } =
          userByUsername;
        const token = this.jwtService.sign(userToken);

        return { success: true, message: 'Login success', data: token };
      }
      return { success: false, message: 'User or password incorrect' };
    }
    return { success: false, message: 'User not foud' };
  }
}
