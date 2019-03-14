 <template>
  <div>
    <!-- 查询表单 -->
    <el-form :model="params">
      <el-select v-model="params.siteId" clearable placeholder="请选择站点">
        <el-option
          v-for="item in siteList"
          :key="item.siteId"
          :label="item.siteName"
          :value="item.siteId"
        ></el-option>
      </el-select>别名:
      <el-input v-model="params.pageAliase" clearable style="width: 100px"></el-input>
      <el-button type="primary" size="small" :plain="true" v-on:click="query">查询</el-button>
      <router-link
        :to="{path:'/cms/page/add', query:{
        page: this.params.page, 
        siteId: this.params.siteId
      }}"
      >
        <el-button type="primary" size="small" :plain="true">新增页面</el-button>
      </router-link>
    </el-form>
    <el-table :data="list" stripe style="width: 100%">
      <el-table-column type="index" width="60"></el-table-column>
      <el-table-column prop="pageName" label="页面名称" width="120"></el-table-column>
      <el-table-column prop="pageAliase" label="别名" width="120"></el-table-column>
      <el-table-column prop="pageType" label="页面类型" width="150"></el-table-column>
      <el-table-column prop="pageWebPath" label="访问路径" width="250"></el-table-column>
      <el-table-column prop="pagePhysicalPath" label="物理路径" width="250"></el-table-column>
      <el-table-column prop="dataUrl" label="数据Url" width="250"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="page">
          <el-button size="small" type="text" @click="edit(page.row.pageId)">编辑</el-button>
          <el-button size="small" type="text" @click="del(page.row.pageId)">删除</el-button>
          <el-button size="small" type="text" @click="preview(page.row.pageId)">页面预览</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="changePage"
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="params.size"
      :current-page="params.page"
      style="float:right;"
    ></el-pagination>
  </div>
</template>

<script>
// 编写页面静态部分，即model及VM部分
import * as cmsApi from "../api/cms";
export default {
  data() {
    return {
      total: 0,
      params: {
        page: 1,
        size: 10,
        siteId: "",
        pageAliase: ""
      },
      list: [],
      siteList: []
    };
  },
  //未渲染
  created() {
    //为空 赋值为1
    this.params.page = Number.parseInt(this.$route.query.page || 1);
    this.params.siteId = this.$route.query.siteId || "";
  },
  mounted() {
    this.query();
    //初始化站点列表
    this.siteList = [
      {
        siteId: "5a751fab6abb5044e0d19ea1",
        siteName: "门户主站"
      },
      {
        siteId: "102",
        siteName: "测试站"
      }
    ];
  },
  methods: {
    //查询
    query: function() {
      cmsApi
        .page_list(this.params.page, this.params.size, this.params)
        .then(res => {
          this.total = res.queryResult.total;
          this.list = res.queryResult.list;
        });
    },
    changePage: function(page) {
      this.params.page = page;
      this.query();
    },
    edit: function(pageId) {
      this.$router.push({
        path: "/cms/page/edit/" + pageId
      });
    },
    del: function(pageId) {
      this.$confirm("您确定删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        //调用服务端接口
        cmsApi.page_del(pageId).then(res => {
          if (res.success) {
            this.$message.success("删除成功");
            //刷新页面
            this.query();
          } else {
            this.$message.error("删除失败");
          }
        });
      });
    },
    preview:function(pageId){
      window.open('http://www.xuecheng.com/cms/preview/'+pageId);
    },
  }
};
</script>
<style>
</style>