<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div>
      <el-button type="primary" @click="toAdd()">新增学生</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" >
      <el-table-column fixed prop="name" label="学生姓名" width="150" />
      <el-table-column prop="count" label="学生年龄" width="auto" />
      <el-table-column fixed="right" label="Operations" width="200" type="index" index="2">
        <template #default="scope">
          <el-button type="primary" size="small" @click="edit(scope)"
            >修改</el-button
          >
          <!-- <el-button link type="primary" size="small" @click="remove">删除</el-button> -->
          <el-popconfirm title="确定要删除这个班级吗?" confirm-button-text="确定" cancel-button-text="取消" @confirm="sureClear(scope.$index)">
    <template #reference>
      <el-button>删除</el-button>
    </template>
  </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      v-model="dialogVisible"
      title="新增学生"
      width="30%"
      :before-close="handleClose"
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
      tableData:[
        {
          name: '1班',
          count:9
        },
        {
          name: '2班',
          count:9
        }
      ],
      dialogVisible:false,
      form:{
        name:'',
        count:''
      },
      action: 0
    }
  },
  created(){
    console.log("$request",this.$request)
    this.getData()
  },
  methods:{
    getData(){
      var url = '/studentList';
      var params = {};
      this.$request.get(url,params).then(res=>{
        console.log('res',res)
        this.tableData = res.list
      })
    },
    toAdd(){
      // this.$router.push({name:"classAdd",params:{id:0}})
      // this.$message({
      //   message:'333',
      //   duration:0
      // })
      this.action = 0
      this.dialogVisible = true
    },
    sureAdd(){
      this.dialogVisible = false;
      if(this.action == 0){
        this.tableData.push({name:this.form.name,count:this.form.count});
      }else if(this.action == 1){
        this.tableData[this.index].name = this.form.name
        this.tableData[this.index].count = this.form.count
      }
      this.form.name = ''
        this.form.count = ''
      
    },
    edit(info){
      this.action = 1
      console.log("info",info)
      this.form.name = info.row.name
      this.form.count = info.row.count
      this.index = info.$index
      this.dialogVisible = true
    },
    remove(){

    },
    sureClear( index ){
      console.log("index",index )
      this.tableData.splice(index,1)
    },
  }
}
</script>
