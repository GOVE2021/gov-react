import React,{ Component } from 'react';
import { connect } from 'dva';
import { Tree, Modal, Input, TreeSelect, Button, Spin, message } from 'antd';
import { departModidyData } from './cont';
import style from './style.css';

const { TreeNode } = Tree;
class department extends Component {
  constructor (props){
    super(props);
    this.state = {
      visible: false, // 部门编辑弹窗状态
      depItem: null, // 当前部门数据
      selectDepartmentId: null, // 选择的部门
      modalDefInfo: null, // 1: 修改部门， 2: 添加部门， 3: 删除部门
      isBtnDisabled: false,
    }
  }
  componentDidMount () {
    this.getDepartList()
  }
  getDepartList = () => {
    this.props.dispatch({
      type: 'Department/getDepartmentList',
      payload: {},
    })
  }
  /**
   * 父部门改变
   * @param {number} value 
   * @param {Array} label 
   * @param {object} extra 
   */
  onDepartmentChange = (value, label, extra) => {
    this.setState({ selectDepartmentId: value });
  }
  /**
   * 部门名称改变时
   * @param {dom} e 
   */
  departNameChange = (e) => {
    const { depItem } = this.state;
    const newDepItem = {
      departmentName: e?.target?.value || '',
      id: depItem?.id,
    };
    this.setState({ depItem: newDepItem });
  }
  /**
   * 确认修改部门
   */
  handleOk = () => {
    const {
      depItem, // 当前部门数据
      selectDepartmentId, // 选择的部门
      modalDefInfo,
    } = this.state;
    let params = null;
    switch (Number(modalDefInfo?.key)) {
      case Number(departModidyData.edit.key):
        params = {
          "departmentName": depItem?.departmentName, // 当前部门名称
          "parentId": selectDepartmentId,  // 调整后的父部门id
          "id": depItem?.id || '', // 当前部门id
        }
        break;
      case Number(departModidyData.add.key):
        params = {
          "departmentName": depItem?.departmentName, // 当前部门名称
          "parentId": selectDepartmentId,  // 调整后的父部门id
        }
        break;
      case Number(departModidyData.delete.key):
        params = {
          "id": depItem?.id, // 当前部门id
        }
        break;
      default:
    };
    this.setState({isBtnDisabled: true});
    this.props.dispatch({
      type: modalDefInfo.apiKey,
      payload: params,
    }).then(({ code, data, msg })=>{
      this.setState({isBtnDisabled: false});
      if (code === 200){
        this.setState({ visible: false });
        this.getDepartList();
        message.success(msg)
      } else {
        message.error(msg)
      }
    })
  }
  /**
   * 渲染部门节点
   * @param {当前部门}} data 
   * @param {父部门id} parentId 
   * @returns Dom
   */
  renderTreeNodes = (data, parentId) => {
    return data.map(item => {
      if (item?.children) {
        return (
          <TreeNode title={this.renderTitleDom(item, parentId)} value={item?.id} key={item?.id} dataRef={item}>
            {this.renderTreeNodes(item.children, item?.id)}
          </TreeNode>
        );
      }
      return <TreeNode key={item?.id} value={item?.id} title={this.renderTitleDom(item, parentId)} dataRef={item} />;
    });
  }
  /**
   * 渲染部门名称以及操作
   * @param {object} item 
   * @returns dom
   */
  renderTitleDom = (item, parentId) => {
    return (
      <div className={style.treeLineItem}>
        <div className={style.title}>{item?.departmentName || '-'}</div>
        {/* <div className={style.count}>{item?.employeeNums || '-'}</div> */}
        <div className={style.handel}>
          {
            parentId && (
              <>
                <span onClick={(e) => {
                  // 阻止合成事件间的冒泡
                  e.stopPropagation();
                  this.setState({
                    visible: true,
                    depItem: item,
                    selectDepartmentId: parentId,
                    modalDefInfo: departModidyData.edit,
                  });
                }}>
                  编辑
                </span>
                <span 
                  onClick={() => {
                    this.setState({
                      depItem: item,
                      modalDefInfo: departModidyData.delete,
                      visible: true,
                    });
                  }}
                >
                  删除
                </span>
              </>
            )
          }
        </div>
      </div>
    )
  }
  /**
   * 渲染selectTree部门节点
   * @param {object} data 
   * @returns dom
   */
  renderSelectTreeNodes = (data) => {
    const { depItem } = this.state;
    if(!data?.length){
      return null;
    }
    return data.map(item => {
      const isDisabled = item?.id === depItem?.id;
      if (item.children.length) {
        return (
          <TreeNode
            title={item?.departmentName || '-'}
            value={item.id}
            key={item.key}
            dataRef={item}
            disabled={isDisabled}
          >
            {this.renderSelectTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode
        key={item.key}
        value={item.id}
        title={item?.departmentName || '-'}
        dataRef={item}
        disabled={isDisabled}
      />;
    });
  }
  render () {
    const {
      departmentList,
      departmentIsLoading,
    } = this.props;
    const {
      depItem,
      visible,
      selectDepartmentId,
      modalDefInfo,
      isBtnDisabled,
    } = this.state;

    // 默认是根部门时，展开第一层就行
    const treeDefaultExpandedKeys = departmentList.length === 1 ? [departmentList[0].value] : [];
    
    return <div className={style.content}>
      <Button
        type="primary"
        onClick={() => {
          this.setState({
            modalDefInfo: departModidyData.add,
            depItem: {},
            selectDepartmentId: null,
            visible: true,
          });
        }}
      >添加部门</Button>
      <div className={style.treeLineTitle}>
        <div className={style.title}><span style={{paddingLeft: 30}}>部门名称</span></div>
        {/* <div className={style.count}>人数(人)</div> */}
        <div className={style.handel}>操作</div>
      </div>
      {departmentIsLoading?
        <div className={style.spin}><Spin size="large" /></div>
        :
        <Tree
          className={style.treeDom}
          blockNode={true}
          defaultExpandedKeys={treeDefaultExpandedKeys}
        >
          {this.renderTreeNodes(departmentList)}
        </Tree>
      }
      <Modal
          title={modalDefInfo?.modalTitle}
          visible={visible}
          maskClosable={false}
          okButtonProps={{disabled: isBtnDisabled}}
          okText={'确认'}
          cancelText={'取消'}
          onOk={this.handleOk}
          onCancel={() => {this.setState({ visible: false })}}
        >
          {
            (() => {
              switch(Number(modalDefInfo?.key)){
                case Number(departModidyData.edit.key): // 编辑部门
                case Number(departModidyData.add.key): // 添加部门
                  return (<>
                    <div className={style.editDepartentDom}>
                      <div className={style.label}>部门名称:</div>
                      <div className={style.value}>
                        <Input placeholder="请输入部门名称" value={depItem?.departmentName} onChange={this.departNameChange}/>
                      </div>
                    </div>
                    <div className={style.editDepartentDom}>
                      <div className={style.label}>父部门:</div>
                      <div className={style.value}>
                      <TreeSelect
                        style={{ width: '100%' }}
                        value={selectDepartmentId}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        getPopupContainer={(triggerNode) => triggerNode}
                        placeholder="请选择父部门"
                        // treeDefaultExpandAll
                        onChange={this.onDepartmentChange}
                      >
                        {this.renderSelectTreeNodes(departmentList)}
                      </TreeSelect>
                      </div>
                    </div>
                  </>)
                case Number(departModidyData.delete.key): // 删除部门
                    return <p>{`是否要删除「${depItem?.departmentName}」部门？`}</p>
                default: 
                  return null
              }
            })()
          }
          
          
      </Modal>
    </div>
  }
}

const mapStateToProps = (state) =>({
  departmentList: state.Department?.departmentList || [], //部门列表
  departmentIsLoading: state.Department?.departmentIsLoading || false, // 是否在刷新列表
})
export default connect(mapStateToProps)(department)