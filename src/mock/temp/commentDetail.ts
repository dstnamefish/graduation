export interface Comment {
  id: number
  author: string
  content: string
  timestamp: string
  replies: Comment[]
}

export const commentList = ref<Comment[]>([
  {
    author: '白夜',
    content: '黑神话悟空的打斗场面真的燃爆了！期待上线！',
    id: 1,
    replies: [
      {
        author: '星河',
        content: '是啊，特别是那些技能特效，简直帅炸！',
        id: 101,
        replies: [
          {
            author: '光芒',
            content: '希望优化能跟上，不然这么好的画面如果卡顿就可惜了。',
            id: 201,
            replies: [],
            timestamp: '2024-09-04 09:30',
          },
        ],
        timestamp: '2024-09-04 09:15',
      },
    ],
    timestamp: '2024-09-04 09:00',
  },
  {
    author: '浮生',
    content: '据说黑神话悟空需要很高的配置，不知道我的电脑能不能跑起来。',
    id: 2,
    replies: [
      {
        author: '晨曦',
        content: '同担心啊，听说需要至少RTX 3070才能高效运行。',
        id: 102,
        replies: [
          {
            author: '流光',
            content: '我是打算升级配置，等这款游戏就是了。',
            id: 202,
            replies: [],
            timestamp: '2024-09-04 10:40',
          },
        ],
        timestamp: '2024-09-04 10:20',
      },
    ],
    timestamp: '2024-09-04 10:00',
  },
  {
    author: '风铃',
    content: '130GB的存储要求有点夸张啊，不过画质这么好，也情有可原。',
    id: 3,
    replies: [
      {
        author: '云端',
        content: '确实有点高，不过为了这种品质的游戏，值得。',
        id: 103,
        replies: [
          {
            author: '梦境',
            content: '希望发售后能优化一下安装包体积。',
            id: 203,
            replies: [],
            timestamp: '2024-09-04 11:30',
          },
        ],
        timestamp: '2024-09-04 11:15',
      },
    ],
    timestamp: '2024-09-04 11:00',
  },
]);