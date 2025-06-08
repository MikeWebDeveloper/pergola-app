import { User } from '@/types';

export const mockUser: User = {
  email: 'user@test.com',
  name: 'Test User',
};

export const mockLogin = (email: string, password: string): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'user@test.com' && password === 'test') {
        resolve(mockUser);
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 500);
  });
}; 