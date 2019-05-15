<template>
  <div>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        <el-card class="statCard">
          <el-row>
            <el-col :span="8">
              <div class="cardIcon" style="background: #fbc677">
                <i class="el-icon-document-checked f26 white"/>
              </div>
            </el-col>
            <el-col :span="8" :offset="8" class="cardNum">
              <span class="f20 b">7001</span>
              <br>
              <br>今日注册
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        <el-card class="statCard">
          <el-row>
            <el-col :span="8">
              <div class="cardIcon" style="background:#ea6967">
                <i class="el-icon-document-remove f26 white"/>
              </div>
            </el-col>
            <el-col :span="8" :offset="8" class="cardNum">
              <span class="f20 b">70010</span>
              <br>
              <br>本周注册
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        <el-card class="statCard">
          <el-row>
            <el-col :span="8">
              <div class="cardIcon" style="background:#966ae2">
                <i class="el-icon-document f26 white"/>
              </div>
            </el-col>
            <el-col :span="8" :offset="8" class="cardNum">
              <span class="f20 b">700100</span>
              <br>
              <br>本月注册
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        <el-card class="statCard">
          <el-row>
            <el-col :span="8">
              <div class="cardIcon" style="background:#67a7fb">
                <i class="el-icon-document-copy f26 white"/>
              </div>
            </el-col>
            <el-col :span="8" :offset="8" class="cardNum">
              <span class="f20 b">7001001</span>
              <br>
              <br>累计注册
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14">
        <el-card class="chartCard"></el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
        <el-card class="chartCard"></el-card>
      </el-col>
    </el-row>
    <el-timeline>
      <el-timeline-item timestamp="2019/5/15" placement="top">
        <el-card class="updateCard">
          <h4>功能更新3</h4>
          <p>更新了某某功能&nbsp;&nbsp;&nbsp;&nbsp;2019/5/15 21:17</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2019/5/12" placement="top">
        <el-card class="updateCard">
          <h4>功能更新2</h4>
          <p>更新了某某功能&nbsp;&nbsp;&nbsp;&nbsp;2019/5/12 21:17</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2019/5/11" placement="top">
        <el-card class="updateCard">
          <h4>功能更新1</h4>
          <p>更新了某某功能&nbsp;&nbsp;&nbsp;&nbsp;2019/5/11 21:17</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  name: 'index_main',
  data () {
    return {

    }
  }
}
</script>
<style>
.updateCard .el-card__body {
  margin: 0 !important;
  padding: 0 0 10px 10px !important;
}
</style>

<style scoped>
.statCard {
  width: 100%;
  height: 100px;
  margin-bottom: 20px;
  color: #797979;
  text-align: right;
}
.cardIcon {
  width: 26px;
  height: 26px;
  padding: 17px;
  border-radius: 30px;
}
.chartCard {
  height: 400px;
  margin-bottom: 20px;
}
</style>
