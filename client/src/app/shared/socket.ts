import * as socketIo from 'socket.io-client';
import { environment } from '../../environments/environment';

export const socket = socketIo(environment.url);