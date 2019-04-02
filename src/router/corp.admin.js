import CorpIndex from '@/page/corp/admin/index';
import CorpInfo from '@/page/corp/admin/corpInfo';
import DeptMgn from '@/page/corp/admin/deptMgn';
import EmplMgn from '@/page/corp/admin/emplMgn';

export default {
  path: '/corp',
  name: 'Corp',
  component: CorpIndex,
  redirect: 'corp/corpInfo',
  children: [
    {
      path: 'corpInfo',
      name: 'CorpInfo',
      component: CorpInfo,
    },
    {
      path: 'deptMgn',
      name: 'DeptMgn',
      component: DeptMgn,
    },
    {
      path: 'emplMgn',
      name: 'EmplMgn',
      component: EmplMgn,
    },
  ],
};
