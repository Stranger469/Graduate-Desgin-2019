import axi from 'axios';

export default {
  getBJobsAndUserApi(p) {
    return axi.get('/bjob/queryBJobsAndUsernByPagination', {
      params: p,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
      },
    });
  },
  addApi(p) {
    return axi.post('/bjob/add', p, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
      },
    });
  },
  updateApi(id, p) {
    return axi.put(`/sysuser/update/${id}`, p, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
      },
    });
  },
  deleteApi(id) {
    return axi.delete(`/brecruiter/deleteLogical/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
      },
    });
  },
  getCityApi() {
    return axi.get('/ecity/queryECitys', {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
      },
    });
  },
};
