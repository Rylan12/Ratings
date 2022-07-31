<template>
  <el-container class="container">
    <el-header>
      <h2>Rating Calculator</h2>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu>
          <el-menu-item index="1">
            <i class="el-icon-set-up"></i>
            <span> Calculator </span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-s-data"></i>
            <span> Distributions </span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-info"></i>
            <span> Information </span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <h3 id="calculator">Calculator</h3>
        <RatingCalculator />
        <h3 id="distributions">Distributions</h3>
        <h3 id="information">Information</h3>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
})
</script>
