import axi from 'axios';

export default {
  getDeptTreeApi(p) {
    return axi.get('/bdept/getDeptTree', {
      params: p,
      headers: {
        'Authorization': "Bearer " + sessionStorage.getItem("userToken")
      }
    })
  },
  addDeptApi(p) {
    return axi.post('/bdept/add', p, {
      headers: {
        'Authorization': "Bearer " + sessionStorage.getItem("userToken")
      }
    });
  },
  updateApi(id, p) {
    return axi.put('/bdept/update/' + id, p, {
      headers: {
        'Authorization': "Bearer " + sessionStorage.getItem("userToken"),
      }
    });
  },
  deleteApi(id) {
    return axi.delete('/bdept/delete/' + id, {
      headers: {
        'Authorization': "Bearer " + sessionStorage.getItem("userToken"),
      }
    });
  },
};
