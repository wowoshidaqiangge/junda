<template>
  <div class="quality">
       <div class="top">
          <el-row>
            <el-form :model="seachinfo"  ref="seachinfo"  class="demo-ruleForm">
              <el-col :span="12">
                   <el-form-item label="" >
                   </el-form-item>
              </el-col>
              <el-col :span="5">
                  <el-form-item label="" prop="value1">
                        <el-date-picker
                            v-model="value1"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            @change="changedate"
                            class="datetime"
                            end-placeholder="结束日期">
                        </el-date-picker>
                  </el-form-item>
                  
              </el-col>
             
              <el-col :span="3" style="margin-right:10px;margin-left:20px">
                  <el-form-item label=""  prop="productNameOrTaskNumber" >
                     <el-input  placeholder="物料名称或编码" v-model="seachinfo.productNameOrTaskNumber"> </el-input>
                 </el-form-item>
                  
              </el-col>
              <el-col :span="3">
                  <el-form-item label="" >
                        <el-button type="add" icon="el-icon-search" @click="seachinfo1">搜索</el-button>
                        <el-button type="success" icon="el-icon-refresh-right" @click="resetting">重置</el-button>
                   </el-form-item>
              </el-col>
            </el-form>
          </el-row>
     </div>
     <div class="bot">
           <el-table
                :data="produceTaskQualitylist"
                stripe
                border
               
               >
                 <el-table-column
                    v-for="(item,index) in columnlist"
                    :key="index"
                    :width="item.width"
                    :prop="item.prop"
                    :label="item.label"
                    align="center"
                >
                 </el-table-column>
                  
               
               
           </el-table>
            <div class="page">
                <el-pagination
                    :background='true'
                    :current-page.sync="pagesize"
                    @current-change="handleCurrentChange"
                    layout="total, prev, pager, next"
                    :total="totals">
                </el-pagination>
            </div>
      </div>
  </div>
</template>

<script>
import {produceTaskQuality } from 'api/product'

export default {
    name: 'quality',
    components:{
       
    },
    computed:{
       
    },
    watch: {
       
    },
    mounted(){
           
    },
    data() {
        return {
            seachinfo:{

            },
            value1:[],
            page:{
                current:1,
                size:10
            },
            produceTaskQualitylist:[],
            pagesize:1,
            totals:0,
            columnlist:[
                {prop:'index',label:'序号'},
                {prop:'qualityNumber',label:'质检流水号'},
                {prop:'taskNumber',label:'任务单'},
                {prop:'productName',label:'产品名称'},
                {prop:'model',label:'规格型号'},
                {prop:'planYield',label:'计划生产量'},
                {prop:'produceCount',label:'已生产量'},
                {prop:'qualityCount',label:'已核验量'},
                {prop:'unqualifiedCount',label:'不良数'},
                {prop:'qualifiedRate',label:'合格率'},
                {prop:'assignName',label:'操作员'},
                {prop:'qualityUser',label:'质检员'},
                {prop:'createTime',label:'创建时间'},
                {prop:'remark',label:'质检概要'},
            ]
        }
    },
    created(){
       this.getproduceTaskQuality()
    },
    methods: {
        changedate(){

        },
        resetting(){

        },
        seachinfo1(){

        },
        // 数据列表
        getproduceTaskQuality(){
            produceTaskQuality(this.page).then(res=>{
                if(res.code==='0'){
                    res.data.records.map((item,index)=>{
                        item.index = index + 1
                    })
                    this.pagesize = parseInt(res.data.current)
                    this.totals = parseInt(res.data.total)
                    this.produceTaskQualitylist = res.data.records
                }
            })
        },
        //
        handleCurrentChange(val){

        }
    }
}
</script>


<style lang='less'>
        .quality{
             .top{
                height: 50px;
                margin-top: 10px;
                .datetime{
                    width:100%
                }
            }
            .page{
                margin-top: 10px;
                float: right;
            }
            .el-pager li.active{
                background-color: #409baF !important;
                color: #fff;
            }
        }
</style>
