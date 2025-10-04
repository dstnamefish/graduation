import avatar1 from '@/assets/img/avatar/avatar1.webp';
import avatar10 from '@/assets/img/avatar/avatar10.webp';
import avatar2 from '@/assets/img/avatar/avatar2.webp';
import avatar3 from '@/assets/img/avatar/avatar3.webp';
import avatar4 from '@/assets/img/avatar/avatar4.webp';
import avatar5 from '@/assets/img/avatar/avatar5.webp';
import avatar6 from '@/assets/img/avatar/avatar6.webp';
import avatar7 from '@/assets/img/avatar/avatar7.webp';
import avatar8 from '@/assets/img/avatar/avatar8.webp';
import avatar9 from '@/assets/img/avatar/avatar9.webp';

export interface User {
  id: number
  username: string
  gender: 1 | 0
  mobile: string
  email: string
  dep: string
  status: string
  create_time: string
  avatar: string
}

// 用户列表
export const ACCOUNT_TABLE_DATA: User[] = [
  {
    avatar: avatar1,
    create_time: '2020-09-09 10:01:10',
    dep: '研发部',
    email: 'alexmorgan@company.com',
    gender: 1,
    id: 1,
    mobile: '18670001591',
    status: '1',
    username: 'alexmorgan',
  },
  {
    avatar: avatar2,
    create_time: '2020-10-10 13:01:12',
    dep: '电商部',
    email: 'sophiabaker@company.com',
    gender: 1,
    id: 2,
    mobile: '17766664444',
    status: '1',
    username: 'sophiabaker',
  },
  {
    avatar: avatar3,
    create_time: '2020-11-14 12:01:45',
    dep: '人事部',
    email: 'liampark@company.com',
    gender: 1,
    id: 3,
    mobile: '18670001597',
    status: '1',
    username: 'liampark',
  },
  {
    avatar: avatar4,
    create_time: '2020-11-14 09:01:20',
    dep: '产品部',
    email: 'oliviagrant@company.com',
    gender: 0,
    id: 4,
    mobile: '18670001596',
    status: '1',
    username: 'oliviagrant',
  },
  {
    avatar: avatar5,
    create_time: '2020-11-13 11:01:05',
    dep: '财务部',
    email: 'emmawilson@company.com',
    gender: 0,
    id: 5,
    mobile: '18670001595',
    status: '1',
    username: 'emmawilson',
  },
  {
    avatar: avatar6,
    create_time: '2020-10-11 13:10:26',
    dep: '运营部',
    email: 'noahevan@company.com',
    gender: 1,
    id: 6,
    mobile: '18670001594',
    status: '1',
    username: 'noahevan',
  },
  {
    avatar: avatar7,
    create_time: '2020-05-14 12:05:10',
    dep: '客服部',
    email: 'avamartin@company.com',
    gender: 1,
    id: 7,
    mobile: '18123820191',
    status: '2',
    username: 'avamartin',
  },
  {
    avatar: avatar8,
    create_time: '2020-11-12 07:22:25',
    dep: '总经办',
    email: 'jacoblee@company.com',
    gender: 1,
    id: 8,
    mobile: '18670001592',
    status: '3',
    username: 'jacoblee',
  },
  {
    avatar: avatar9,
    create_time: '2020-06-12 05:04:20',
    dep: '研发部',
    email: 'miaclark@company.com',
    gender: 0,
    id: 9,
    mobile: '18670001581',
    status: '4',
    username: 'miaclark',
  },
  {
    avatar: avatar10,
    create_time: '2020-11-12 16:01:10',
    dep: '研发部',
    email: 'ethanharris@company.com',
    gender: 1,
    id: 10,
    mobile: '13755554444',
    status: '1',
    username: 'ethanharris',
  },
  {
    avatar: avatar6,
    create_time: '2020-11-14 12:01:20',
    dep: '研发部',
    email: 'isabellamoore@company.com',
    gender: 1,
    id: 11,
    mobile: '13766660000',
    status: '1',
    username: 'isabellamoore',
  },
  {
    avatar: avatar7,
    create_time: '2020-11-14 12:01:20',
    dep: '研发部',
    email: 'masonwhite@company.com',
    gender: 1,
    id: 12,
    mobile: '18670001502',
    status: '1',
    username: 'masonwhite',
  },
  {
    avatar: avatar8,
    create_time: '2020-11-14 12:01:20',
    dep: '研发部',
    email: 'charlottehall@company.com',
    gender: 1,
    id: 13,
    mobile: '13006644977',
    status: '1',
    username: 'charlottehall',
  },
  {
    avatar: avatar9,
    create_time: '2020-11-14 12:01:20',
    dep: '研发部',
    email: 'benjaminscott@company.com',
    gender: 0,
    id: 14,
    mobile: '13599998888',
    status: '1',
    username: 'benjaminscott',
  },
  {
    avatar: avatar10,
    create_time: '2020-11-14 12:01:20',
    dep: '研发部',
    email: 'ameliaking@company.com',
    gender: 1,
    id: 15,
    mobile: '13799998888',
    status: '1',
    username: 'ameliaking',
  },
];

export interface Role {
  roleName: string
  roleCode: string
  des: string
  date: string
  enable: boolean
}

// 角色列表
export const ROLE_LIST_DATA: Role[] = [
  {
    date: '2025-05-15 12:30:45',
    des: '拥有系统全部权限',
    enable: true,
    roleCode: 'R_SUPER',
    roleName: '超级管理员',
  },
  {
    date: '2025-05-15 12:30:45',
    des: '拥有系统管理权限',
    enable: true,
    roleCode: 'R_ADMIN',
    roleName: '管理员',
  },
  {
    date: '2025-05-15 12:30:45',
    des: '拥有系统普通权限',
    enable: true,
    roleCode: 'R_USER',
    roleName: '普通用户',
  },
  {
    date: '2025-05-16 09:15:30',
    des: '管理财务相关权限',
    enable: true,
    roleCode: 'R_FINANCE',
    roleName: '财务管理员',
  },
  {
    date: '2025-05-16 11:45:00',
    des: '拥有数据分析权限',
    enable: false,
    roleCode: 'R_ANALYST',
    roleName: '数据分析师',
  },
  {
    date: '2025-05-17 14:30:22',
    des: '处理客户支持请求',
    enable: true,
    roleCode: 'R_SUPPORT',
    roleName: '客服专员',
  },
  {
    date: '2025-05-17 15:10:50',
    des: '管理营销活动权限',
    enable: true,
    roleCode: 'R_MARKETING',
    roleName: '营销经理',
  },
  {
    date: '2025-05-18 08:25:40',
    des: '仅限浏览权限',
    enable: false,
    roleCode: 'R_GUEST',
    roleName: '访客用户',
  },
  {
    date: '2025-05-18 09:50:12',
    des: '负责系统维护和更新',
    enable: true,
    roleCode: 'R_MAINTAINER',
    roleName: '系统维护员',
  },
  {
    date: '2025-05-19 13:40:35',
    des: '管理项目相关权限',
    enable: true,
    roleCode: 'R_PM',
    roleName: '项目经理',
  },
];