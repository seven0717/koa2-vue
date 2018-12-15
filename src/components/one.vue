<template>
  <div>
    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%;"
      @selection-change="xuanzhong"
      tooltip-effect="dark">
      <el-table-column
        type="selection"
        width="55px">
      </el-table-column>
      <el-table-column
        label="时间"
        prop="date">
      </el-table-column>
      <el-table-column
        label="姓名"
        prop="name">
      </el-table-column>
      <el-table-column
        label="住址"
        prop="address">
      </el-table-column>
      <el-table-column
        label="手机"
        prop="tel">
      </el-table-column>
      <el-table-column
        align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">Edit
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
  import api from '@/api/index.js';
  import date from '@/utils/date.js'

  export default {
    data() {
      return {
        tableData: [],
        search: ''
      }
    },
    methods: {
      // 编辑
      handleEdit(index, row) {
        console.log(index, row);
      },
      // 删除
      handleDelete(index, row) {
        console.log(index, row);
      },
      // 选中
      xuanzhong(row) {
        console.log(row);
      },
    },
    mounted() {
      api.lists().then(data => {
        //  获取后台数据
        let ss = data.data.res;
        // 时间格式转换
        for (let i = 0; i < ss.length; i++) {
          ss[i].date = date(ss[i].date, 'yyyy-MM-dd HH:mm:ss')
        }
        this.tableData = ss;
      })
    }
  }
</script>

<style scoped>

</style>
