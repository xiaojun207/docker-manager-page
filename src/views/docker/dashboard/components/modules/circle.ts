

export function getOption(title:string , data:object) {
  const option = {
    title: {
      text: title,
    },
    series: [
      {
        name: title,
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 2,
          borderColor: '#fff',
          borderWidth: 10
        },
        color: ['#0cd505', '#ec0527'],
        label: {
          formatter: (p) => {
            let dom = `<div backgroundColor="red">1</div>`
            return p.name + ' ' + p.value
          }
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '15',
            fontWeight: 'bold',
            formatter: (p) => {
              let dom = `<div backgroundColor="red">1</div>`
              return p.name + ' ' + p.value
            }
          }
        },
        data: data
            // [
            //   { value: 1048, name: '搜索引擎' },
            //   { value: 735, name: '直接访问' },
            //   { value: 580, name: '邮件营销' },
            //   { value: 484, name: '联盟广告' },
            //   { value: 300, name: '视频广告' }
            // ]
      }
    ]
  };
  return option
}

export default getOption
