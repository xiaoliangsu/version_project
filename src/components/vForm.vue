<style lang='less'>
  .filterForm {
    label {
      width: max-content;
    }


    .ivu-form-item-content {
      display: inline-block;

      &>div {
        display: inline-block;
      }
    }
    .ivu-form-item {
      margin-bottom: 8px;

    }


  }

</style>
<template>

  <div class="filterForm">
    <Form ref="form"
          :rules="ruleValidate"
          :label-width="80"
          :inline="data.inline"
          class="v-form">

      <FormItem
        v-for="(item,key) in form"
        :key="key"
        :label="item.type === 'button' ? '' : item.label"
        :prop="item.name"
      class="form-item">

          <component
            :allProps="item"
            :is="item.type"
            :op="options"
            :value="formData">
          </component>
        </br>


        <!--<v-map v-if="item.type==='siteMap'"></v-map>-->
      </FormItem>

      </br>

      <FormItem
        v-if="data.submitBtn"
        class="btn"
      >
        <Button :size="data.size" v-if="data.submitBtn" @click="onSubmit"
                type="primary" >确认</Button>
      </FormItem>

    </Form>
  </div>

</template>
<script>
  import util from '../utils/utils.js';
  let Input = {
    props: ['allProps', 'value'],
    template: '<Input :size="allProps.size" placeholder="请输入内容..." v-model="value[allProps.name]" :disabled="allProps.disabled"> </Input>'
  };

  let DatePicker = {
    props: ['allProps', 'value','op'],
    computed: {
      type() {
        return this.allProps.showType ? this.allProps.showType : 'daterange';
      }
    },
    template: '<DatePicker type="daterange" :options="op" v-model="value[allProps.name]" placement="bottom" :size="allProps.size" placeholder="请选择日期..." style="width: 200px"> </DatePicker>'
  };


  let Select = {
    props: ['allProps', 'value'],
    template: `<Select :clearable="allProps.clearable" :filterable="allProps.filterable" :multiple="allProps.multiple" :size="allProps.size" style="width: 140px" v-model="value[allProps.name]"> <Option v-for="item in allProps.data" :value="item.value" :key="item.value">{{ item.label }}</Option> </Select>`
  };

  let Cascader = {
    props: ['allProps', 'value'],
    template: '<Cascader :filterable="allProps.filterable" :size="allProps.size" v-model="value[allProps.name]" :data="allProps.data"> </Cascader>'
  };
  export default {
    name: 'vForm',
    data() {
      return {
        formData: {},
        ruleValidate: this.data.rules,
        form:[],
        options: {
          shortcuts: [
            {
              text: '1 week',
              value () {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                return [start, end];
              }
            },
            {
              text: '1 month',
              value () {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                return [start, end];
              }
            },
            {
              text: '3 months',
              value () {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                return [start, end];
              }
            }
          ]
        }
      };
    },
    props: {
      data: Object
    },
    computed:{
      DataCopy(){
          return JSON.parse(JSON.stringify(this.data));
      }
    },
    mounted() {
      this.DataCopy.data.forEach(item => {
        if (item.type === 'Select' || item.type === 'Cascader') {
          item.data = Object.prototype.toString.call(item.data) === '[object Object]' ? [{
            value: '请选择',
            label: '请选择'
          }] : item.data;
        }
      });
      this.getData();
      this.setInitVal();

    },
    methods: {
      setInitVal() {
        let formData = {};
        this.DataCopy.data.map(item => {
          switch (item.type) {
            case 'Cascader':
              formData[item.name] = item.defaultValue ? item.defaultValue : [];
              break;
            case 'Select':
              formData[item.name] = item.defaultValue ? item.defaultValue : [];
              break;
            case 'DatePicker':
              formData[item.name] = item.defaultValue ? item.defaultValue : '';
              break;
            case 'Input':
              formData[item.name] = item.defaultValue ? item.defaultValue : '';
              break;
          }
        });
        this.form = this.DataCopy.data;
        this.formData = formData;
      },

      onSubmit() {

        this.$emit('onSubmit', this.formData);
      },
      getData: async function() {
        let resAll = [];
        for (let i = 0; i < this.data.data.length; i++) {
          if (this.data.data[i].data && this.data.data[i].data.url) {
            resAll.push({
              index: i,
              data: await util.getData(this.data.data[i].data)
            });
          }
        }
        resAll.forEach(res => {
            this.DataCopy.data[res.index].data = res.data.specToken || [];
          this.form = this.DataCopy.data;
        });

      },

    },
    components: {
      Cascader,
      DatePicker,
      Select,
      Input,
    }
  }
</script>
