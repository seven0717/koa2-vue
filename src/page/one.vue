<template>
  <div>
    <el-table :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
              style="width: 100%;"
              @selection-change="xuanzhong" tooltip-effect="dark">
      <el-table-column type="selection" width="55px">
      </el-table-column>
      <el-table-column label="时间" prop="date">
      </el-table-column>
      <el-table-column label="姓名" prop="name">
      </el-table-column>
      <el-table-column label="住址" prop="address">
      </el-table-column>
      <el-table-column label="手机" prop="tel">
      </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
        </template>

        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
            编辑
          </el-button>

          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑信息" :visible.sync="dialogVisible" width="40%">
      <el-form :model="me" status-icon :rules="rules" ref="me" label-width="70px">
        <el-form-item label="姓名" prop="name">
          <el-input type="text" v-model="me.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="住址" prop="address">
          <el-input type="text" v-model="me.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="tel">
          <el-input v-model.number="me.tel"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" :loading="loginLoadingState" @click="submitForm('me')">{{ yes }}</el-button>
			</span>
    </el-dialog>
  </div>
</template>

<script>
  import date from '@/utils/date.js'

  export default {
    inject: ['reload'],
    data() {
      // 姓名验证
      let names = (rule, value, callback) => {
        var reg = /^(([a-zA-Z+\.?\·?a-zA-Z+]{2,30}$)|([\u4e00-\u9fa5+\·?\u4e00-\u9fa5+]{2,30}$))/;
        if (!value) {
          return callback(new Error('姓名不能为空'));
        } else {
          if (!reg.test(value)) {
            return callback(new Error('姓名输入有误，请重新输入'));
          } else {
            callback();
          }
        }
      };
      // 手机号验证
      let tels = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号不能为空'));
        } else {
          if (value.length !== 11 && !(/^1[34578]\d{9}$/.test(value))) {
            return callback(new Error('请输入正确的手机号或格式'))
          } else {
            callback();
          }
        }
      };
      return {
        loginLoadingState: false,
        yes: '确 定',
        tableData: [],
        search: '',
        dialogVisible: false,
        me: {
          id: '',
          name: '',
          address: '',
          tel: ''
        },
        rules: {
          name: [{
            validator: names,
            required: true,
            trigger: 'blur'
          }],
          address: [{
            required: true,
            message: '地址不能为空',
            trigger: 'blur'
          }],
          tel: [{
            validator: tels,
            required: true,
            trigger: 'blur'
          }],
        }
      }
    },
    methods: {
      // 编辑
      handleEdit(index, row) {
        this.dialogVisible = true;
        this.me.name = row.name;
        this.me.address = row.address;
        this.me.tel = row.tel;
        this.me.id = row.id;
      },
      // 提交编辑
      submitForm(v) {
        this.$refs[v].validate((valid) => {
          if (valid) {
            // 向后台提交更改后的数据
            // 改变编辑按钮状态
            // 更改成功后关闭编辑页面
            this.api.edit(this.me).then(data => {
              this.loginLoadingState = true;
              this.yes = '修改中...';
              if (data.data.code === '111') {
                this.loginLoadingState = false;
                this.yes = data.data.msg;
                this.dialogVisible = false;
                // 让修改的数据刷新（app.vue需要配置）
                this.reload();
              } else {
                return;
              }
            })
          } else {
            console.log('编辑失败');
            return false;
          }
        })
      },
      // 删除
      handleDelete(index, row) {
        // console.log(index, row);
        this.api.dalete(row).then(data => {
          if (data.data.code === '111'){
            this.$message({
              message:data.data.msg,
              type: 'success'
            })
            this.reload();
          } else {
            this.$message({
              message:'删除失败',
              type:'error'
            })
          }
        })
      },
      // 选中
      xuanzhong(row) {
        // console.log(row);
      },
    },
    mounted() {
      this.api.lists().then(data => {
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
