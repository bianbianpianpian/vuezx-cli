<!-- <template>
    <div class="loading">
        loading...
    </div>
</template> -->
<script>
// 自定义Cascader模糊搜索多级组件
import iView from 'iview'
export default {
  name: 'MultiLayerSearchCascader',
  extends: iView.Cascader,
  // data () {
  //   return {
  //     current: 0
  //   }
  // },
  props: ['value'],
  computed: {
    querySelections () {
      let selections = []
      function getSelections (arr, label, value) {
        for (let i = 0; i < arr.length; i++) {
          let item = arr[i]
          item.__label = label ? label + ' / ' + item.label : item.label
          item.__value = value ? value + ',' + item.value : item.value

          if (item.children && item.children.length) {
            getSelections(item.children, item.__label, item.__value)
            delete item.__label
            delete item.__value
          } else {
            selections.push({
              label: item.__label,
              value: item.__value,
              display: item.__label,
              item: item,
              disabled: !!item.disabled
            })
          }
        }
      }
      getSelections(this.data)
      selections = selections.filter(item => {
        // 重写搜索
        if (this.query.indexOf('/') > -1) {
          let queryArray = this.query.split('/')
          let yes = true
          for (let q in queryArray) {
            if (queryArray[q]) {
              if (item.label.indexOf(queryArray[q]) < 0) {
                yes = false
                break
              } else {
                item.display = item.display.replace(new RegExp(queryArray[q], 'g'), `<span>${queryArray[q]}</span>`)
              }
            }
          }
          return yes ? item : false
        } else {
          return item.label ? item.label.indexOf(this.query) > -1 : false
        }
      }).map(item => {
        item.display = item.display.replace(new RegExp(this.query, 'g'), `<span>${this.query}</span>`)
        return item
      })
      // console.log(selections)
      return selections
    }
  },
  methods: {
    updateResult (result) {
      if (result.length == 2) {
        let selected = this.selected = this.tmpSelected = result
        this.currentValue = ''
        let currentValue = []
        for (let i = selected.length - 1; i >= 0; i--) {
          currentValue.push(selected[i].value)
        }
        this.currentValue = [...currentValue]
        // console.log('1111', currentValue, this.currentValue)
        this.$emit('on-change', this.currentValue, JSON.parse(JSON.stringify(this.selected)))
      } else {
        this.tmpSelected = result
      }
    }
    // updateSelected (init = false, changeOnSelectDataChange = false) {
    //   console.log('222')
    //   if (!this.changeOnSelect || init || changeOnSelectDataChange) {
    //     this.broadcast('Caspanel', 'on-find-selected', {
    //       value: this.currentValue
    //     })
    //   }
    // },
    // handleSelectItem (index) {
    //   console.log('select')
    //     // const item = this.querySelections[index];

    //     // if (item.item.disabled) return false;
    //     // this.query = '';
    //     // this.$refs.input.currentValue = '';
    //     // const oldVal = JSON.stringify(this.currentValue);
    //     // this.currentValue = item.value.split(',');
    //     // this.emitValue(this.currentValue, oldVal);
    //     // this.handleClose();
    // }
    //   emitValue (val, oldVal) {
    //     console.log('change', val)
    //     if (JSON.stringify(val) !== oldVal) {
    //       this.$emit('on-change', this.currentValue, JSON.parse(JSON.stringify(this.selected)))
    //       this.$nextTick(() => {
    //         this.dispatch('FormItem', 'on-form-change', {
    //           value: this.currentValue,
    //           selected: JSON.parse(JSON.stringify(this.selected))
    //         })
    //       })
    //     }
    //   }
  }
  // created: function () {
  // console.log(iView.Cascader)
  // }
}
</script>
