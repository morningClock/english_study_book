<template>
  <div>
    <h1 class="title">我的单词本</h1>
    <!-- 日期过滤 -->
    <div class="date-filter">
      <el-date-picker
        v-model="filterDate"
        type="datetimerange"
        :picker-options="pickerOptions"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right">
      </el-date-picker>
      <div class="d-iblock">
        <el-button type="primary" style="margin-left:3px;">筛选</el-button>
        <el-button type="info" style="margin-left:2px;">取消</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <el-table
      :data="tableData"
      style="width: 100%"
      :stripe="true"
      :highlight-current-row="true"
      empty-text="无">
      <el-table-column
        prop="date"
        label="日期"
        sortable
        align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="单词" prop="word" align="center"></el-table-column>
      <el-table-column label="单词释义" prop="translation" align="center"></el-table-column>
      <el-table-column label="错误频率" prop="wrong" sortable align="center"></el-table-column>
      <el-table-column
        label="熟练度"
        prop="tag"
        :filters="filtersTags"
        :filter-method="filterTag"
        align="center">
        <template slot-scope="scope">
          <el-tag :type="tagTypes[scope.row.tag]">{{tags[scope.row.tag]}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot="header">
          <el-button type="primary" icon="el-icon-circle-plus-outline" round>新增单词</el-button>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <div class="pagination-wrap">
      <el-pagination
        class="pagination"
        :page-size="5"
        :page-sizes="[5, 10, 15, 20]"
        :total="100"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        layout="sizes, prev, pager, next, jumper"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 日期控件配置
      filterDate: '',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
        },
      // 熟练度标签
      tags: ['生疏', '一般', '熟练'],
      tagTypes: ['danger', '', 'success'],
      filtersTags: [
        { value: '0', text: '生疏'},
        { value: '1', text: '一般'},
        { value: '2', text: '熟练'}
      ],
      // 表格内容
      tableData: [{
        date: '2016-05-02',
        word: 'wangxiaohu',
        translation:'王小虎',
        wrong: 1,
        tag: 1,
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        word: 'wangxiaohu',
        translation:'王小虎',
        wrong: 1,
        tag: 2,
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        word: 'wangxiaohu',
        translation:'王小虎',
        wrong: 3,
        tag: 0,
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        word: 'wangxiaohu',
        translation:'王小虎',
        wrong: 1,
        tag: 1,
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods: {
    // 编辑表格行
    handleEdit(index, row) {
      console.log(index, row);
    },
    // 删除表格行
    handleDelete(index, row) {
      console.log(index, row);
    },
    // 通过标签筛选当页显示数据
    filterTag(value, row) {
      return row.tag === parseInt(value);
    },
    // 
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    }
  }
}
</script>

<style lang="scss" scoped>
  .title{
    text-align: center;
    height: 3.5714rem;
    font-size: 1.4286rem;
    color: black;
    letter-spacing: 0.7143rem;
  }
  .date-filter{
    text-align: center;
    padding: 0 0 1.4286rem 0;
  }
  .pagination-wrap{
    padding: 1.4286rem 0;
    .pagination{
      text-align: center;
    }
  }
</style>
