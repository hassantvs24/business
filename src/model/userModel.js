import http from '../services/httpService';
import config from '../config.json';
const url = config.apiEndpoint+'users';

export async function register(user) {
    return http.post(url, {
        name: user.name,
        email: user.email,
        password: user.password,
        password_confirmation: user.password_confirmation,
        user_type: 'Admin',
        user_roles_id: 1,
        business_id: 1
    });

  }