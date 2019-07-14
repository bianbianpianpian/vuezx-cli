<template>
  <div id="demo" v-if="CONFIG_ROLE.STANDARDLOGISTICSCOST">
    <div class="card">
      <h2 class="mb10">标准物流成本配置</h2>
      <Form ref="formQuery" :model="formQuery" :rules="ruleQuery" inline :label-width="90" v-if="CONFIG_ROLE.STANDARDLOGISTICSCOST_QUERY">
        <Row>
          <Col span="6">
            <FormItem label="始发省份ID" prop="startProvinceID">
              <Input type="text" v-model="formQuery.startProvinceID" placeholder="请输入始发省份ID">
              </Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="始发省份" prop="startProvince">
              <Input type="text" v-model="formQuery.startProvince" placeholder="请输入始发省份">
              </Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="目的省份ID" prop="endProvinceID">
              <Input type="text" v-model="formQuery.endProvinceID" placeholder="请输入目的省份ID">
              </Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="目的省份" prop="endProvince">
              <Input type="text" v-model="formQuery.endProvince" placeholder="请输入目的省份">
              </Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="6">
            <FormItem label="始发城市ID" prop="startCityID">
              <Input type="text" v-model="formQuery.startCityID" placeholder="请输入始发城市ID">
              </Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="始发城市" prop="startCity">
              <Input type="text" v-model="formQuery.startCity" placeholder="请输入始发城市">
              </Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="目的城市ID" prop="endCityID">
              <Input type="text" v-model="formQuery.endCityID" placeholder="请输入目的城市ID">
              </Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="目的城市" prop="endCity">
              <Input type="text" v-model="formQuery.endCity" placeholder="请输入目的城市">
              </Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="6">
            <FormItem label="业务类别ID" prop="businessTypeID">
              <Input type="text" v-model="formQuery.businessTypeID" placeholder="请输入业务类别ID">
              </Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="业务类别" prop="businessType">
              <Input type="text" v-model="formQuery.businessType" placeholder="请输入业务类别">
              </Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem class="pull-right">
                <Button type="primary" @click="search" class="mr10">查询</Button>
                <Button type="ghost" @click="$refs['formQuery'].resetFields();search()" v-if="CONFIG_ROLE.STANDARDLOGISTICSCOST_REST">重置</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div class="pull-right mb10">
        <Button type="info" size="large" @click="add()" v-if="CONFIG_ROLE.STANDARDLOGISTICSCOST_CREATE"><Icon type="plus"></Icon> 新建</Button>
        <Button type="error" size="large" @click="remove()" :disabled="!isMuti" v-if="CONFIG_ROLE.STANDARDLOGISTICSCOST_DELETE"><Icon type="minus"></Icon> 删除</Button>
        <Button type="primary" size="large" @click="upload()" v-if="CONFIG_ROLE.TEMPLATE_UPLOAD"><Icon type="ios-download-outline"></Icon> 导入</Button>
        <Button type="primary" size="large" @click="download()" v-if="CONFIG_ROLE.TEMPLATE_DOWNLOAD"><Icon type="ios-download"></Icon> 模板下载</Button>
        <Button type="primary" size="large" @click="downloadData()" v-if="CONFIG_ROLE.TEMPLATE_DOWNLOADDATA"><Icon type="ios-download"></Icon> 导出数据</Button>
      </div>
      <Table border ref="selection" :columns="columns" :data="dataList" class="clear-both" @on-selection-change="selectionChange($event)"></Table>
      <Page class="pull-right mt10" :total="page.total" @on-change="loadData($event)" show-total show-elevator show-sizer @on-page-size-change="page.pageSize = $event;loadData()" :page-size-opts="[10, 30, 100, 300]" :page-size="page.pageSize" :current="page.pageNum"></Page>
    </div>
    <Modal
        width="560"
        v-model="modal1"
        :closable="false"
        :title="title"
        @on-cancel="cancel()" 
        class-name="vertical-center-modal">
        <Form ref="formItem" :model="formItem" :label-width="120" :rules="ruleValidate">
          <Row>
            <Col span="12">
              <FormItem label="业务类别ID" prop="businessTypeID">
                  <Input v-model="formItem.businessTypeID" placeholder="请输入业务类别ID"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="业务类别" prop="businessType">
                  <Input v-model="formItem.businessType" placeholder="请输入业务类别"></Input>
              </FormItem>
            </Col>
          </Row>
          <FormItem label="出仓库类型" prop="dcType">
              <Input v-model="formItem.dcType" placeholder="请输入出仓库类型"></Input>
          </FormItem>
          <Row>
            <Col span="12">
              <FormItem label="始发省份ID" prop="startProvinceID">
                  <Input v-model="formItem.startProvinceID" placeholder="始发省份ID需正整数"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="始发省份" prop="startProvince">
                  <Input v-model="formItem.startProvince" placeholder="请输入始发省份"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="始发城市ID" prop="startCityID">
                <Input v-model="formItem.startCityID" placeholder="始发城市ID需正整数"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="始发城市" prop="startCity">
                  <Input v-model="formItem.startCity" placeholder="请输入始发城市"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="始发区域" prop="startRegion">
                  <Input v-model="formItem.startRegion" placeholder="请输入始发区域"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="目的省份ID" prop="endProvinceID">
                  <Input v-model="formItem.endProvinceID" placeholder="目的省份ID需正整数"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="目的省份" prop="endProvince">
                  <Input v-model="formItem.endProvince" placeholder="请输入目的省份"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="目的城市ID" prop="endCityID">
                  <Input v-model="formItem.endCityID" placeholder="目的城市ID需正整数"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="目的城市" prop="endCity">
                  <Input v-model="formItem.endCity" placeholder="请输入目的城市"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="目的区域" prop="endRegion">
                  <Input v-model="formItem.endRegion" placeholder="请输入目的区域"></Input>
              </FormItem>
            </Col>
          </Row>
          <FormItem label="线路类型" prop="routeType">
              <Input v-model="formItem.routeType" placeholder="请输入线路类型"></Input>
          </FormItem>
          <Row>
            <Col span="12">
              <FormItem label="首重单位（千克）" prop="firstWeight">
                  <Input v-model="formItem.firstWeight" placeholder="最多保留两位小数"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="首重价格（元）" prop="firstPrice">
                  <Input v-model="formItem.firstPrice" placeholder="最多保留两位小数"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="续重单位（千克）" prop="additionalWeight">
                  <Input v-model="formItem.additionalWeight" placeholder="最多保留两位小数"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="续重价格（元）" prop="additionalPrice">
                  <Input v-model="formItem.additionalPrice" placeholder="最多保留两位小数"></Input>
              </FormItem>
            </Col>
          </Row>
      </Form>
      <div slot="footer">
          <Button type="ghost" @click="cancel">取消</Button>
          <Button type="primary" :loading="modal_loading" @click="ok()">{{ isAdd ? '提交' : '更新' }}</Button>
      </div>
    </Modal>
    <Modal
        width="460"
        v-model="modal2"
        :closable="false"
        title="导入"
        @on-cancel="cancel2()" 
        class-name="vertical-center-modal">
        <!-- <a href="javasrcipt:void(0);" @click="download()">下载模板</a> -->
        <Upload class="mt10" action="" :before-upload="handleUpload" accept=".xlsx,.xls" :format="['xlsx', 'xls']">
          <Button type="ghost" icon="ios-cloud-upload-outline">选择文件</Button>
        </Upload>
        <div v-if="file !== null">{{ file.name }}</div>
        <div slot="footer">
            <Button type="ghost" @click="cancel2">取消</Button>
            <Button type="primary" :disabled="file == null" :loading="loadingStatus" @click="uploadOk()">{{ loadingStatus ? '上传中' : '上传' }}</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
