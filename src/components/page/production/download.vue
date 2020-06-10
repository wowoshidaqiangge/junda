<template>
  <div v-loading.fullscreen.lock="fullscreenLoading" class="main-article" element-loading-text="Efforts to generate PDF">
    <div class="article__heading" id="subOutputRank-print">
      <div class="article__heading__title">
        生产流转表
      </div>
      <div class="pdfContent">
        <div class="oneItem">
          <div class="oneLeft">计划单号</div>
          <div class="oneRight">{{row.taskNumber}}</div>
        </div>
        <div class="oneItem">
          <div class="oneLeft">产品信息</div>
          <div class="twoLeft">
            <div class="ttwoLeft">
              <div class="tttwoLeft">产品编号</div>
              <div class="tttwoItem">{{row.productCode}}</div>
            </div>
            <div class="ttwoLeft">
              <div class="tttwoLeft">产品名称</div>
              <div class="tttwoItem">{{row.productName}}</div>
            </div>
            <div class="ttwoLeft">
              <div class="tttwoLeft">产品规格</div>
              <div class="tttwoItem">{{row.model}}</div>
            </div>
          </div>
        </div>
        <div class="qrcode codeImg"  ref="qrCodeUrl"></div>
        <!-- <img class="codeImg" src="@/assets/logo.png" /> -->
        <div class="oneItem">
          <div class="oneLeft">计划内容</div>
          <div class="twoLeft">
            <div class="ttwoLeft">
              <div class="tttwoLeft">计划生产数量</div>
              <div class="tttwoItem">{{row.planYield}}</div>
            </div>
            <div class="ttwoLeft">
              <div class="tttwoLeft">开工时间</div>
              <div class="tttwoItem">{{row.planStartTime}}</div>
            </div>
            <div class="ttwoLeft">
              <div class="tttwoLeft">完工时间</div>
              <div class="tttwoItem">{{row.planEndTime}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="display: none;">
      <div  v-for="(item,index) in groupData" v-bind:key="index" >
        <div class="article__heading" :id="'codeimg' + index"  style="page-break-after:always;">
          <div class="article__heading__title">
            生产流转表
          </div>
          <div style="text-align: center">
            <div class="oneItem" style="display: inline-flex;">
              <div class="oneLeft" style="border: solid 1px;width: 200px;font-size: 20px;font-weight: 600;padding: 34px 0;">计划单号</div>
              <div class="oneRight" style="border: solid 1px;border-left: none;width: 450px;font-size: 30px;font-weight: 600;padding: 30px 0;">{{item.taskNumber}}</div>
            </div>
            <div class="oneItem" style="display: inline-flex;">
              <div class="oneLeft" style="border: solid 1px;width: 200px;font-size: 20px;font-weight: 600;padding: 34px 0;">产品信息</div>
              <div class="twoLeft" style="border: solid 1px;border-left: none;width: 450px;">
                <div class="ttwoLeft" style="display: flex;border-bottom: solid 1px;">
                  <div class="tttwoLeft" style="border-right: 1px solid;padding: 5px;width: 100px">产品编号</div>
                  <div class="tttwoItem" style="padding: 5px">{{item.productCode}}</div>
                </div>
                <div class="ttwoLeft" style="display: flex;border-bottom: solid 1px;">
                  <div class="tttwoLeft" style="border-right: 1px solid;padding: 5px;width: 100px">产品名称</div>
                  <div class="tttwoItem" style="padding: 5px">{{item.productName}}</div>
                </div>
                <div class="ttwoLeft" style="display: flex;border-bottom: solid 1px;">
                  <div class="tttwoLeft" style="border-right: 1px solid;padding: 5px;width: 100px">产品规格</div>
                  <div class="tttwoItem" style="padding: 5px">{{item.model}}</div>
                </div>
              </div>
            </div>
            <div class="qrcode codeImg" :style="'position: absolute;right: 32px;top: ' + (130 + index * 1045) +'px;'"  :id="'XQ' + index"></div>
            <!-- <img class="codeImg" src="@/assets/logo.png" /> -->
            <div class="oneItem" style="display: inline-flex;">
              <div class="oneLeft" style="border: solid 1px;width: 200px;font-size: 20px;font-weight: 600;padding: 34px 0;">计划内容</div>
              <div class="twoLeft" style="border: solid 1px;border-left: none;width: 450px;">
                <div class="ttwoLeft" style="display: flex;border-bottom: solid 1px;">
                  <div class="tttwoLeft" style="border-right: 1px solid;padding: 5px;width: 100px">计划生产数量</div>
                  <div class="tttwoItem" style="padding: 5px">{{item.planYield}}</div>
                </div>
                <div class="ttwoLeft" style="display: flex;border-bottom: solid 1px;">
                  <div class="tttwoLeft" style="border-right: 1px solid;padding: 5px;width: 100px">开工时间</div>
                  <div class="tttwoItem" style="padding: 5px">{{item.planStartTime}}</div>
                </div>
                <div class="ttwoLeft" style="display: flex;border-bottom: solid 1px;">
                  <div class="tttwoLeft" style="border-right: 1px solid;padding: 5px;width: 100px">完工时间</div>
                  <div class="tttwoItem" style="padding: 5px">{{item.planEndTime}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <el-button @click="fetchData()">打印</el-button> -->
    <div ref="content" class="node-article-content" v-html="article.content" />
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
export default {
  data() {
    return {
      article: '',
      fullscreenLoading: false,
      row: {},
      rrow: {},
      index: 0,
      groupData: []
    }
  },
  mounted() {
  },
  methods: {
      gourpPrint(groupData) {
        console.log(groupData)
        this.groupData = groupData
        if(groupData === null || groupData.length === 0) {
          return
        }
        var newWin = window.open("")
        this.$nextTick(() => {
          for(let i = 0; i < groupData.length; i++) {
            let imageToPrint = document.getElementById('codeimg' + i)
              console.log(imageToPrint.outerHTML)
              document.getElementById('XQ'+i).innerHTML='';//置空
              var qrcode = new QRCode(document.getElementById("XQ"+i), {
                  text: 'xxxx', // 需要转换为二维码的内容
                  width: 196,
                  height: 196,
                  colorDark: '#000000',
                  colorLight: '#ffffff',
                  correctLevel: QRCode.CorrectLevel.H
              })
            setTimeout(function() {
              newWin.document.write(imageToPrint.outerHTML);
            }, 1000);
          }
        })
        newWin.document.close(); //在IE浏览器中使用必须添加这一句
        newWin.focus(); //在IE浏览器中使用必须添加这一句
        setTimeout(function() {
          newWin.print(); //打印
          newWin.close(); //关闭窗口
        }, 5000);
      },
     creatQrCode(row) {
        this.row = row
        var qrcode = new QRCode(this.$refs.qrCodeUrl, {
            text: 'xxxx', // 需要转换为二维码的内容
            width: 196,
            height: 196,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
        })
        setTimeout(() => {
              this.fetchData()
          }, 1000)
    },
    fetchData() {
      this.fullscreenLoading = true
      let subOutputRankPrint = document.getElementById('subOutputRank-print');
      console.log(subOutputRankPrint.innerHTML);
      let newContent =subOutputRankPrint.innerHTML;
      let oldContent = document.body.innerHTML;
      document.body.innerHTML = newContent;
      setTimeout(() => {
          this.fullscreenLoading = false
          this.$nextTick(() => {
            window.print()
            window.location.reload();
            document.body.innerHTML = oldContent;
          })
        }, 3000)
      // import('./content.js').then(data => {
      //   const { title } = data.default
      //   document.title = title
      //   this.article = data.default
        // setTimeout(() => {
        //   this.fullscreenLoading = false
        //   this.$nextTick(() => {
        //     window.print()
        //   })
        // }, 3000)
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin clearfix {
  &:before {
    display: table;
    content: '';
    clear: both;
  }

  &:after {
    display: table;
    content: '';
    clear: both;
  }
}
.pdfContent {
  text-align: center;
}
.oneItem {
  display: inline-flex;
}
.oneLeft {
  border: solid 1px;
  width: 200px;
  font-size: 20px;
  font-weight: 600;
  padding: 34px 0;
}
.oneRight {
  border: solid 1px;
  border-left: none;
  width: 450px;
  font-size: 30px;
  font-weight: 600;
  padding: 30px 0;
}
.twoLeft {
  border: solid 1px;
  border-left: none;
  width: 450px;
}
.ttwoLeft {
  display: flex;
  border-bottom: solid 1px;
}
.tttwoLeft {
  border-right: 1px solid;
  padding: 5px;
  width: 100px
}
.tttwoItem {
  padding: 5px
}

.codeImg {
  position: absolute;
  right: 32px;
  top: 174px;
}
.main-article {
  padding: 20px;
  margin: 0 auto;
  display: block;
  width: 740px;
  background: #fff;
}

.article__heading {
  display: none;
  position: relative;
  padding: 0 0 20px;
  overflow: hidden;
}

.article__heading__title {
  display: block;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  word-wrap: break-word;
  overflow-wrap: break-word;
  font-size: 32px;
  line-height: 48px;
  font-weight: 600;
  color: #333;
  overflow: hidden;
  text-align: center;
  padding-bottom: 30px;
}

.node-article-content {
  margin: 20px 0 0;
  @include clearfix;
  font-size: 16px;
  color: #333;
  letter-spacing: 0.5px;
  line-height: 28px;
  margin-bottom: 30px;
  font-family: medium-content-serif-font, Georgia, Cambria, "Times New Roman", Times, serif;

  &> :last-child {
    margin-bottom: 0;
  }

  b,
  strong {
    font-weight: inherit;
    font-weight: bolder;
  }

  img {
    max-width: 100%;
    display: block;
    margin: 0 auto;
  }

  p {
    font-weight: 400;
    font-style: normal;
    font-size: 21px;
    line-height: 1.58;
    letter-spacing: -.003em;

  }

  ul {
    margin-bottom: 30px;
  }

  li {
    --x-height-multiplier: 0.375;
    --baseline-multiplier: 0.17;
    letter-spacing: .01rem;
    font-weight: 400;
    font-style: normal;
    font-size: 21px;
    line-height: 1.58;
    letter-spacing: -.003em;
    margin-left: 30px;
    margin-bottom: 14px;
  }

  a {
    text-decoration: none;
    background-repeat: repeat-x;
    background-image: linear-gradient(to right, rgba(0, 0, 0, .84) 100%, rgba(0, 0, 0, 0) 0);
    background-size: 1px 1px;
    background-position: 0 calc(1em + 1px);
    padding: 0 6px;
  }

  code {
    background: rgba(0, 0, 0, .05);
    padding: 3px 4px;
    margin: 0 2px;
    font-size: 16px;
    display: inline-block;
  }

  img {
    border: 0;
  }

  /* 解决 IE6-7 图片缩放锯齿问题 */
  img {
    -ms-interpolation-mode: bicubic;
  }

  blockquote {
    --x-height-multiplier: 0.375;
    --baseline-multiplier: 0.17;
    font-family: medium-content-serif-font, Georgia, Cambria, "Times New Roman", Times, serif;
    letter-spacing: .01rem;
    font-weight: 400;
    font-style: italic;
    font-size: 21px;
    line-height: 1.58;
    letter-spacing: -.003em;
    border-left: 3px solid rgba(0, 0, 0, .84);
    padding-left: 20px;
    margin-left: -23px;
    padding-bottom: 2px;
  }

  a {
    text-decoration: none;
  }

  h2,
  h3,
  h4 {
    font-size: 34px;
    line-height: 1.15;
    letter-spacing: -.015em;
    margin: 53px 0 0;
  }

  h4 {
    font-size: 26px;
  }
}
</style>
