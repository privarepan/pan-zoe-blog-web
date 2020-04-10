<template>
  <el-table :data="data" style="width: 100%" row-key="id">
    <el-table-column prop="create_date" label="日期" width="150"></el-table-column>
    <el-table-column label="订单数">
      <el-table-column prop="total_count" label="总数" width="120"></el-table-column>
      <el-table-column prop="complete_count" label="完成"></el-table-column>
      <el-table-column prop="cancel_count" label="取消"></el-table-column>
    </el-table-column>
    <el-table-column label="服务商">
      <el-table-column :formatter="facilitator"  v-for="(item,i) in facilitators" :key="i" :label="item.name">
      </el-table-column>
    </el-table-column>

    <el-table-column label="订单价格">
      <el-table-column prop="total_money" label="总价"></el-table-column>
      <el-table-column prop="avg_total_money" label="平均价"></el-table-column>
    </el-table-column>
    <el-table-column prop="user_count" label="下单用户"></el-table-column>
  </el-table>
</template>

<script>
  import axios from 'axios'
  export default {
    name:'Dashboard',
    data() {
      return {
        data:[],
        facilitators:[],
      }
    },
    mounted(){
      axios.get('//zs-admin.com/api/dashboard').then(this.success).catch(this.fail)
    },
    methods:{
      success(res) {
         // let data = res.data.data;
         this.data = res.data.data.express_order;
         this.facilitators = res.data.data.fs
         // console.log(this.data)
      },
      fail(res){
        console.log(res)
      },
      facilitator(row, column, cellValue, index){
        var fs = row.facilitators;
        console.log(index);
        fs.forEach((item,i) => {
          if (item.id == row.facilitator_id) {
            // console.log(item.total_count)
            return item.total_count;
          }
        });
        return 0
      }
    }
  }
</script>

<style scoped>

</style>
