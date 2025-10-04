import { Test, TestingModule } from '@nestjs/testing';
import { UserVerificationController } from './user-verification.controller';
import { UserVerificationService } from './user-verification.service';

describe('UserVerificationController', () => {
  let controller: UserVerificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserVerificationController],
      providers: [UserVerificationService],
    }).compile();

    controller = module.get<UserVerificationController>(UserVerificationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
