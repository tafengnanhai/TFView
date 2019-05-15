<template>
  <div>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        <el-card class="statCard">
          <el-row>
            <el-col :span="8">
              <div class="cardIcon" style="background: #fbc677">
                <i class="el-icon-s-custom f26 white"/>
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
                <i class="el-icon-s-custom f26 white"/>
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
                <i class="el-icon-s-custom f26 white"/>
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
                <i class="el-icon-s-custom f26 white"/>
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
  height: 500px;
  margin-bottom: 20px;
}
</style>
