export interface InterviewTopic {
  id: string
  icon: string
  title: string
  subtitle: string
  takeaways: string[]
}

// 占位内容 — 看完采访后替换为真实内容
export const interviewTopics: InterviewTopic[] = [
  {
    id: 'roots',
    icon: '🎸',
    title: '出发的起点',
    subtitle: '两个人，两种出发',
    takeaways: [
      '崔健谈第一次站上舞台的感受',
      '罗永浩回忆决定创业的那个瞬间',
      '关于"不认命"的共同底色',
    ],
  },
  {
    id: 'resistance',
    icon: '⚡',
    title: '不妥协的代价',
    subtitle: '坚持需要付出什么',
    takeaways: [
      '面对市场和时代压力，如何守住自己',
      '崔健的音乐坚持 vs 罗永浩的产品执念',
      '他们各自最艰难的时刻',
    ],
  },
  {
    id: 'era',
    icon: '🕐',
    title: '时代与个人',
    subtitle: '时代推着走，还是自己选的路',
    takeaways: [
      '从八十年代到今天，社会变迁中的个人选择',
      '摇滚和创业，都是对抗平庸的方式',
      '他们如何看待今天的年轻人',
    ],
  },
  {
    id: 'future',
    icon: '🔥',
    title: '还在路上',
    subtitle: '没讲完的故事',
    takeaways: [
      '崔健还在写歌，罗永浩还在创业',
      '关于"什么时候停下来"的回答',
      '给后来者的一句话',
    ],
  },
]