import { CONFIG } from '../services/config'
// import { fetch } from '../services/data.service'
export default {
  name: 'demo',
  data () {
    return {
      CONFIG_ROLE: window.CONFIG_ROLE,
      formQuery: {
        startProvinceID: '',
        startProvince: '',
        endProvinceID: '',
        endProvince: '',
        startCityID: '',
        startCity: '',
        endCityID: '',
        endCity: '',
        businessTypeID: '',
        businessType: ''
      },
      ruleQuery: {
        startProvinceID: [
          { type: 'string', pattern: /^\d+$/, message: '始发省份ID只能是数字', trigger: 'blur' }
        ],
        endProvinceID: [
          { type: 'string', pattern: /^\d+$/, message: '目的省份ID只能是数字', trigger: 'blur' }
        ],
        startCityID: [
          { type: 'string', pattern: /^\d+$/, message: '始发城市ID只能是数字', trigger: 'blur' }
        ],
        endCityID: [
          { type: 'string', pattern: /^\d+$/, message: '目的城市ID只能是数字', trigger: 'blur' }
        ],
        businessTypeID: [
          { type: 'string', pattern: /^\d+$/, message: '业务类别ID只能是数字', trigger: 'blur' }
        ]
      },
      title: '',
      formItem: {
        businessTypeID: '',
        businessType: '',
        dcType: '',
        startCityID: '',
        startRegion: '',
        startProvince: '',
        startCity: '',
        startProvinceID: '',
        endCityID: '',
        endRegion: '',
        endProvince: '',
        endCity: '',
        endProvinceID: '',
        routeType: '',
        firstWeight: '',
        firstPrice: '',
        additionalWeight: '',
        additionalPrice: ''
      },
      ruleValidate: {
        businessTypeID: [
          { required: true, message: '业务类别ID不能为空', trigger: 'blur' },
          { type: 'string', pattern: /^\d+$/, message: '业务类别ID只能是数字', trigger: 'blur' }
        ],
        businessType: [
          // { required: true, message: '业务类别不能为空', trigger: 'blur' }
        ],
        dcType: [
          // { required: true, message: '出仓库类型不能为空', trigger: 'blur' }
        ],
        startCityID: [
          { required: true, message: '始发城市ID不能为空', trigger: 'blur' },
          { type: 'string', pattern: /^\d+$/, message: '始发城市ID只能是正整数', trigger: 'blur' }
        ],
        startProvinceID: [
          { required: true, message: '始发省份ID不能为空', trigger: 'blur' },
          { type: 'string', pattern: /^\d+$/, message: '始发省份ID只能是正整数', trigger: 'blur' }
        ],
        startRegion: [
          // { required: true, message: '始发区域不能为空', trigger: 'blur' }
        ],
        startProvince: [
          // { required: true, message: '始发省份不能为空', trigger: 'blur' }
        ],
        startCity: [
          // { required: true, message: '始发城市不能为空', trigger: 'blur' }
        ],
        endCityID: [
          { required: true, message: '目的城市ID不能为空', trigger: 'blur' },
          { type: 'string', pattern: /^\d+$/, message: '目的城市ID只能是正整数', trigger: 'blur' }
        ],
        endProvinceID: [
          { required: true, message: '目的省份ID不能为空', trigger: 'blur' },
          { type: 'string', pattern: /^\d+$/, message: '目的省份ID只能是正整数', trigger: 'blur' }
        ],
        endRegion: [
          // { required: true, message: '目的区域不能为空', trigger: 'blur' }
        ],
        endProvince: [
          // { required: true, message: '目的省份不能为空', trigger: 'blur' }
        ],
        endCity: [
          // { required: true, message: '目的城市不能为空', trigger: 'blur' }
        ],
        routeType: [
          // { required: true, message: '线路类型不能为空', trigger: 'blur' }
        ],
        firstWeight: [
          { required: true, message: '首重（千克）不能为空', trigger: 'blur' },
          { type: 'string', pattern: /^[0-9]+([.]{1}[0-9]{1,2})?$/, message: '首重最多保留两位小数', trigger: 'blur' }
        ],
        firstPrice: [
          { required: true, message: '首重价格（元）不能为空', trigger: 'blur' },
          { type: 'string', pattern: /^[0-9]+([.]{1}[0-9]{1,2})?$/, message: '首重价格最多保留两位小数', trigger: 'blur' }
        ],
        additionalWeight: [
          { required: true, message: '续重单位（千克）不能为空', trigger: 'blur' },
          { type: 'string', pattern: /^[0-9]+([.]{1}[0-9]{1,2})?$/, message: '续重单位最多保留两位小数', trigger: 'blur' }
        ],
        additionalPrice: [
          { required: true, message: '续重价格（元）不能为空', trigger: 'blur' },
          { type: 'string', pattern: /^[0-9]+([.]{1}[0-9]{1,2})?$/, message: '续重价格最多保留两位小数', trigger: 'blur' }
        ]
      },
      modal1: false,
      modal2: false,
      id: '',
      modal_loading: false,
      isAdd: false,
      isMuti: false,
      file: null,
      loadingStatus: false,
      columns: [
        {
          type: 'selection',
          width: 60,
          fixed: 'left',
          align: 'center'
        },
        {
          title: '业务类别ID',
          width: 120,
          key: 'businessTypeID'
        },
        {
          title: '业务类别',
          width: 120,
          key: 'businessType'
        },
        {
          title: '出库仓类型',
          width: 120,
          key: 'dcType'
        },
        {
          title: '始发省份ID',
          width: 120,
          key: 'startProvinceID'
        },
        {
          title: '始发城市ID',
          width: 120,
          key: 'startCityID'
        },
        {
          title: '始发区域',
          width: 120,
          key: 'startRegion'
        },
        {
          title: '始发省份',
          width: 120,
          key: 'startProvince'
        },
        {
          title: '始发城市',
          width: 120,
          key: 'startCity'
        },
        {
          title: '目的省份ID',
          width: 120,
          key: 'endProvinceID'
        },
        {
          title: '目的城市ID',
          width: 120,
          key: 'endCityID'
        },
        {
          title: '目的区域',
          width: 120,
          key: 'endRegion'
        },
        {
          title: '目的省份',
          width: 120,
          key: 'endProvince'
        },
        {
          title: '目的城市',
          width: 120,
          key: 'endCity'
        },
        {
          title: '线路类型',
          width: 120,
          key: 'routeType'
        },
        {
          title: '首重',
          width: 120,
          key: 'firstWeight'
        },
        {
          title: '首重价格',
          width: 120,
          key: 'firstPrice'
        },
        {
          title: '续重单位',
          width: 120,
          key: 'additionalWeight'
        },
        {
          title: '续重价格',
          width: 120,
          key: 'additionalPrice'
        },
        {
          title: '创建时间',
          width: 120,
          key: 'createTime'
        },
        {
          title: '更新时间',
          width: 120,
          key: 'updateTime'
        },
        {
          title: '操作人',
          width: 120,
          key: 'operater'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          fixed: 'right',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              this.CONFIG_ROLE.STANDARDLOGISTICSCOST_UPDATE ? h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.render(params.index, '编辑')
                  }
                }
              }, '编辑') : '',
              this.CONFIG_ROLE.STANDARDLOGISTICSCOST_DELETE ? h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.remove(params.row)
                  }
                }
              }, '删除') : ''
            ])
          }
        }
      ],
      dataList: [],
      checkedList: [],
      page: {
        total: 0,
        pageSize: 10,
        pageNum: 1
      }
    }
  },
  methods: {
    selectionChange (value) {
      this.checkedList = value
      if (value.length > 0) {
        this.isMuti = true
      } else {
        this.isMuti = false
      }
    },
    search () {
      this.$refs['formQuery'].validate((valid) => {
        if (valid) {
          this.loadData(1)
        } else {
          this.$Message.error('表单验证失败!')
        }
      })
    },
    ok () {
      this.modal_loading = true
      this.$refs['formItem'].validate((valid) => {
        this.modal_loading = false
        if (valid) {
          let url = this.isAdd ? CONFIG.URL.addDemo : CONFIG.URL.updateDemo
          let paramItem = {
            businessTypeID: this.formItem.businessTypeID,
            businessType: this.formItem.businessType,
            dcType: this.formItem.dcType,
            startProvinceID: this.formItem.startProvinceID,
            startProvince: this.formItem.startProvince,
            startCityID: this.formItem.startCityID,
            startCity: this.formItem.startCity,
            startRegion: this.formItem.startRegion,
            endProvinceID: this.formItem.endProvinceID,
            endProvince: this.formItem.endProvince,
            endCityID: this.formItem.endCityID,
            endCity: this.formItem.endCity,
            endRegion: this.formItem.endRegion,
            routeType: this.formItem.routeType,
            firstWeight: this.formItem.firstWeight,
            firstPrice: this.formItem.firstPrice,
            additionalWeight: this.formItem.additionalWeight,
            additionalPrice: this.formItem.additionalPrice
          }
          if (!this.isAdd) {
            paramItem['id'] = this.formItem.id
          }
          this.$http.post(url, paramItem).then(res => {
            res = res.data
            if (res.statusCode === CONFIG.STATUS_SUCCESS) {
              this.$Message.success(this.title + '成功!')
              this.$refs['formItem'].resetFields()
              this.modal1 = false
              this.loadData()
            } else {
              this.$Message.error(this.title + '失败!' + res.descMsg ? res.descMsg : '')
            }
          }, res => {
            this.$Message.error(this.title + '失败!')
          })
        } else {
          this.$Message.error('表单验证失败!')
        }
      })
    },
    cancel () {
      this.modal1 = false
      this.$refs['formItem'].resetFields()
    },
    cancel2 () {
      this.modal2 = false
    },
    download () {
      window.location = CONFIG.URL.downloadTemplate + '?filename=standardlogisticscost'
    },
    downloadData () {
      window.location = CONFIG.URL.downloadTemplateData + '?fileType=standardlogisticscost'
    },
    upload () {
      this.modal2 = true
    },
    handleUpload (file) {
      this.file = file
      return false
    },
    uploadOk () {
      this.loadingStatus = true
      let formData = new FormData()
      formData.append('file', this.file)
      formData.append('fileType', 'standardlogisticscost')
      this.$http.post(CONFIG.URL.uploadTemplate, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        res = res.data
        this.loadingStatus = false
        if (res.statusCode === CONFIG.STATUS_SUCCESS) {
          this.file = null
          this.$Message.success('上传成功！')
          this.modal2 = false
          this.loadData()
        } else {
          this.$Message.error('上传失败！' + res.descMsg ? res.descMsg : '')
        }
      }, res => {
        this.loadingStatus = false
        this.$Message.error('上传失败！')
      })
    },
    render (index, title) {
      this.isAdd = true
      if (index >= 0) {
        // 修改
        this.isAdd = false
        Object.assign(this.formItem, this.dataList[index])
        this.formItem.startProvinceID = this.formItem.startProvinceID + ''
        this.formItem.endProvinceID = this.formItem.endProvinceID + ''
        this.formItem.startCityID = this.formItem.startCityID + ''
        this.formItem.endCityID = this.formItem.endCityID + ''
        this.formItem.businessTypeID = this.formItem.businessTypeID + ''
      }
      // console.log(this.formItem)
      this.title = title
      this.modal1 = true
    },
    add () {
      this.render(-1, '添加')
    },
    remove (data) {
      // console.log(data, this.checkedList)
      let alertMsg
      let ids = []
      if (data) {
        alertMsg = '确定要删除该条数据吗？'
        ids.push(data.id)
      } else {
        alertMsg = '确定要删除所选数据吗？'
        for (var i = 0; i < this.checkedList.length; i++) {
          ids.push(this.checkedList[i].id)
        }
      }
      this.$Modal.confirm({
        title: '删除',
        content: alertMsg,
        onOk: () => {
          this.$http.post(CONFIG.URL.deleteDemo, {
            ids: ids.join(',')
          }).then(res => {
            res = res.data
            if (res.statusCode === CONFIG.STATUS_SUCCESS) {
              this.$Message.success('删除成功!')
              // 是最后一页
              if (this.page.pageNum > 1 && this.page.total % 10 === 1) {
                this.page.pageNum = this.page.pageNum - 1
              }
              this.isMuti = false
              this.loadData()
            } else {
              this.$Message.error('删除失败!' + res.descMsg ? res.descMsg : '')
            }
          }, res => {
            this.$Message.error('删除失败!')
          })
        },
        onCancel: () => {
        }
      })
    },
    loadData (pageNum) {
      if (pageNum) {
        this.page.pageNum = pageNum
      }
      this.$http.post(CONFIG.URL.getDemo, {
        pageSize: this.page.pageSize,
        pageNum: this.page.pageNum,
        startProvinceID: this.formQuery.startProvinceID,
        startProvince: this.formQuery.startProvince,
        endProvinceID: this.formQuery.endProvinceID,
        endProvince: this.formQuery.endProvince,
        startCityID: this.formQuery.startCityID,
        startCity: this.formQuery.startCity,
        endCityID: this.formQuery.endCityID,
        endCity: this.formQuery.endCity,
        businessTypeID: this.formQuery.businessTypeID,
        businessType: this.formQuery.businessType
      }).then(res => {
        res = res.data
        if (res.statusCode === CONFIG.STATUS_SUCCESS) {
          this.page.total = res.data.page.total
          this.dataList = res.data.standardLogisticsCosts
        } else {
          this.$Message.error('查询失败!' + res.descMsg ? res.descMsg : '')
        }
      }, res => {
        this.$Message.error('查询失败!')
      })
    }
  },
  created: function () {
    this.loadData()
  }
}
</script>
