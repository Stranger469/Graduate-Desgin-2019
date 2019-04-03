import axi from 'axios';

export default {
  getAllEmploApi(p) {
    return axi.get('/brecruiter/queryBRecruiterByCompanyIdByPagination', {
      params: p,
      headers: {
        'Authorization': "Bearer " + sessionStorage.getItem("userToken")
      }
    })
  },
  getAllDeptApi(p) {
    return axi.get('/bdept/getAllDept', {
      params: p,
      headers: {
        'Authorization': "Bearer " + sessionStorage.getItem("userToken")
      }
    });
  },
  addApi(p) {
    return axi.post('/brecruiter/addAndUser', p, {
      headers: {
        'Authorization': "Bearer " + sessionStorage.getItem("userToken")
      }
    });
  },
  update(id, p) {
    return axi.put('/bcompany/update/' + id, p, {
      headers: {
        'Authorization': "Bearer " + sessionStorage.getItem("userToken"),
      }
    });
  },
  deleteApi(id) {
    return axi.delete('/brecruiter/deleteLogical/' + id, {
      headers: {
        'Authorization': "Bearer " + sessionStorage.getItem("userToken"),
      }
    });
  },
};
