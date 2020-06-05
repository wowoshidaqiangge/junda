<template>
  <div class="app-container">
    <aside style="margin-top:55px;">{{ $t('pdf.tips') }}</aside>
    <router-link target="_blank" to="/pdfdownlowd">
      <el-button type="primary">
        Click to download PDF
      </el-button>
    </router-link>
  </div>
</template>

