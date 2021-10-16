<template>
  <div class="" style="background-color: white; ">
    <el-divider content-position="left" style="padding-top:5px">
      <h3>
      <i class="el-icon-star-on"></i>快速<i class="el-icon-star-on"></i>
      </h3>
    </el-divider>
    <div style="margin-left:20px">
      <ul>
        <li>Eclipse + Jrebel可实现修改代码或SQL立即生效</li>
        <li>IntelliJ IDEA + vue3 + VITE可修改代码立即生效和快速启动、强大提示</li>
        <li>java17不再需要拼装SQL, 日期和时间分开</li>
        <li>良好的框架，减少代码代码量，更加关注业务开发(去if,try...catch,...)</li>
      </ul>
    </div>
    <el-divider content-position="left" style="padding-top:5px"><h3><i class="el-icon-star-on"></i>安全<i
        class="el-icon-star-on"></i></h3></el-divider>
    <div style="margin-left:20px">
      <ul>
        <li>防sql注入</li>
        <li>密码安全，加密方式，退出立即生效，修改密码立即生效</li>
        <li>update或delete不加where不会警告</li>
        <li>防止CSRF跨站请求伪造</li>
      </ul>
    </div>
    <el-divider content-position="left" style="padding-top:5px">
      <h3>
        <i class="el-icon-star-on"></i>性能<i class="el-icon-star-on"></i>
      </h3>
    </el-divider>
    <div style="margin-left:20px">
      <ul>
        <li>json null值不返回，null值不更新</li>
        <li>不会打一堆异常日志，如传参类型，非法字符等，数据不存在</li>
        <li>没有万能Map查询条件，造成内存溢出</li>
        <li>安全拦截URI权限方式</li>
        <li>更少的请求</li>
        <li>判断数据是否已经存在</li>
      </ul>
    </div>

    <div>
      * 可扩展性
      支持多机轮询调用后端接口

      TODO LIST
      * 限流一个账号 访问过多
      * post get分开，限制数据更新操作次数
      * 限流操作，只能查看

    </div>

    <div>
      &nbsp;
    </div>
  </div>
</template>