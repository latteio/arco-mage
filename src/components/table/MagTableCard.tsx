/**
 *   表格的基础封装:
 *   1.将表格和分页组件合并, 将分页切换等功能集成在组件内部
 *   2.表头过滤自动实现, 并集成在组件内部
 *   @author: wugz
 *   @since : 2025/11/26
 */
import {defineComponent, onMounted, reactive, ref, watch} from "vue";
import {Button, Card, Input, Pagination, RangePicker, Select, Table, TableColumn} from "@arco-design/web-vue";
import MagTableFilter from "@/components/table/MagTableFilter.vue";
import MagConfirmButton from "@/components/form/MagConfirmButton";

const MagTableCard = defineComponent({
  name: "MagTableCard",
  props: {
    /* 表格自定义属性: 基础 */
    header: {type: String, required: false, default: () => ""},
    buttons: {type: Array, required: false, default: () => []},
    rowKey: {type: String, required: false, default: () => "id"},
    rowColumns: {type: Array, required: false, default: () => []},
    height: {type: Number, required: false, default: () => -1},
    /* 表格自定义属性: 数据 */
    rowData: {type: Array, required: false, default: () => []},
    rowTotal: {type: Number, required: false, default: () => 0},
    dataLoader: {type: Function, required: false, default: (data: any) => data},
    dataParams: {type: Object, required: false, default: () => null},
    autoLoad: {type: Boolean, required: false, default: () => true},
    /* 表格自定义属性: 分页 */
    usePage: {type: Boolean, required: false, default: () => true},
    pageSizeOptions: {type: Array, required: false, default: () => [10, 20, 30, 40, 50]},
  },
  emits: ["filter-query"],
  setup: function (props, {attrs, slots, emit, expose}) {
    const loadingStatus = ref(false);
    const filterValues = reactive<any>({});

    /**
     * 定义表格内置模型变量
     */
    const tableModel = reactive<any>({
      data: props?.rowData || [],
      total: 0,
      current: 1,
      size: 20,
      /* 获取数据的参数 */
      pageBaseParams: {},
      cachedQueryParams: {}
    });

    /**
     * 初始化过滤值
     */
    const initFilterValues = () => {
      props.rowColumns.forEach((column: any) => {
        if (column.filterable && column.filterable.enabled && column.filterable.prop) {
          // 初始化过滤值
          if (filterValues[column.filterable.prop] === undefined) {
            filterValues[column.filterable.prop] = null;
          }
        }
      });
    };

    /**
     * 内部方法: 加载数据
     * @param data
     */
    const loadDataFunc = (data: any) => {
      if (data) {
        if (data.current !== undefined && data.size !== undefined) {
          tableModel.data = data?.records;
          tableModel.total = data?.total;
        } else {
          tableModel.data = data;
          tableModel.total = data?.length;
        }
      }
    }

    /**
     * 内部方法: 异步加载数据
     * @param params 查询参数
     */
    const loadDataAsyncFunc = (params: any) => {
      if (props.dataLoader) {
        loadingStatus.value = true;
        tableModel.cachedQueryParams = Object.assign({}, params);
        props.dataLoader({
          current: tableModel.current,
          size: tableModel.size,
          ...tableModel.pageBaseParams,
          ...tableModel.cachedQueryParams
        }).then((res: any) => {
          loadDataFunc(res);
        }).catch((e: any) => {
          console.log('loadDataAsyncFunc(): An exception occurred while requesting data: ', e)
        }).finally(() => {
          loadingStatus.value = false;
        });
      }
    }

    /**
     * 定义组件外部方法
     */
    expose({
      load: loadDataAsyncFunc,
      loadData: loadDataFunc,
      getData: () => tableModel.data,
      clearFilters: () => {
        Object.keys(filterValues).forEach(key => {
          filterValues[key] = null;
        });
      },
      getFilters: () => {
        return {...filterValues};
      }
    });

    /**
     * 定义组件准备完成事件
     */
    onMounted(() => {
      tableModel.data = props.rowData || [];
      tableModel.total = props.rowTotal || 0;
      tableModel.current = 1;
      tableModel.size = 20;
      tableModel.pageBaseParams = {...props.dataParams}
      initFilterValues();
      if (props.autoLoad) {
        loadDataAsyncFunc({})
      }
    });

    /**
     * 监听 rowColumns 变化，初始化过滤值
     */
    watch(() => props.rowColumns, () => {
      initFilterValues();
    }, {deep: true});

    /**
     * 定义表格分页事件
     */
    const onTablePageChange = (val: number) => {
      tableModel.current = val;
      loadDataAsyncFunc(tableModel.cachedQueryParams);
    }

    /**
     * 定义表格切换分页条目事件
     */
    const onTablePageSizeChange = (val: number) => {
      tableModel.current = 1;
      tableModel.size = val;
      loadDataAsyncFunc(tableModel.cachedQueryParams);
    }

    /**
     * 定义表格过滤的确认/清除/重置事件
     * @param event
     * @param prop
     * @param val
     * @param fn
     */
    const onMagTableFilterFn = (event: any, prop: string, val: any, fn: any) => {
      // 更新过滤值
      if (event === 'confirm' && prop && val !== undefined) {
        filterValues[prop] = val;
      } else if (event === 'reset' && prop) {
        filterValues[prop] = null;
      }

      fn && fn();
      emit("filter-query", event, prop, val);
    }

    /**
     * 自定义表格列插槽
     * @param rowColumn
     * @returns {{cell: function(*): (*)}}
     */
    const getTableColumnSlot = (rowColumn: any) => {
      const columnSlots = {
        // 单元格插槽
        cell: (scope: any) => {
          if (rowColumn["slotable"] && rowColumn["slotable"]["enabled"]) {
            if (rowColumn["slotable"]["template"]) {
              return rowColumn["slotable"]["template"](scope);
            } else if (rowColumn["slotable"]["slotName"]) {
              return slots[rowColumn["slotable"]["slotName"]](scope)
            }
          } else {
            return scope.record[rowColumn["dataIndex"]]
          }
        }
      }

      // 过滤插槽
      if (rowColumn["filterable"] && rowColumn["filterable"]["enabled"]) {
        if (rowColumn["filterable"]["slotName"]) {
          columnSlots["filter-content"] = (scope: any) => slots[rowColumn["filterable"]["slotName"]](scope)
        } else if (rowColumn["filterable"]["type"]) {
          const filterProp = rowColumn["filterable"]["prop"];
          const currentFilterValue = filterValues[filterProp];

          // 过滤组件: 输入框
          if (rowColumn["filterable"]["type"] === 'input') {
            columnSlots["filter-content"] = (scope: any) => {
              return <MagTableFilter
                  onConfirm={() => onMagTableFilterFn('confirm', filterProp, currentFilterValue, scope.handleFilterConfirm)}
                  onReset={() => onMagTableFilterFn('reset', filterProp, null, scope.handleFilterReset)}
              >
                <Input
                    modelValue={currentFilterValue}
                    class="table-card__table-filter-control"
                    allowClear
                    placeholder={rowColumn["filterable"]["placeholder"] || '请输入'}
                    onChange={(value) => {
                      // 更新本地状态
                      filterValues[filterProp] = value;
                      scope.setFilterValue(value)
                    }}
                    onClear={() => {
                      filterValues[filterProp] = null;
                      onMagTableFilterFn('reset', filterProp, null, scope.handleFilterReset);
                    }}>
                </Input>
              </MagTableFilter>
            }
          }

          // 过滤组件: 下拉框
          if (rowColumn["filterable"]["type"] === 'select') {
            columnSlots["filter-content"] = (scope: any) => {
              return <MagTableFilter
                  onConfirm={() => onMagTableFilterFn('confirm', filterProp, currentFilterValue, scope.handleFilterConfirm)}
                  onReset={() => onMagTableFilterFn('reset', filterProp, null, scope.handleFilterReset)}
              >
                <Select
                    modelValue={currentFilterValue}
                    class="table-card__table-filter-control"
                    allowClear
                    placeholder={rowColumn["filterable"]["placeholder"] || '请选择'}
                    options={rowColumn["filterable"]["options"] || []}
                    onChange={(value) => {
                      // 更新本地状态
                      filterValues[filterProp] = value;
                      scope.setFilterValue(value)
                    }}
                    onClear={() => {
                      filterValues[filterProp] = null;
                      onMagTableFilterFn('reset', filterProp, null, scope.handleFilterReset);
                    }}>
                </Select>
              </MagTableFilter>
            }
          }

          // 过滤组件: 日期框
          if (rowColumn["filterable"]["type"] === 'date') {
            columnSlots["filter-content"] = (scope: any) => {
              // 处理日期范围值
              const dateRangeValue = currentFilterValue || [];

              return <MagTableFilter
                  onConfirm={() => onMagTableFilterFn('confirm', filterProp, currentFilterValue, scope.handleFilterConfirm)}
                  onReset={() => onMagTableFilterFn('reset', filterProp, null, scope.handleFilterReset)}
              >
                <RangePicker
                    modelValue={dateRangeValue}
                    class="table-card__table-filter-control"
                    format="YYYY-MM-DD"
                    allowClear
                    options={rowColumn["filterable"]["options"] || []}
                    onSelect={(value) => {
                      if (value.length === 2) {
                        const formattedValue = [
                          value[0] + " 00:00:00",
                          value[1] + " 23:59:59"
                        ];
                        filterValues[filterProp] = formattedValue;
                        scope.setFilterValue(formattedValue)
                      }
                    }}
                    onChange={(value) => {
                      if (value && value.length === 2) {
                        const formattedValue = [
                          value[0] + " 00:00:00",
                          value[1] + " 23:59:59"
                        ];
                        filterValues[filterProp] = formattedValue;
                        scope.setFilterValue(formattedValue)
                      } else {
                        filterValues[filterProp] = null;
                        scope.setFilterValue(null)
                      }
                    }}
                    onClear={() => {
                      filterValues[filterProp] = null;
                      onMagTableFilterFn('reset', filterProp, null, scope.handleFilterReset);
                    }}>
                </RangePicker>
              </MagTableFilter>
            }
          }
        }
      }

      return columnSlots;
    }

    /**
     * 自定义表格列渲染
     */
    const getTableColumns = () => {
      const columns = [];
      for (let rowColumn of props.rowColumns) {
        if (rowColumn.hidden) continue;
        if (!rowColumn.filterable || rowColumn.filterable.enabled === false) {
          rowColumn.filterable = undefined;
        }
        if (rowColumn.filterable && rowColumn.filterable.enabled) {
          // 设置初始过滤值
          const filterProp = rowColumn.filterable.prop;
          if (filterProp && filterValues[filterProp] !== undefined) {
            // 这里设置默认过滤值
            rowColumn.filterDefaultValue = filterValues[filterProp];
          }
        }
        columns.push(<TableColumn
            {...rowColumn}
            v-slots={{
              ...getTableColumnSlot(rowColumn)
            }}
        >
        </TableColumn>)
      }
      return columns;
    }

    /**
     * 定义表格高度
     */
    const calcTableHeight = () => {
      if (props.height > 0) {
        return props.height + "px";
      }

      let relativeHeight = 180;
      if (props.header) {
        relativeHeight += 46;
      }

      if (props.buttons && props.buttons.length > 0) {
        relativeHeight += 40;
      }

      return (window.innerHeight - relativeHeight) + "px";
    }

    /**
     * 定义返回模板
     */
    return () => {
      return <div class="table-card__main">
        <Card bordered={false} title={props.header}>
          {/* 按钮区 */}
          {
              (props.buttons && props.buttons.length > 0) && (
                  <div class="table-card__table-buttons">
                    {props.buttons.map((btn: any) => {
                          if (!btn.requireConfirm) {
                            return <Button {...btn} onClick={btn.onClick}>{btn.text}</Button>
                          }
                          return <MagConfirmButton {...btn} onClick={btn.onClick}>{btn.text}</MagConfirmButton>
                        }
                    )}
                  </div>
              )
          }

          {/* 表格区 */}
          <Table
              {...props}
              {...attrs}
              data={tableModel.data}
              columnResizable
              rowKey={props.rowKey}
              bordered={{headerCell: true}}
              scroll={{
                x: 'auto',
                y: calcTableHeight()
              }}
              pagination={false}
              loading={loadingStatus.value}
              v-slots={{
                columns: () => getTableColumns()
              }}
          >
          </Table>

          {/* 分页区 */}
          {props.usePage && (
              <div class="table-card__table-pagination">
                <Pagination
                    size="mini"
                    showTotal
                    showPageSize
                    total={tableModel.total}
                    pageSizeOptions={props.pageSizeOptions}
                    current={tableModel.current}
                    pageSize={tableModel.size}
                    onChange={onTablePageChange}
                    onPageSizeChange={onTablePageSizeChange}
                />
              </div>
          )}
        </Card>
      </div>
    }
  }
});

export default MagTableCard;
