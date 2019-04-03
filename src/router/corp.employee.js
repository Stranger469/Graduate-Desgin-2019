import EmplIndex from '@/page/corp/employee/index';
import InterAssign from '@/page/corp/employee/interAssign';
import InterMgn from '@/page/corp/employee/interMgn';
import PositionMgn from '@/page/corp/employee/positionMgn';

export default {
  path: '/empl/',
  name: 'Empl',
  component: EmplIndex,
  redirect: 'empl/interAssign',
  children: [
    {
      path: 'interAssign',
      name: 'InterAssign',
      component: InterAssign,
    },
    {
      path: 'interMgn',
      name: 'InterMgn',
      component: InterMgn,
    },
    {
      path: 'positionMgn',
      name: 'PositionMgn',
      component: PositionMgn,
    },
  ],
};
