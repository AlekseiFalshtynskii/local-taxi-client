export const HOST = 'http://localhost:5000';

const AUTH_SERVICE = `${HOST}/auth-service`;

const QUEUE_FV_SERVICE = `${HOST}/queue-fv-service`;

const QUEUE_VF_SERVICE = `${HOST}/queue-vf-service`;

export const AUTHORIZATION = `Basic ${btoa('localtaxi:localtaxi@123')}`;

export const TOKEN_PATH = `${AUTH_SERVICE}/oauth/token`;

export const SIGNUP_PATH = `${AUTH_SERVICE}/api/auth/signup`;

export const USER_PATH = `${AUTH_SERVICE}/api/users`;

export const USER_USERNAME_PATH = `${AUTH_SERVICE}/api/users/username`;

export const USER_PASSWORD_PATH = `${AUTH_SERVICE}/api/users/password`;

export const USER_EMAIL_PATH = `${AUTH_SERVICE}/api/users/email`;

export const USER_FIO_PATH = `${AUTH_SERVICE}/api/users/fio`;

export const CAR_PATH = `${AUTH_SERVICE}/api/cars`;

export const QUEUE_FV_ALL_ACTIVE_PATH = `${QUEUE_FV_SERVICE}/api/queue`;

export const QUEUE_VF_ALL_ACTIVE_PATH = `${QUEUE_VF_SERVICE}/api/queue`;

export const QUEUE_FV_DRIVER_PATH = `${QUEUE_FV_SERVICE}/api/queue/driver`;

export const QUEUE_VF_DRIVER_PATH = `${QUEUE_VF_SERVICE}/api/queue/driver`;

export const QUEUE_FV_PASSENGER_PATH = `${QUEUE_FV_SERVICE}/api/queue/passenger`;

export const QUEUE_VF_PASSENGER_PATH = `${QUEUE_VF_SERVICE}/api/queue/passenger`;
