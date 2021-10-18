<template>
  <div class="" style="background-color: white; ">
    <el-divider content-position="left" style="padding-top:5px">
      <h3>
        <i class="el-icon-star-on"></i>快速<i class="el-icon-star-on"></i>
      </h3>
    </el-divider>
    <div style="margin-left:20px">
      <ul>
        <li>后端快速开发：Eclipse + Jrebel可实现修改代码或SQL立即生效</li>
        <li>前端快速开发：IntelliJ IDEA + vue3 + VITE可修改代码立即生效和快速启动、强大提示</li>
        <li>java17不再需要拼装SQL</li>
        <li>Spring boot优雅停机</li>
        <li>日期和时间分开，自动格式化</li>
        <li>良好的框架，减少代码代码量，更加关注业务开发(去if,try...catch,...)</li>
        <li>null处理机制，json的null不返回，新增和修改的null不处理</li>
        <li>异常处理机制，异常拦截，输出控制</li>
        <li>模块划分</li>
        <li>优雅返回机制，专注数据返回</li>
        <li>优雅的SQL写法</li>
      </ul>
    </div>
    <el-divider content-position="left" style="padding-top:5px"><h3><i class="el-icon-star-on"></i>安全<i
        class="el-icon-star-on"></i></h3></el-divider>
    <div style="margin-left:20px">
      <ul>
        <li>高效安全方便拦截URI权限方式，使用BitSet和本地缓存</li>
        <li>防sql注入</li>
        <li>密码安全，加密保存</li>
        <li>退出立即生效，修改密码立即生效</li>
        <li>update和delete限制必须加上where</li>
        <li>防止CSRF跨站请求伪造, Cookie安全(去掉)</li>
        <li>限流针对账号 访问过多</li>
        <li>get post(查看和操作)分开，允许只能查看权限，可限制数据更新操作次数</li>
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
        <li>更少的请求</li>
        <li>新增和修改时高效判断数据是否已经存在</li>
      </ul>
    </div>

    <el-divider content-position="left" style="padding-top:5px">
      <h3>
        <i class="el-icon-star-on"></i>可扩展性<i class="el-icon-star-on"></i>
      </h3>
    </el-divider>
    <div style="margin-left:20px">
      <ul>
        <li>支持多机轮询调用后端接口</li>
      </ul>
    </div>


    <div>
      常见的问题:未关闭连接



    </div>
  </div>

</template>

