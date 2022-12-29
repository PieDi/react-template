import { jsPlumb } from 'jsplumb';

/**
 * 1、paint 连线； 2、endpoint 锚点；3、Overlay理解为连线上的文字或者图标
 * outline  可以理解为描边
*/
export const XJFlowInstance = jsPlumb.getInstance({
  Container: 'xj-flow',
  PaintStyle: {
    // @ts-ignore  outlineWidth: 1, outlineStroke: 'red'
    strokeWidth: 3, stroke: '#89BCDE',
  },
  // HoverPaintStyle: { stroke: '#FF6600', strokeWidth: 3 },
  Endpoints: [
    'Dot',
    'Rectangle',
  ],
  // @ts-ignore  outlineStroke: 'red', outlineWidth: 800
  EndpointStyle: { fill: '#89BCDE' },
  /**
   * 锚点上也可以添加文字
   * ['Label', {
    id: 'label',
    label: 'sss',
    cssClass: 'aLabel',
    visible: true,
  }]
  */
  // EndpointHoverStyle: { fill: '#FF6600' },
  // 鼠标不能拖动删除线
  ConnectionsDetachable: true,
  // 删除线的时候节点不删除
  // DeleteEndpointsOnDetach: false,

  ConnectionOverlays: [ // 连线的叠加组件，如箭头、标签
    ['Arrow', { // 箭头参数设置
      location: 0.9,
      visible: true,
      width: 12,
      length: 12,
      events: {
        click() {
        },
      },
    }],
    // ['Label', { // 标签参数设置
    //   location: 0.2,
    //   events: {
    //     tap() {
    //     },
    //   },
    //   visible: true,
    //   labelStyle: {
    //     color: 'red',
    //   },
    // }],
  ],
});

export default {};
