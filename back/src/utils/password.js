import bcrypy from 'bcrypt';

export const hashPassword = (password) => bcrypy.hash(password, 10);
export const comparePassword = (password, hash) => bcrypy.compare(password, hash); 