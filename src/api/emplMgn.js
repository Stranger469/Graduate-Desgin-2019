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
  uploadPic(p) {
    return axi.post('/auth/uploadPic', p, {
      headers: {
        'Authorization': "Bearer " + sessionStorage.getItem("userToken"),
        "Content-Type": "multipart/form-data",
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
};
