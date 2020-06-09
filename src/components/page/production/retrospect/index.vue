<template>
  <div class="retrospect">
       <FormCreate :rule="rule" v-model="fApi" :option="options" />
  </div>
</template>

<script>
import { } from 'api/index'

export default {
    name: 'retrospect',
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
         
             fApi:{},
            options:{
               
            },
            rule:[
                //  {
                //     type:'datePicker',
                //     field:'date',
                //     value: '',
                  
                //     col:{
                //         span:5,    
                //     },
                //     labelCol: {span:0},
                //     props: {
                //         "type": "daterange",
                //         "format": "yyyy-MM-dd HH:mm:ss",
                //         "startPlaceholder":"开始日期",
                //         "endPlaceholder":"结束日期",
                //     }
                // },
                {
                    type:'input',
                    field:'inputField3',
                  
                },
                 {
                        type:'input',
                        field:'col8_3',
                        
                    },
            ],
        }
    },
    created(){
       
    },
    methods: {
     
    }
}
</script>


<style lang='less'>
        
</style>
