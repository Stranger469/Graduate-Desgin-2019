import axi from 'axios';

export default {
  validateImg(p) {
    return axi.get('/auth/validateImg', { params: p });
  },
  getImgValidate(p) {
    return axi.get('/auth/getImgValidate', { params: p });
  },
  getPhoneValidate(p) {
    return axi.get('/auth/getPhoneValidate', { params: p });
  },
  candidateLoginByPhone(p) {
    return axi.post('/auth/candidateLoginByPhone', p);
  },
  recruiterLoginByPhone(p) {
    return axi.post('/auth/recruiterLoginByPhone', p);
  },
  recruiterLoginByPassword(p) {
    return axi.post('/auth/recruiterLoginByPassword', p);
  },
  adminLogin(p) {
    return axi.post('/auth/adminLogin', p);
  },
};
