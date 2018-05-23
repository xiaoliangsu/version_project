<style>
</style>
<template>
  <div>
    <Breadcrumb>
      <BreadcrumbItem
        v-for="item in this.$route.matched"
        :href="item.redirect ? item.redirect : homeRoute"
        :key="item.name"
      >{{itemTitle(item)}}</BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>
<script>
  export default {
    props: ['homeRoute'],
    methods: {
      itemTitle (item) {
        if (typeof item.meta.label === 'string') {
          return item.meta.label;
        } else {
          if (item.name.substr(0,1) == ':') {
            // 字符串前带':'表示是动态参数，需要获取参数名
            let name = item.name.substr(1);
            return this.$route.params[name];
          } else {
            return item.name;
          }
        }
      }
    }
  };
</script>
