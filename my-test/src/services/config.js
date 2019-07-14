
// const host = 'http://test.uspweb.jd.com'
// const host = 'http://uspmgt.jd.com'
const host = __HOST
const hostRole = location.host == 'tscost.jd.com' ? 'http://jdusp.jd.com' : 'http://test.usp.jd.com'

export const CONFIG = {
  STATUS_SUCCESS: 1, // 成功状态
  URL: {
    // ----------- 请求链接拼接地址 -----------------
    querypermcontent: hostRole + '/usp/querypermcontent',
    logout: hostRole + '/usp/logout',
    getDemo: host + '/demo/query',
    addDemo: host + '/demo/create',
    updateDemo: host + '/demo/update',
    deleteDemo: host + '/demo/delete',

    downloadTemplate: host + '/template/download',
    downloadTemplateData: host + '/template/downloadData',
    uploadTemplate: host + '/template/upload'
  }
}
export const CONFIG_IS_AUTH = false
const defaultAuth = true

export const CONFIG_ROLE = [
  {
    'name': '标准物流成本',
    'id': 'STANDARDLOGISTICSCOST',
    'checked': defaultAuth
  },
  {
    'name': '物流车成本-查询',
    'id': 'STANDARDLOGISTICSCOST_QUERY',
    'checked': defaultAuth
  },
  {
    'name': '物流车成本-删除',
    'id': 'STANDARDLOGISTICSCOST_DELETE',
    'checked': defaultAuth
  },
  {
    'name': '物流车成本-更新',
    'id': 'STANDARDLOGISTICSCOST_UPDATE',
    'checked': defaultAuth
  },
  {
    'name': '物流车成本-新建',
    'id': 'STANDARDLOGISTICSCOST_CREATE',
    'checked': defaultAuth
  },
  {
    'name': '物流车成本-重置',
    'id': 'STANDARDLOGISTICSCOST_REST',
    'checked': defaultAuth
  },
  {
    'name': '模板下载',
    'id': 'TEMPLATE_DOWNLOAD',
    'checked': defaultAuth
  },
  {
    'name': '导出数据',
    'id': 'TEMPLATE_DOWNLOADDATA',
    'checked': defaultAuth
  },
  {
    'name': '导入',
    'id': 'TEMPLATE_UPLOAD',
    'checked': defaultAuth
  }
]
