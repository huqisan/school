<template>
  <div class="home">
    <div>
      <el-button type="primary" @click="toAdd()">新增学生</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" >
      <el-table-column fixed prop="name" label="学生姓名" width="150" />
      <el-table-column prop="count" label="学生年龄" width="auto" />
      <el-table-column fixed="right" label="操作" width="200" type="index">
        <template #default="scope">
          <el-button type="primary" size="small" @click="edit(scope)"
            >修改</el-button
          >
          <el-popconfirm title="确定要删除这个学生吗?" confirm-button-text="确定" cancel-button-text="取消" @confirm="sureClear(scope.$index)">
    <template #reference>
      <el-button size="small">删除</el-button>
    </template>
  </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      v-model="dialogVisible"
      :title="actionItem[action]"
      width="30%"
      @closed="handleClose"
    >
      <el-form :model="form" label-width="120px">
    <el-form-item label="学生姓名">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="学生年龄">
      <el-input v-model="form.count" />
    </el-form-item>
    </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="sureAdd"
            >确定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  data(){
    return {
      tableData:[],
      dialogVisible:false,
      form:{
        name:'',
        count:''
      },
      action: 0,
      actionItem:['新增学生','修改学生']
    }
  },
  created(){
    this.getData()
  },
  methods:{
    getData(){
      var url = '/studentList';
      var params = {};
      this.$request.post(url,params).then(res=>{
        this.tableData = res.list
      })
    },
    handleClose(){
      this.form.name = ''
      this.form.count = ''
    },
    toAdd(){
      this.action = 0
      this.dialogVisible = true
    },
    sureAdd(){
      if(this.action == 0){
        var url = '/studentAdd';
        var params = {name:this.form.name,count:this.form.count};
        this.$request.post(url,params).then(res=>{
          this.tableData = res.list
          this.dialogVisible = false
        })
      }else if(this.action == 1){
        var url = '/studentEdit';
        var params = {info:{name:this.form.name,count:this.form.count},index:this.index};
        this.$request.post(url,params).then(res=>{
          this.tableData = res.list
          this.dialogVisible = false
        })
      }
      
    },
    edit(info){
      this.action = 1
      this.form.name = info.row.name
      this.form.count = info.row.count
      this.index = info.$index
      this.dialogVisible = true
    },
    sureClear( index ){
      this.tableData.splice(index,1)
      var url = '/studentClear';
      var params = {index:index};
      this.$request.post(url,params).then(res=>{
        this.tableData = res.list
      })
    },
  }
}
</script>
