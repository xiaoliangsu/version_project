<style lang='less'>
  .ivu-page .ivu-page-options-elevator input {
    background-color: inherit;
  }

  @media (max-width: 2000px) {
    .ivu-table {
      .col-timerange {
        width: 270px;
      }
    }
  }

  @media (max-width: 1400px) {
    .ivu-table {
      .col-timerange {
        width: 150px;
      }
    }
  }
</style>
<template>
  <div>
    <Row>
      <Table :size='data.size' :loading="loading" :columns="columns" :data="tableData"/>
      <div style="margin: 10px;">
        <div style="float: right;">
          <Page v-if='this.data.data.params && this.data.data.params.pageSize'
                :total="total" show-total :current="currentPage"
                :page-size='this.data.data.params.pageSize' @on-change="changePage"
                size="small"
                show-elevator>
          </Page>
        </div>
      </div>
    </Row>

  </div>
</template>
<script>
  import util from '../utils/utils.js';
  export default {
    name: 'vTable',
    data() {
      return {
        columns: [],    // 表头数据
        tableData: [],  // 表格数据
        currentPage: 1, // 当前页数
        loading: true,  // 是否处于加载状态
        total: 0,     // 列表总条数
        search: {},      // 筛选条件
      };
    },
    props: {
      data: Object
    },
    mounted() {
      // 表头获取
      this.setColumns();
      // 是否默认加载数据
      if (this.data.noLoad) {
        this.loading = false;
      } else {
        // 数据获取
        this.getData();
      }
      // 存储当前实例
      this.data.name ? this.$store.state[this.data.name] = this : null;
    },
    methods: {
      // 设置默认表头
      setColumns() {
        let columns = [];
        if (this.data.columns && this.data.columns.length > 0) {
          this.data.columns.map(item => {
            if (this.data.defaultColumns.indexOf(item.key) >= 0) {
              columns.push(item);
            }
          });
        }
        this.columns = columns;
      },
      // 数据获取
      async getData(search) {


        this.loading = true;
        let params = {};
        this.data.data.params ? Object.assign(params, this.data.data.params) : null;
        // 设置请求页数
        params.pageSize ? (params.page = this.currentPage) : null;
        // 设置查询参数
        if (search && typeof(search) === 'object') {
          Object.assign(params, search);
        }
        let data = {
          url: this.data.data.url,
          params: params,
          method: this.data.data.method
        };
        let res = await util.getData(data);
        let res1 = res.results ? res.results : res.data;
        for (let i = 0; i < res1.length; i++) {
          if (res1[i].metadata) {
            for (let x in res1[i].metadata) {
              res1[i][x] = res1[i].metadata[x];
            }
          }
        }
        this.tableData = res1;
        this.total = res.numResults;
        this.loading = false;

      },
      // 改变table页
      changePage(pageNum) {
        this.currentPage = pageNum;
        this.getData(this.search);
      },
      // 筛选查询
      tableSearch(search) {
        this.search = search;
        this.currentPage = 1;
        this.getData(this.search);
      },

    }
  }
</script>
